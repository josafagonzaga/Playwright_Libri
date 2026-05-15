import type { Page } from '@playwright/test';
import {
  allowedExternalHosts,
  ignoredInternalPathPrefixes,
  ignoredInternalPaths,
  suspiciousLinkTextPatterns,
} from '../data/link-audit.data';

export type PageLink = {
  source: string;
  url: string;
  text: string;
};

export type AuditIssue = {
  source: string;
  url: string;
  text: string;
  problem: string;
};

export type AuditReport = {
  generatedAt: string;
  baseUrl: string;
  maxPagesToVisit: number;
  visitedPages: string[];
  checkedLinks: number;
  brokenLinks: AuditIssue[];
  rateLimitedLinks: AuditIssue[];
  suspiciousLinks: AuditIssue[];
  unexpectedExternalLinks: AuditIssue[];
};

export function normalizeUrl(href: string, sourceUrl: string) {
  const url = new URL(href, sourceUrl);

  url.hash = '';

  return url.href;
}

export function shouldIgnoreHref(href: string) {
  return (
    href.startsWith('#') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:') ||
    href.startsWith('javascript:') ||
    /\.(avif|css|docx?|gif|jpe?g|js|pdf|png|svg|webp|xlsx?|zip)$/i.test(href)
  );
}

export function isIgnoredInternalUrl(url: string) {
  const { pathname, searchParams } = new URL(url);

  return (
    ignoredInternalPaths.has(pathname) ||
    ignoredInternalPathPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    searchParams.has('preview') ||
    searchParams.has('elementor-preview')
  );
}

export function isLibriDomain(url: string) {
  const { hostname } = new URL(url);

  return hostname === 'libri.com.br' || hostname.endsWith('.libri.com.br');
}

export function isCrawlableInternalUrl(url: string) {
  const { hostname } = new URL(url);

  return (
    (hostname === 'libri.com.br' || hostname === 'www.libri.com.br') && !isIgnoredInternalUrl(url)
  );
}

export function isAllowedExternalUrl(url: string) {
  return allowedExternalHosts.has(new URL(url).hostname);
}

export function isSuspiciousExternalLink(url: string, text: string) {
  if (isLibriDomain(url)) {
    return false;
  }

  return (
    suspiciousLinkTextPatterns.some((pattern) => pattern.test(text)) ||
    /^https?:\/\//i.test(text) ||
    /^\d{1,3}$/.test(text)
  );
}

export async function collectPageLinks(page: Page) {
  return page.locator('a[href]').evaluateAll((anchors) => {
    return anchors
      .map((anchor) => {
        const href = anchor.getAttribute('href')?.trim();
        const text = anchor.textContent?.replace(/\s+/g, ' ').trim() ?? '';

        return href ? { href, text } : null;
      })
      .filter((link): link is { href: string; text: string } => Boolean(link));
  });
}

export function escapeMarkdownCell(value: string) {
  return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

export function buildIssueTable(issues: AuditIssue[]) {
  if (issues.length === 0) {
    return 'Nenhum item encontrado.\n';
  }

  const rows = issues.map((issue) => {
    const cells = [issue.problem, issue.source, issue.text, issue.url].map(escapeMarkdownCell);

    return `| ${cells.join(' | ')} |`;
  });

  return [
    '| Problema | Pagina de origem | Texto do link | URL |',
    '| --- | --- | --- | --- |',
    ...rows,
    '',
  ].join('\n');
}

export function buildMarkdownReport(report: AuditReport) {
  return [
    '# Relatorio de auditoria de links - Libri',
    '',
    `Gerado em: ${report.generatedAt}`,
    `Site auditado: ${report.baseUrl}`,
    `Limite de paginas visitadas: ${report.maxPagesToVisit}`,
    `Paginas visitadas: ${report.visitedPages.length}`,
    `Links unicos verificados: ${report.checkedLinks}`,
    `Links com erro, timeout ou status HTTP 4xx/5xx: ${report.brokenLinks.length}`,
    `Links com rate limit HTTP 429: ${report.rateLimitedLinks.length}`,
    `Links externos suspeitos por texto: ${report.suspiciousLinks.length}`,
    `Links externos fora da lista permitida: ${report.unexpectedExternalLinks.length}`,
    '',
    '## Como reproduzir',
    '',
    '```bash',
    'npm run test:audit',
    '```',
    '',
    '## Criterios da auditoria',
    '',
    '- A auditoria percorre paginas internas de `https://libri.com.br` ate o limite configurado.',
    '- Links `tel:`, `mailto:`, ancoras, `javascript:` e arquivos estaticos sao ignorados.',
    '- Rotas tecnicas e administrativas do WordPress, como `/wp-admin`, `/wp-json` e `/wp-login.php`, nao entram no rastreamento.',
    '- Subdominios de `libri.com.br` sao tratados como dominios da Libri, mas nao sao rastreados como paginas publicas.',
    `- Links externos permitidos no momento: ${Array.from(allowedExternalHosts)
      .map((host) => `\`${host}\``)
      .join(', ')}.`,
    '- Links externos com textos comuns de spam/SEO sao reportados como suspeitos.',
    '- Qualquer link externo fora dessa lista e reportado para revisao.',
    '',
    '## Paginas visitadas',
    '',
    ...report.visitedPages.map((url) => `- ${url}`),
    '',
    '## Links com erro, timeout ou status HTTP 4xx/5xx',
    '',
    buildIssueTable(report.brokenLinks),
    '## Links com rate limit HTTP 429',
    '',
    buildIssueTable(report.rateLimitedLinks),
    '## Links externos suspeitos por texto',
    '',
    buildIssueTable(report.suspiciousLinks),
    '## Links externos fora da lista permitida',
    '',
    buildIssueTable(report.unexpectedExternalLinks),
  ].join('\n');
}
