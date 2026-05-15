# Relatorio de auditoria de links - Libri

Gerado em: 2026-05-15T17:01:11.111Z
Site auditado: https://libri.com.br
Limite de paginas visitadas: 25
Paginas visitadas: 16
Links unicos verificados: 155
Links com erro, timeout ou status HTTP 4xx/5xx: 0
Links com rate limit HTTP 429: 9
Links externos suspeitos por texto: 136
Links externos fora da lista permitida: 0

## Como reproduzir

```bash
npm run test:audit
```

## Criterios da auditoria

- A auditoria percorre paginas internas de `https://libri.com.br` ate o limite configurado.
- Links `tel:`, `mailto:`, ancoras, `javascript:` e arquivos estaticos sao ignorados.
- Rotas tecnicas e administrativas do WordPress, como `/wp-admin`, `/wp-json` e `/wp-login.php`, nao entram no rastreamento.
- Subdominios de `libri.com.br` sao tratados como dominios da Libri, mas nao sao rastreados como paginas publicas.
- Links externos permitidos no momento: `api.whatsapp.com`, `hlts-1.rds.land`, `portal.libri.com.br`, `www.monteseutour.com`, `www.facebook.com`, `www.instagram.com`.
- Links externos com textos comuns de spam/SEO sao reportados como suspeitos.
- Qualquer link externo fora dessa lista e reportado para revisao.

## Paginas visitadas

- https://libri.com.br
- https://libri.com.br/
- https://libri.com.br/sobre-nos/
- https://libri.com.br/empreendimentos/
- https://libri.com.br/?page_id=8420
- https://libri.com.br/blog/
- https://libri.com.br/contato/
- https://libri.com.br/libri-one/
- https://libri.com.br/blog/transforme-seu-home-office-com-funcionalidade-e-estilo/
- https://libri.com.br/blog/o-valor-dos-detalhes/
- https://libri.com.br/blog/tecnologia-redefinindo-o-conceito-de-morar-bem/
- https://libri.com.br/elisiosresidence/
- https://libri.com.br/versa-loft-style/
- https://libri.com.br/hype-easy-studios/
- https://libri.com.br/livri-freedom-living/
- https://libri.com.br/blog/one-selo-azul/

## Links com erro, timeout ou status HTTP 4xx/5xx

Nenhum item encontrado.

## Links com rate limit HTTP 429

| Problema | Pagina de origem                      | Texto do link                             | URL                                      |
| -------- | ------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| HTTP 429 | https://libri.com.br                  | Sobre nós                                 | https://libri.com.br/sobre-nos/          |
| HTTP 429 | https://libri.com.br                  | Empreendimentos                           | https://libri.com.br/empreendimentos/    |
| HTTP 429 | https://libri.com.br                  | Housi                                     | https://libri.com.br/?page_id=8420       |
| HTTP 429 | https://libri.com.br                  | Blog                                      | https://libri.com.br/blog/               |
| HTTP 429 | https://libri.com.br                  | Contato                                   | https://libri.com.br/contato/            |
| HTTP 429 | https://libri.com.br                  | (sem texto)                               | https://libri.com.br/libri-one/          |
| HTTP 429 | https://libri.com.br/empreendimentos/ | (sem texto)                               | https://libri.com.br/elisiosresidence/   |
| HTTP 429 | https://libri.com.br/empreendimentos/ | (sem texto)                               | https://libri.com.br/versa-loft-style/   |
| HTTP 429 | https://libri.com.br/libri-one/       | SAIBA MAIS SOBRE O SELO CASA AZUL + CAIXA | https://libri.com.br/blog/one-selo-azul/ |

## Links externos suspeitos por texto

