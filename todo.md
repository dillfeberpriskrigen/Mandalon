# Todo

Punkter märkta med `→ Tnn` hanterades av en uppgift i [docs/review-roadmap.md](docs/review-roadmap.md). Punkter märkta `→ ej schemalagd` är medvetet utelämnade ur roadmapen — se avsnittet "Deferred / not scheduled" där för motiveringen. Punkter märkta `→ granskning` kommer från extern feedback mot en **äldre version** av sajten; det som redan var gjort när feedbacken togs in ligger under [Klart](#klart).

Klarmarkerade punkter ligger i [Klart](#klart) längst ned.

## Fråga AI

- [ ] Många komponenter är omgivna av en div med en class när de används på sidor. Är det nödvändigt? Är det något i mitt pattern som borde ändras? → ej schemalagd. Granskningen bekräftar mönstret (§2.4): komponenterna äger ingen yttre marginal, så anroparen måste sätta den. Ett medvetet val vore att låta sektionskomponenter äga sitt eget vertikala avstånd. Värt en egen liten uppgift senare.
- [ ] Publik (granskning): vet kunden redan vad bondning är och varför det är viktigt, eller ska sajten förklara det? Vad är viktigast att en kund tar med sig — en tydlig bild av erbjudandet, eller något annat?
- [ ] Paketering-lead vs startsidans underrubriker (granskning): innersidor delar `PageHeader`; startsidan har en egen hero. Behöver paketering ändras, eller är innersidorna konsekventa nog?

## High

- [ ] Kolla manuellt igenom struktur och innehåll efter refaktorering.
- [ ] Trasig forskningslänk på Om Mandalon: MEMS/IMAPS-PDF:en pekar på `twdns.se` med `PHPSESSID` och är död. Kontrollera övriga DIVA-länkar. → granskning

## Medium

- [ ] Skriv om den svenska Sensorer-sektionen på kunskapsbanken till riktig Mandalon-svenska (nuvarande text är en rak översättning från engelskan, tillagd i T17). Granskningen såg att Sensorer saknades helt; sektionen finns nu.
- [ ] Experiment-sidan: strukturera innehållet så det blir tydligare vad som demonstreras, och överväg bättre namn. → ej schemalagd. Dev-only i produktion är redan gjort (T24).
- [ ] Gör om designguide-sidan att mer likna en "read the docs" sida. → T29. T28 är klar (engelsk brödtext i båda locales). Strukturen är migrerad till `designGuideBody.ts`; kvar är riktig `alt`-text på figurerna.
- [ ] Startsida, copy: korta hero och säljtexter (svensk hero är en lång mening). «Packaging är ofta det lilla steget…» är hackig — skriv om till löptext eller punkter. → granskning
- [ ] Karusell (pilar och länk till konsulttjänster finns). Kvar: kort ingress likt konsultsidan, rubrik som nämner konsulttjänster, ev. långsammare bildbyte, mindre luft mot nästa sektion (båda har `padding: 5rem 0`). → granskning
- [ ] SV/EN-glidning på startsidan: «Tre sätt att avlasta ert team» ≠ «Three ways to reduce risk». → granskning
- [ ] Paketering, capability-listan: ge den en rubrik; vänsterkolumnen ska inte radbryta (`minmax(8rem, 0.4fr)`). → granskning
- [ ] Om Mandalon: introstycket under «En introduktion till Mandalon» är upphackat; tomt nedre vänstra hörn — plats för bild. → granskning
- [ ] Kunskapsbank: «sagade wafer» → sågade; SV-titel «WAFER» vs EN «Wafer»; byt sida på bild/text under Mikrostrukturer; lägg till MEMS-bild (saknas i `static/mandalon`). → granskning

## Low

- [ ] Implementera fungerande besöksstatistik som inte använder sig av cookies och som inte lagrar persondata, på så vis är vi kompliant med GDPR utan att inkräkta på användarupplevelsen. Kanske lita blint på requestens Referer. → ej schemalagd, oberoende av roadmapen.
- [ ] Stöd för dark mode. → ej schemalagd. T31 är klar (tokens och CSS-regel dokumenterade); ta upp igen när det är dags.
- [ ] Språkpass senare (medvetet uppskjutet av granskaren): anglicismer (t.ex. «Fånga riskerna tidigt»), tilltal (er / du / kundens) ska jämkas. Gäller startsida, paketering och konsult. → granskning
- [ ] Nya kontaktfoton, särskilt Per-Erik (granskaren: minst 15 år gammal). Kräver nya bilder. → granskning

## Klart

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
- [x] Sensorer-sektionen finns på svenska kunskapsbanken (granskning: saknades helt; språket är fortfarande en rak översättning, se Medium).
- [x] Paketering, 3:e stycket mörkare än övrig brödtext — stämmer inte längre; all text har samma färg. → granskning
- [x] Brödtextkontrast: `.text-body` och `.content-list` använder `--ink` i stället för `--muted`. Bildtexter är fortfarande `--muted`. → granskning
- [x] Sidrubriker matchar menyn: Kontakt / Contact och Om Mandalon / About Mandalon. Tidigare H1-uppmaningar ligger i lead. Header «Om oss» är «Om Mandalon». → granskning
- [x] Kontaktsidan är mer standard: uppgifter först, lika personkort (bild över namn), «Teknisk säljare», besöksrad under kartan. Nya foton saknas fortfarande. → granskning
- [x] Header: Kunskapsbank och Designguide ligger i huvudmenyn (efter tjänsterna, före Om Mandalon). Footer följer samma ordning plus integritetspolicy. → granskning
- [x] Text har bakgrund via Surface (PageHeader, lösa textblock, FAQ-/karusellrubriker, startsidans säljsektion, designguide, footer). Motherboard-bilden syns bara i luckorna mellan paneler.
