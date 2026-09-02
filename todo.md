# Todo

Punkter märkta med `→ Tnn` hanterades av en uppgift i [docs/review-roadmap.md](docs/review-roadmap.md). Punkter märkta `→ ej schemalagd` är medvetet utelämnade ur roadmapen — se avsnittet "Deferred / not scheduled" där för motiveringen. Punkter märkta `→ granskning` kommer från extern feedback mot en **äldre version** av sajten; det som redan var gjort när feedbacken togs in ligger under [Klart](#klart).

Klarmarkerade punkter ligger i [Klart](#klart) längst ned.

## High

- [ ] Nya kontaktfoton, särskilt Per-Erik (granskaren: minst 15 år gammal). Kräver nya bilder. → granskning

## Medium

- [ ] Nya uppdaterade referensprojekt

## Low

- [ ] Roligare 404 sida
- [ ] Byt till ny bild på stugan
- [ ] Slider före-efter bild på kretskortdesign till riktigt kretskort
- [ ] Designguide: skriv riktig `alt`-text på figurerna. → T29 (docs-layouten är klar).
- [ ] Experiment-sidan: strukturera innehållet så det blir tydligare vad som demonstreras, och överväg bättre namn. → ej schemalagd. Dev-only i produktion är redan gjort (T24).
- [ ] Kolla manuellt igenom struktur och innehåll efter refaktorering.

## Klart

- [x] Gör om designguide-sidan att mer likna en "read the docs" sida. Sticky sidomeny med innehåll, delade sidkomponenter. → T29. T28 är klar (engelsk brödtext i båda locales). Alt-text på figurerna är kvar som egen punkt.
- [x] Stöd för dark mode. Tokens växlar på `:root.dark` (systempreferens som standard, sol/måne till höger om EN/SV). → T31 lade grunden.

- [x] Komponenter wrappade i en div med class på sidor: medvetet. Primitiver (`Surface`, `Heading`) äger ingen yttre marginal; anroparen sätter avstånd och layout. Sektioner som alltid sitter likadant (`ContactCtaSection`, `FaqSection`) äger redan `margin-top`. Inget Stack/Grid-lager — se `svelte-components.mdc`.

- [x] Implementera fungerande besöksstatistik som inte använder sig av cookies och som inte lagrar persondata. SvelteKit-backend, SQLite/MariaDB, landskod utan sparad IP, 404:or och redirects.

- [x] Be AI att se över om något borde struktureras om, förenklas eller refaktoreras för att göra kodbasen enklare att underhålla. (Gjort: [docs/architecture-review.md](docs/architecture-review.md) och roadmapen.)
- [x] Be AI att ta bort eventuell debugg-kod och kommentarer. → T02 (död analyskod, oanvänd `Surface`-import, oanvända ikoner). Ingen kvarvarande debug-kod värd en extra runda.
- [x] Gruppera engelska och svenska routes i kodbasen med SvelteKit-grupper, alltså parenteser. Framför allt med syfte att hitta lättare i koden. → T14.
- [x] Permalinks / redirects för flyttade sidor och URL:er. → T09 (rutregister för interna länkar) och T14 steg 5 (301 i `hooks.server.ts` för de sex pensionerade engelska sluggarna). Nya flyttar läggs till där.
- [x] Permalink-lista för gamla sajtens URL:er. Nya 404:or läggs som rader i `src/lib/legacy-redirects.ts`.
- [x] English / Swedish-toggle på designguide-sidan. → T10.
- [x] Utvärdera och rätta locale-/URL-hantering (felspråkiga dubbletter, `/vadsomhelst/kontakt` → 301, kollision mot `/en`). → T14.
- [x] Gör det tydligare i menyn i sidhuvudet vilken sida som är aktiv. → T21 (`aria-current="page"` plus tydligare visuell markering).
- [x] Experiment- och fonts-sidorna enbart i `npm run dev`, inte i produktion. → T24 (`(dev)`-grupp).
- [x] Migrera helt och hållet till TypeScript under `src/`. Konfigurationsfiler och `scripts/*.mjs` får medvetet förbli JavaScript.
- [x] Inga sidnivå-globala stilar som läcker (stats-sidans `:global(body)`). Regeln för när `:global()` är acceptabelt finns i styling-regeln. → T23 och T31.
- [x] Gruppera sidor i projektet efter typ: site, statistik, verktyg. → `(site)`, `(sv)` / `en`, `(stats)`, `(dev)` (T24).
- [x] Lättare sätt att hantera språk/innehåll: språken kan inte glida isär tyst, och innehållet är uppdelat per sida. → T17 och T18.
- [x] Vald meny ser just nu konstig ut, den får dubbla streck under sig och ser trasig ut. Använd istället färger för att visa vilken som är vald meny. Accentfärg + tyngre vikt i `SiteHeader`; global `aria-current`-understrykning borttagen.
- [x] Flytta språkvalet till en EN / SV knapp, Contact med telefonikon, samma färg som övriga länkar, längst till höger i headern.
- [x] Lägg till integritetspolicy (svenska + engelska) som saknades vid migreringen. Gamla URL:en är `/integritetspolicy-3/`; lägg en redirect dit när sidan finns. Länk i footern, inte i huvudmenyn.
- [x] Ge länkar ett tydligare utseende. Callout-style (utan understrykning) är borttagen; `Link` är alltid understruken med hover-markering. Designguide-PDF:en är en `Button`.
- [x] `Link` (och `Button`) sätter `target="_blank"` automatiskt för externa URL:er och nedladdningsbara filer. Logiken ligger i `src/lib/links.ts`.
- [x] Komplettera todo med extern feedback från granskning.
- [x] Karusellen har pilar, prickar och länkar till konsulttjänster (granskning mot äldre sajt utan pilar/länk).
- [x] Om Mandalon ligger i headern som «Om oss» (granskning ville flytta upp den från footern).
- [x] Sensorer-sektionen finns på svenska kunskapsbanken med originaltexten («I begynnelsen var näsan»), inte den raka T17-översättningen. → granskning
- [x] Paketering, 3:e stycket mörkare än övrig brödtext — stämmer inte längre; all text har samma färg. → granskning
- [x] Brödtextkontrast: `.text-body` och `.content-list` använder `--ink` i stället för `--muted`. Bildtexter är fortfarande `--muted`. → granskning
- [x] Sidrubriker matchar menyn: Kontakt / Contact och Om Mandalon / About Mandalon. Tidigare H1-uppmaningar ligger i lead. Header «Om oss» är «Om Mandalon». → granskning
- [x] Kontaktsidan är mer standard: uppgifter först, lika personkort (bild över namn), «Teknisk säljare», besöksrad under kartan. Nya foton saknas fortfarande. → granskning
- [x] Header: Kunskapsbank och Designguide ligger i huvudmenyn (efter tjänsterna, före Om Mandalon). Footer följer samma ordning plus integritetspolicy. → granskning
- [x] Text har bakgrund via Surface (PageHeader, lösa textblock, FAQ-/karusellrubriker, startsidans säljsektion, designguide, footer). Motherboard-bilden syns bara i luckorna mellan paneler.
- [x] Startsida, copy: kortare hero (svenska i två meningar) och säljtext som löptext under en kort rubrik. → granskning
- [x] Karusell: ingress likt konsultsidan, rubrik som nämner konsulttjänster, långsammare bildbyte (8 s), mindre luft mot säljsektionen. → granskning
- [x] SV/EN-glidning på startsidan: processrubriken betyder samma sak i båda språken («avlasta ert team» / «lighten the load on your team»). → granskning
- [x] Paketering-lead vs startsidans underrubriker: innersidor behåller `PageHeader`; paketering fick en längre lead i samma mönster som konsultsidan. → granskning
- [x] Paketering, capability-listan: rubrik i en Surface; vänsterkolumnen radbryter inte (`minmax(8rem, max-content)` + `nowrap`). → granskning
- [x] Lägg till produktområde för elektronikingenjör: testsystem, schema och kretskortsdesign på projekt och tim-basis. Konsultsidan har «Elektronik & testsystem» med ECAD-layout, samma område i karusellen.
- [x] SEO för nyckelord: Advanced Packaging, Wire Bonding, Trådbondning, Die Bonding. Start- och paketeringssidorna har termerna i title, description, H1 och ingress. Organization JSON-LD använder sidfotens logga.
- [x] Trasig forskningslänk på Om Mandalon: MEMS/IMAPS-PDF:en pekade på `twdns.se` med `PHPSESSID` och är död. IMAPS-raden länkar till lokal PDF (`mems-packaging-imaps-2008.pdf`). Övriga DIVA-länkar är kvar. → granskning
- [x] Om Mandalon: introstycket under «En introduktion till Mandalon» är upphackat; tomt nedre vänstra hörn. Labbfoto (`labhuset.webp`) ligger i introt. → granskning
- [x] Publik: tekniska köpare känner till bondning. Sajten förklarar varför det spelar roll i en mening, sedan erbjudandet. Designguiden tar hur. → granskning
- [x] Kunskapsbank, språk: «sagade» → sågade; SV-titel «Wafer» som EN. FAQ, ASIC, MEMS och mikrostrukturer putsade; Sensorer orörd. Sidan togs sedan bort. → granskning
- [x] Språkpass startsida, paketering och konsult: ni/er/ert genomgående, anglicismer som «Fånga riskerna tidigt» och «sitta i en box» ut. → granskning
- [x] Kunskapsbank borttagen. PostNord under Besök oss på kontakt. 301 från `/knowledge-bank`, `/kunskapsbank` och `/hjalp` till kontakt. → granskning
