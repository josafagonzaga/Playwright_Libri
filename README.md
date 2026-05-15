# Playwright Libri

Projeto de automação E2E com Playwright e TypeScript para validar fluxos e conteúdos do site da Libri Incorporadora, cobrindo navegação institucional, auditoria de links, responsividade e qualidade com CI/CD.

## Comandos

```bash
npm test
npm run test:access
npm run test:broker
npm run test:contact
npm run test:developments
npm run test:hygiene
npm run test:home
npm run test:links
npm run test:audit
npm run typecheck
npm run lint
npm run format:check
npm run quality
npm run report
```

## Estrutura

```text
tests/
  data/          # massas e valores esperados reutilizaveis
  e2e/           # specs Playwright
  fixtures/      # fixtures para entregar Page Objects prontos
  helpers/       # funcoes reutilizaveis para auditorias e apoio aos testes
  pages/         # Page Objects com acoes e validacoes por pagina
reports/         # evidencias e relatorios gerados
```

## Cenarios cobertos

- Home em desktop e mobile.
- Listagem e links dos empreendimentos.
- Pagina de contato e canais de atendimento.
- Acesso ao portal do cliente e acesso corretor.
- Higiene basica do WordPress para visitantes.
- Auditoria de links internos, externos permitidos, rate limit e links suspeitos.

## Qualidade local

O projeto usa TypeScript, ESLint e Prettier.

```bash
npm run typecheck
npm run lint
npm run format:check
npm run quality
```

## Qualidade e CI/CD

O projeto executa os testes em desktop e mobile Chrome. Em falhas, o Playwright mantém screenshot, vídeo e trace para investigação.

O GitHub Actions usa duas camadas:

- `Stable quality gate`: bloqueante, roda `npm run quality`, `test:home`, `test:developments` e `test:access`.
- `Link audit report`: consultivo, roda `test:audit`, permite falha e publica os relatorios como artifact.
- `Known site issues`: consultivo, roda `test:contact`, `test:broker` e `test:hygiene`, permite falha e publica evidencias como artifact.

Essa divisao mantem o pipeline util para desenvolvimento sem esconder os problemas reais encontrados no site.

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
