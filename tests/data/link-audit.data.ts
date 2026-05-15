export const baseUrl = 'https://libri.com.br';

export const maxPagesToVisit = 25;

export const requestTimeout = 15_000;

export const allowedExternalHosts = new Set([
  'api.whatsapp.com',
  'hlts-1.rds.land',
  'portal.libri.com.br',
  'www.monteseutour.com',
  'www.facebook.com',
  'www.instagram.com',
]);

export const ignoredInternalPathPrefixes = ['/wp-admin', '/wp-content', '/wp-includes', '/wp-json'];

export const ignoredInternalPaths = new Set(['/wp-login.php', '/xmlrpc.php']);

export const suspiciousLinkTextPatterns = [
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