| Problema                        | Pagina de origem     | Texto do link                         | URL                                                                 |
| ------------------------------- | -------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://24designshop.co.uk/shop/                                    |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://ristorantezoello.it/menu/                                   |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://softronixs.com/contact/                                     |
| link externo com texto suspeito | https://libri.com.br | https://starazona.com/contacto/       | https://starazona.com/contacto/                                     |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://onee.org.br/                                                |
| link externo com texto suspeito | https://libri.com.br | https://www.dovhlevin.com/            | https://www.dovhlevin.com/                                          |
| link externo com texto suspeito | https://libri.com.br | https://stitta.ac.id/kontak/          | https://stitta.ac.id/kontak/                                        |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://freezonemarket.ae/banks/                                    |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://abradee.org.br/associadas/                                  |
| link externo com texto suspeito | https://libri.com.br | SLOT ZEUS                             | https://www.globalmarketingbusiness.com/                            |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://www.mainzeusnet.com/                                        |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://www.tajmahalfoxtrot.com/teddy-weatherford/                  |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://www.tripp.in/about/                                         |
| link externo com texto suspeito | https://libri.com.br | https://coavs.edu.pk/faculty/         | https://coavs.edu.pk/faculty/                                       |
| link externo com texto suspeito | https://libri.com.br | SLOT PULSA                            | https://sites.google.com/view/d4rl                                  |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://energiasemprecomvoce.com.br/                                |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://67telecom.com.br/                                           |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://www.xianghair.com.au/                                       |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://thenaturalplants.com/products/                              |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://alumni.sethu.ac.in/events/                                  |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://dev.atlantida.edu.ar/                                       |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://williamsflorist.com.au/loveitreviewit/                      |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://kissmetricshq.com/                                          |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://nexifystudio.com/packages/                                  |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://coes.dypgroup.edu.in/iic/                                   |
| link externo com texto suspeito | https://libri.com.br | ULARWIN                               | https://digitaurus.tech/projects                                    |
| link externo com texto suspeito | https://libri.com.br | ULARWIN                               | https://afocelca.com/services/                                      |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://afocelca.com/                                               |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://quickmetrics.com/                                           |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://www.stolzmotors.com/contact-us/                             |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://main-zeus.co.id/                                            |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://www.mdb.org.br/estatuto/                                    |
| link externo com texto suspeito | https://libri.com.br | https://coes.dypgroup.edu.in/library/ | https://coes.dypgroup.edu.in/library/                               |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://minhcameo.com/                                              |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://dericklewin.com/                                            |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://tarheelfoodie.org/                                          |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://mynextbigidea.com/                                          |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://www.sparkdrupal.com/                                        |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://suoimocafe.com/                                             |
| link externo com texto suspeito | https://libri.com.br | https://sethu.ac.in/seminar/          | https://sethu.ac.in/seminar/                                        |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://digitaurus.tech/contact/                                    |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://sawuti.org/                                                 |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://naplesrailing.com/glass-balustrades/                        |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://zoomoptical.sa/branches/                                    |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://joker4d.co.id/                                              |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://www.sangath.org/                                            |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://leaf-india.org/                                             |
| link externo com texto suspeito | https://libri.com.br | WEDE303                               | https://www.cvmu.edu.in/contact                                     |
| link externo com texto suspeito | https://libri.com.br | MAINZEUS                              | https://tripolystudio.com/                                          |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://kinman.com/faq.php                                          |
| link externo com texto suspeito | https://libri.com.br | WEDE303                               | https://wede303.org/                                                |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOEBT                           | https://www.nicholeelizabethdemere.com/                             |
| link externo com texto suspeito | https://libri.com.br | top111                                | https://top111.id/                                                  |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOBET                           | https://ghe.co.in/expeditions/                                      |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOBET                           | https://brainspotting.com.br/sobre                                  |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOBET                           | https://ibcu.cu.edu.eg/Ebook/                                       |
| link externo com texto suspeito | https://libri.com.br | WEDE303                               | https://drsaggu.com/gallery/                                        |
| link externo com texto suspeito | https://libri.com.br | WEDE303                               | https://naplesrailing.com/hotel-railing/                            |
| link externo com texto suspeito | https://libri.com.br | WEDE303                               | https://superwoman.ayanawebzine.com/accueil/                        |
| link externo com texto suspeito | https://libri.com.br | WEDE303                               | https://licomat.com/sustainable/                                    |
| link externo com texto suspeito | https://libri.com.br | WEDE303                               | https://zoomoptical.sa/wishlist/                                    |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOBET                           | https://coes.dypgroup.edu.in/exam/                                  |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOBET                           | https://abogadosrudilla.com/que-hacemos                             |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOBET                           | https://24designshop.co.uk/faqs/                                    |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOBET                           | https://digitaurus.tech/services/                                   |
| link externo com texto suspeito | https://libri.com.br | LIVETOTOBET                           | https://planika.com.ua/ru/montazh-biokamina-vse-tonkosti/           |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://howtofindmyip.com/                                          |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://www.mdb.org.br/diretorios-mdb/                              |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://dymmedicalclinic.id/map/                                    |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://abogadosrudilla.com/contaco                                 |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://24designshop.co.uk/contact/                                 |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://revistasoberana.com.br/revista-soberana/                    |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://coes.dypgroup.edu.in/prospectus/                            |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://revistasoberana.com.br/contato/                             |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://bintang4d.id/                                               |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://askmrowl.com/                                               |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://drsaggu.com/blogs/                                          |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://naplesrailing.com/iron-railing/                             |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://licomat.com/media/                                          |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://zoomoptical.sa/shop/                                        |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://www.epoxyflooringtulsa.com/                                 |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://voyagerelectricvehicles.com/shop/                           |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://buffl.nl/offerte/                                           |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://bintangmimpi.com/                                           |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://online.snsrkscollege.ac.in/                                 |
| link externo com texto suspeito | https://libri.com.br | BINTANG4D                             | https://www.llyn.info/                                              |
| link externo com texto suspeito | https://libri.com.br | SLOT2D                                | https://localfoodmonadnock.org/                                     |
| link externo com texto suspeito | https://libri.com.br | SLOT2D                                | https://pharmmedprom.ru/category/roznicza/                          |
| link externo com texto suspeito | https://libri.com.br | SLOT2D                                | https://www.macrmi.info/                                            |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://www.tajmahalfoxtrot.com/rangoon-rhapsody/                   |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://sethu.ac.in/chairman/                                       |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://www.dypatilmedicalkop.org/contact/                          |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://www.saintvincentdepaul-church.org/lent/                     |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://myfirstdigital-jaya.pages.dev/                              |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://www.mdb.org.br/mdb-retro/                                   |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://pharmmedprom.ru/razdel/med/                                 |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://alumni.sethu.ac.in/gallery/                                 |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://chairman-jaya.pages.dev/                                    |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://www.j-rocks.co.id/                                          |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://naplesrailing.com/blog/                                     |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://drsaggu.com/faq/                                            |
| link externo com texto suspeito | https://libri.com.br | JOKER4D                               | https://licomat.com/about/                                          |
| link externo com texto suspeito | https://libri.com.br | https://www.snsrkscollege.ac.in/      | https://www.snsrkscollege.ac.in/                                    |
| link externo com texto suspeito | https://libri.com.br | https://www.leiko.cz/                 | https://www.leiko.cz/                                               |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://curever.com/?id=JOKER4D                                     |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://caodontologia.com.br/?id=JOKER4D                            |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://smart-meetings.fr/joker4d-tech/                             |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://thisisbenaa.com/?id=JOKER4D                                 |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://stolarz4u.pl/bintang4d/                                     |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://www.petkadai.com/media/product/index.php?id_ID=joker4d      |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://fachmike.pl/joker4d/                                        |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://lestendancesdaurel.fr/bintang4d-group/                      |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://sarahnoah-architecte.fr/bintang4d/                          |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://micenaconciergerie.fr/bintang4d-group/                      |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://www.pa-solok.go.id/APA-ITU-TRIK-MAIN-ZEUS-PRAGMATIC-COM     |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://www.pa-solok.go.id/APA-ITU-POLA-MAIN-ZEUS-OLYMPUS-INDONESIA |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://pawsitivepackleader.ca/collections/zahid-ra/                |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://globaltechc.com.br/?id=JOKER4D                              |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://globaltechc.com.br/?id=SKMBET                               |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://adarce.fr/livetotobet-best/                                 |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://recruitment.dpi.co.id/?news_id=joker4d                      |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://ligueoccitanierollerskate.fr/livetotobet-best/              |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://rdb.rw/e-services/                                          |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://livetotobet.pages.dev/                                      |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://gardpetanque.fr/ashwagandha-last-longer-in-bed/il-en/       |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://www.denholmmeetrestaurant.co.uk/reservation/                |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://pgpkeckintamani.org/                                        |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://whiteskull.pl/livetotobet-live-chat/                        |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://termikainstalacje.pl/livetotobet-life/                      |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://cienojetes.com/                                             |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://advocatesofkerala.com/Directory/AdvocateProfile/3197        |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://ruckusjournal.org/                                          |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://sport.toto.nl/live                                          |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://lesrefugiesdugroscaillou.fr/www-cinta-bintang4d-info/       |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://rakkendo.com/?id=bintang4d                                  |
| link externo com texto suspeito | https://libri.com.br | bokep sma                             | https://fasthandymanservices.com/services/electrical-services/      |

## Links externos fora da lista permitida

Nenhum item encontrado.
