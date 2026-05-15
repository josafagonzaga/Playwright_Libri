# Playwright Libri

Projeto de automação E2E com Playwright e TypeScript para validar fluxos e conteúdos do site da Libri Incorporadora, cobrindo navegação institucional, auditoria de links, responsividade e qualidade com CI/CD.

## Comandos

```bash
npm test
npm run test:access
npm run test:contact
npm run test:developments
npm run test:hygiene
npm run test:home
npm run test:links
npm run test:audit
npm run report
```

## Qualidade e CI/CD

O projeto executa os testes em desktop e mobile Chrome. Em falhas, o Playwright mantém screenshot, vídeo e trace para investigação.

No GitHub Actions, o workflow `Playwright Quality` roda em `push`, `pull_request` e execução manual. Ele instala as dependências, instala o Chromium do Playwright, executa `npm run test:ci` e publica artifacts com:

- relatório HTML do Playwright;
- resultados JUnit;
- relatórios de auditoria em `reports/`.

## Auditoria de links

O comando abaixo percorre páginas internas da Libri, valida links encontrados e gera relatórios em Markdown e JSON:

```bash
npm run test:audit
```

Arquivos gerados:

- `reports/link-audit-report.md`
- `reports/link-audit-report.json`

A auditoria roda uma vez no projeto `desktop-chrome` para evitar duplicidade e bloqueios por excesso de requisicoes. O relatorio separa:

- links quebrados, timeouts e HTTP 4xx/5xx reais;
- links com HTTP 429, tratados como rate limit;
- links externos suspeitos por texto;
- links externos fora da lista permitida.

Rotas tecnicas do WordPress, como `/wp-admin`, `/wp-json` e `/wp-login.php`, sao ignoradas no rastreamento.
