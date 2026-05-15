import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { baseUrl, maxPagesToVisit, requestTimeout } from '../data/link-audit.data';
import {
  buildMarkdownReport,
  collectPageLinks,
  isAllowedExternalUrl,
  isCrawlableInternalUrl,
  isIgnoredInternalUrl,
  isLibriDomain,
  isSuspiciousExternalLink,
  normalizeUrl,
  shouldIgnoreHref,
  type AuditIssue,
  type AuditReport,
  type PageLink,
} from '../helpers/link-audit.helper';

async function writeAuditReport(report: AuditReport) {
  const reportsDir = join(process.cwd(), 'reports');

  await mkdir(reportsDir, { recursive: true });
  await writeFile(
    join(reportsDir, 'link-audit-report.json'),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  await writeFile(join(reportsDir, 'link-audit-report.md'), buildMarkdownReport(report));
}

test('deve auditar links das paginas internas da Libri', async ({ page, request }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chrome',
    'Auditoria de links roda uma vez no desktop para evitar duplicidade e rate limit.',
  );

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
