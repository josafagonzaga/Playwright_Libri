import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { expect, test, type Page } from '@playwright/test';

const baseUrl = 'https://libri.com.br';
const maxPagesToVisit = 25;
const requestTimeout = 15_000;

const allowedExternalHosts = new Set([
  'api.whatsapp.com',
  'hlts-1.rds.land',
  'portal.libri.com.br',
  'www.monteseutour.com',
  'www.facebook.com',
  'www.instagram.com',
]);

const ignoredInternalPathPrefixes = [
  '/wp-admin',
  '/wp-content',
  '/wp-includes',
  '/wp-json',
];

const ignoredInternalPaths = new Set([
  '/wp-login.php',
  '/xmlrpc.php',
]);

const suspiciousLinkTextPatterns = [
  /\bmainzeus\b/i,
  /\bslot\w*\b/i,
  /\btop\d+\b/i,
  /\bjoker4d\b/i,
  /\bbintang4d\b/i,
  /\blivetoto/i,
  /\bularwin\b/i,
  /\bwede303\b/i,
  /\bskmbet\b/i,
  /\bbokep\b/i,
];

type PageLink = {
  source: string;
  url: string;
  text: string;
};

type AuditIssue = {
  source: string;
  url: string;
  text: string;
  problem: string;
};

type AuditReport = {
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

function normalizeUrl(href: string, sourceUrl: string) {
  const url = new URL(href, sourceUrl);

  url.hash = '';

  return url.href;
}

function shouldIgnoreHref(href: string) {
  return (
    href.startsWith('#') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:') ||
    href.startsWith('javascript:') ||
    /\.(avif|css|docx?|gif|jpe?g|js|pdf|png|svg|webp|xlsx?|zip)$/i.test(href)
  );
}

function isIgnoredInternalUrl(url: string) {
  const { pathname, searchParams } = new URL(url);

  return (
    ignoredInternalPaths.has(pathname) ||
    ignoredInternalPathPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    searchParams.has('preview') ||
    searchParams.has('elementor-preview')
  );
}

function isLibriDomain(url: string) {
  const { hostname } = new URL(url);

  return hostname === 'libri.com.br' || hostname.endsWith('.libri.com.br');
}

function isCrawlableInternalUrl(url: string) {
  const { hostname } = new URL(url);

  return (hostname === 'libri.com.br' || hostname === 'www.libri.com.br') && !isIgnoredInternalUrl(url);
}

function isAllowedExternalUrl(url: string) {
  return allowedExternalHosts.has(new URL(url).hostname);
}

function isSuspiciousExternalLink(url: string, text: string) {
  if (isLibriDomain(url)) {
    return false;
  }

  return (
    suspiciousLinkTextPatterns.some((pattern) => pattern.test(text)) ||
    /^https?:\/\//i.test(text) ||
    /^\d{1,3}$/.test(text)
  );
}

async function collectPageLinks(page: Page) {
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

function escapeMarkdownCell(value: string) {
  return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function buildIssueTable(issues: AuditIssue[]) {
  if (issues.length === 0) {
    return 'Nenhum item encontrado.\n';
  }

  const rows = issues.map((issue) => {
    const cells = [
      issue.problem,
      issue.source,
      issue.text,
      issue.url,
    ].map(escapeMarkdownCell);

    return `| ${cells.join(' | ')} |`;
  });

  return [
    '| Problema | Pagina de origem | Texto do link | URL |',
    '| --- | --- | --- | --- |',
    ...rows,
    '',
  ].join('\n');
}

function buildMarkdownReport(report: AuditReport) {
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
    `- Links externos permitidos no momento: ${Array.from(allowedExternalHosts).map((host) => `\`${host}\``).join(', ')}.`,
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

async function writeAuditReport(report: AuditReport) {
  const reportsDir = join(process.cwd(), 'reports');

  await mkdir(reportsDir, { recursive: true });
  await writeFile(join(reportsDir, 'link-audit-report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(join(reportsDir, 'link-audit-report.md'), buildMarkdownReport(report));
}

test('deve auditar links das paginas internas da Libri', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chrome', 'Auditoria de links roda uma vez no desktop para evitar duplicidade e rate limit.');

  const pendingPages = [baseUrl];
  const visitedPages = new Set<string>();
  const linksByUrl = new Map<string, PageLink>();
  const brokenLinks: AuditIssue[] = [];
  const rateLimitedLinks: AuditIssue[] = [];
  const suspiciousLinks: AuditIssue[] = [];
  const unexpectedExternalLinks: AuditIssue[] = [];

  while (pendingPages.length > 0 && visitedPages.size < maxPagesToVisit) {
    const currentUrl = pendingPages.shift();

    if (!currentUrl || visitedPages.has(currentUrl)) {
      continue;
    }

    visitedPages.add(currentUrl);

    try {
      await page.goto(currentUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    } catch (error) {
      const message = error instanceof Error ? error.message.split('\n')[0] : String(error);

      brokenLinks.push({
        source: currentUrl,
        url: currentUrl,
        text: '(pagina interna)',
        problem: message,
      });
      continue;
    }

    const links = await collectPageLinks(page);

    for (const { href, text } of links) {
      if (shouldIgnoreHref(href)) {
        continue;
      }

      const url = normalizeUrl(href, currentUrl);

      if (isLibriDomain(url) && isIgnoredInternalUrl(url)) {
        continue;
      }

      if (!linksByUrl.has(url)) {
        linksByUrl.set(url, { source: currentUrl, url, text });
      }

      if (isCrawlableInternalUrl(url) && !visitedPages.has(url) && !pendingPages.includes(url)) {
        pendingPages.push(url);
      }
    }
  }

  for (const { source, url, text } of linksByUrl.values()) {
    if (isSuspiciousExternalLink(url, text)) {
      suspiciousLinks.push({
        source,
        url,
        text: text || '(sem texto)',
        problem: 'link externo com texto suspeito',
      });
      continue;
    }

    if (!isLibriDomain(url) && !isAllowedExternalUrl(url)) {
      unexpectedExternalLinks.push({
        source,
        url,
        text: text || '(sem texto)',
        problem: 'link externo fora da lista permitida',
      });
      continue;
    }

    if (isAllowedExternalUrl(url)) {
      continue;
    }

    try {
      const response = await request.get(url, {
        failOnStatusCode: false,
        maxRedirects: 10,
        timeout: requestTimeout,
      });

      if (response.status() === 429) {
        rateLimitedLinks.push({
          source,
          url,
          text: text || '(sem texto)',
          problem: `HTTP ${response.status()}`,
        });
      } else if (response.status() >= 400) {
        brokenLinks.push({
          source,
          url,
          text: text || '(sem texto)',
          problem: `HTTP ${response.status()}`,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message.split('\n')[0] : String(error);

      brokenLinks.push({
        source,
        url,
        text: text || '(sem texto)',
        problem: message,
      });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    maxPagesToVisit,
    visitedPages: Array.from(visitedPages),
    checkedLinks: linksByUrl.size,
    brokenLinks,
    rateLimitedLinks,
    suspiciousLinks,
    unexpectedExternalLinks,
  };

  await writeAuditReport(report);

  await testInfo.attach('link-audit.json', {
    body: JSON.stringify(report, null, 2),
    contentType: 'application/json',
  });

  expect.soft(brokenLinks, 'Links com status HTTP 4xx/5xx').toEqual([]);
  expect.soft(suspiciousLinks, 'Links externos com texto suspeito').toEqual([]);
  expect.soft(unexpectedExternalLinks, 'Links externos fora da lista permitida').toEqual([]);
});
