# Relatorio de achados de qualidade - Libri

Gerado em: 2026-05-15

## Resumo

| Area | Status | Evidencia |
| --- | --- | --- |
| Home | OK | `npm run test:home` passou em desktop e mobile |
| Empreendimentos | OK | `npm run test:developments` passou no desktop |
| Acessos | OK | `npm run test:access` passou no desktop |
| Higiene WordPress | OK | `npm run test:hygiene` passou no desktop |
| Contato | Atencao | `/contato/` apresentou HTTP 429 em execucao isolada |
| Auditoria de links | Falha real | 136 links externos suspeitos encontrados |

## Achado 1 - Links externos suspeitos/spam

**Severidade:** Alta

**Comando para reproduzir:**

```bash
npm run test:audit
```

**Resultado atual:**

- Paginas visitadas: 16
- Links unicos verificados: 155
- Links quebrados reais: 0
- Links com HTTP 429: 9
- Links externos suspeitos por texto: 136
- Links externos fora da lista permitida: 0

**Exemplos encontrados:**

| Origem | Texto | URL |
| --- | --- | --- |
| `https://libri.com.br` | `MAINZEUS` | `https://24designshop.co.uk/shop/` |
| `https://libri.com.br` | `MAINZEUS` | `https://ristorantezoello.it/menu/` |
| `https://libri.com.br` | `MAINZEUS` | `https://softronixs.com/contact/` |
| `https://libri.com.br` | `SLOT ZEUS` | `https://www.globalmarketingbusiness.com/` |
| `https://libri.com.br` | `https://starazona.com/contacto/` | `https://starazona.com/contacto/` |

**Impacto:**

Esses links indicam possivel injecao de spam/SEO ou conteudo indevido em paginas publicas. Isso pode afetar reputacao, SEO, seguranca percebida e confianca do usuario.

**Evidencia completa:**

- `reports/link-audit-report.md`
- `reports/link-audit-report.json`

**Recomendacao:**

Revisar o conteudo publicado no WordPress, widgets, rodape, popups, plugins e banco de dados para remover os links suspeitos. Depois rodar novamente `npm run test:audit`.

## Achado 2 - Rate limit HTTP 429 em paginas internas

**Severidade:** Media

**Comandos para reproduzir:**

```bash
npm run test:audit
npm run test:contact
```

**Resultado atual:**

A auditoria encontrou HTTP 429 em 9 URLs internas. Em execucao isolada, o teste de contato tambem falhou quando `/contato/` respondeu sem sucesso.

**URLs afetadas na auditoria:**

| Texto | URL |
| --- | --- |
| `Sobre nos` | `https://libri.com.br/sobre-nos/` |
| `Empreendimentos` | `https://libri.com.br/empreendimentos/` |
| `Housi` | `https://libri.com.br/?page_id=8420` |
| `Blog` | `https://libri.com.br/blog/` |
| `Contato` | `https://libri.com.br/contato/` |
| `(sem texto)` | `https://libri.com.br/libri-one/` |
| `(sem texto)` | `https://libri.com.br/elisiosresidence/` |
| `(sem texto)` | `https://libri.com.br/versa-loft-style/` |
| `SAIBA MAIS SOBRE O SELO CASA AZUL + CAIXA` | `https://libri.com.br/blog/one-selo-azul/` |

**Impacto:**

O site pode bloquear acessos automatizados e possivelmente usuarios reais em certas condicoes. Isso tambem torna a automacao mais instavel.

**Recomendacao:**

Verificar regras de WAF, cache, CDN, plugin de seguranca, limite por IP e comportamento para user agents automatizados. Apos ajuste, o esperado e que `npm run test:contact` passe de forma consistente e que o relatorio de auditoria reduza os itens `HTTP 429`.

## Status dos testes

```bash
npm run test:developments
# 2 passed, 2 skipped

npm run test:access
# 2 passed no desktop

npm run test:hygiene
# 1 passed, 1 skipped

npm run test:contact
# falha intermitente/atual por HTTP 429 em /contato/

npm run test:audit
# falha por 136 links externos suspeitos
```

## Proxima acao recomendada

1. Corrigir/remover os links suspeitos no site.
2. Revisar a origem dos HTTP 429 em paginas internas.
3. Rodar `npm run test:audit` e `npm run test:contact` novamente.
4. Quando os achados reais forem corrigidos, manter esses testes no CI para bloquear regressao.
