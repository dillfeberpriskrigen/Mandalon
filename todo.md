# Todo

Punkter märkta med `→ Tnn` hanterades av en uppgift i [docs/review-roadmap.md](docs/review-roadmap.md). Punkter märkta `→ ej schemalagd` är medvetet utelämnade ur roadmapen — se avsnittet "Deferred / not scheduled" där för motiveringen.

Klarmarkerade punkter ligger i [Klart](#klart) längst ned.

## Fråga AI

- [ ] Många komponenter är omgivna av en div med en class när de används på sidor. Är det nödvändigt? Är det något i mitt pattern som borde ändras? → ej schemalagd. Granskningen bekräftar mönstret (§2.4): komponenterna äger ingen yttre marginal, så anroparen måste sätta den. Ett medvetet val vore att låta sektionskomponenter äga sitt eget vertikala avstånd. Värt en egen liten uppgift senare.

## High

- [ ] Kolla manuellt igenom struktur och innehåll efter refaktorering.
- [ ] Ge länkar ett tydligare utseende. Den på designguide sidan ser bara ut som vanlig tjock text. Alla länkar borde ha liknande utseende. De på kontakt sidan ser bättre ut. Det tycks vara den som kallas callout-style som inte ser ut som en länk. → ej schemalagd (formgivning). T11 tog bort `target="_blank"` från just den länken, men inte dess utseende.

## Medium

- [ ] Skriv om den svenska Sensorer-sektionen på kunskapsbanken till riktig Mandalon-svenska (nuvarande text är en rak översättning från engelskan, tillagd i T17).
- [ ] Text har ibland bakgrund men ibland transparent, då stör hemsidans bakgrundsbild. Se till att all text har bakgrund eller placeras i en Surface eller något annat bra. → ej schemalagd (formgivning, inte arkitektur). Överlappar T27, som gör bakgrunden billigare men inte mindre störande.
- [ ] Experiment-sidan: strukturera innehållet så det blir tydligare vad som demonstreras, och överväg bättre namn. → ej schemalagd. Dev-only i produktion är redan gjort (T24).
- [ ] Utvecklaren ska komplettera todo med extern feedback från granskning. Påminn användaren om detta.
- [ ] Gör om designguide-sidan att mer likna en "read the docs" sida. → T29. T28 är klar (engelsk brödtext i båda locales). Strukturen är migrerad till `designGuideBody.ts`; kvar är riktig `alt`-text på figurerna.

## Low

- [ ] Om möjligt i komponenten `Link` Detektera automatiskt ifall en länk leder till en extern sajt, eller är en fil, och ge den `target="_blank"` → ej schemalagd. Enklare efter T11, eftersom interna länkar då bär en `PageKey` och allt annat per definition är externt.
- [ ] Implementera fungerande besöksstatistik som inte använder sig av cookies och som inte lagrar persondata, på så vis är vi kompliant med GDPR utan att inkräkta på användarupplevelsen. Kanske lita blint på requestens Referer. → ej schemalagd, oberoende av roadmapen.
- [ ] Stöd för dark mode. → ej schemalagd. T31 är klar (tokens och CSS-regel dokumenterade); ta upp igen när det är dags.

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
