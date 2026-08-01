# Todo

Punkter märkta med `→ Tnn` hanteras av en uppgift i [docs/review-roadmap.md](docs/review-roadmap.md). Punkter märkta `→ ej schemalagd` är medvetet utelämnade ur roadmapen — se avsnittet "Deferred / not scheduled" där för motiveringen.

## Fråga AI

- [x] Be AI att se över om något borde struktureras om, förenklas eller refaktoreras för att göra kodbasen enklare att underhålla. (Gjort: [docs/architecture-review.md](docs/architecture-review.md) och roadmapen.)
- [ ] Många komponenter är omgivna av en div med en class när de används på sidor. Är det nödvändigt? Är det något i mitt pattern som borde ändras? → ej schemalagd. Granskningen bekräftar mönstret (§2.4): komponenterna äger ingen yttre marginal, så anroparen måste sätta den. Ett medvetet val vore att låta sektionskomponenter äga sitt eget vertikala avstånd. Värt en egen liten uppgift senare.

## High

- [ ] Kolla manuellt igenom struktur och innehåll efter refaktorering.
- [ ] Be AI att ta bort eventuell debugg-kod och kommentarer. → T03 (död analyskod och oanvända ikoner). Övrig genomgång kvarstår.
- [x] Gruppera engelska och svenska routes i kodbasen med sveltekit groups, alltså parenteser. Framför allt med syfte att hitta lättare i koden.
- [ ] Lägg in stöd för permalinks eller åtminstone redirects, för att lätt kunna hantera flyttade sidor och URL:er. Ta hänsyende till hur svelte och sveltekit arbetar effektivt och vad som kan göras på klienten respektive vad som måste göras på servern. Försök göra allt så det går att köras på klienten. → T14 steg 5. Notera: 301-omdirigeringar av borttagna URL:er **måste** ske på servern (`hooks.server.ts`), eftersom en klient aldrig får se sidan innan omdirigeringen. Interna länkbyten sköts av rutregistret i T09.

## Medium

- [ ] English / Swedish toggle fungerar inte på Design guide sidan → T10.
- [ ] Text har ibland bakgrund men ibland transparent, då stör hemsidans bakgrundsbild. Se till att all text har bakgrund eller placeras i en Surface eller något annat bra. → ej schemalagd (formgivning, inte arkitektur). Överlappar T27, som gör bakgrunden billigare men inte mindre störande.
- [ ] Utvärdera hantering av locales och förbättra vid behov. Det är dumt ifall det finns tvetydigheter i tolkning av URL:er och det är dumt ifall något av detta förhindrar svelte och sveltekit att arbeta effektivt. Tänk särskilt på hantering av default locale och om denna innehåller en sida vars namn kan förväxlas en en annan locale, typ /sv/en och man väljer sv som default locale och därmed förväntas /en fungera, det bästa är nog att förbjuda sidnamn som kolliderar på det viset men fundera över alternativen. → T14. Din oro var befogad och problemet är större än väntat: sex felspråkiga sidor byggs som statiska filer vid varje deploy, och `/vadsomhelst/kontakt` gör 301 till `/kontakt`. Se "Verified URL behaviour" i roadmapen.
- [ ] Gör det tydligare i menyn i sidhuvudet vilken sida som är aktiv. → T21.
- [ ] Flytta språkvalet till en EN / SV knapp istället, och gör så att Contact har en liten telefon-ikon. Det känns märkligt med en orange knapp "mitt i" menyn just nu. → ej schemalagd (formgivning). Gör den gärna efter T21, som ändå rör samma markup.
- [ ] Ge länkar ett tydligare utseende. Den på designguide sidan ser bara ut som vanlig tjock text. Alla länkar borde ha liknande utseende. De på kontakt sidan ser bättre ut. Det tyck vara den som kalla callout-style som inte ser ut som en länk. → ej schemalagd (formgivning). T11 tar bort `target="_blank"` från just den länken, men inte dess utseende.
- [ ] Experiment sidan fyller ett bra syfte för utvecklaren, men be AI att strukturera befintligt innehåll på sidan så det blir lite mer förklarande vad som demonstreras. Kanske fundera ut bättre namn, om möjligt gör enbart tillgänglig när man kör med `npm run dev` och utelämna ur produktion. → T24 gör den dev-only. Innehållsförbättringen är ej schemalagd.
- [ ] Utvecklaren ska komplettera todo med extern feedback från granskning. Påminn användaren om detta.
- [ ] Gör om designguide sidan att mer likna en "read the docs" sida. → T28 (språkbeslut först) och T29. Läs T28 innan du börjar — att behålla guiden på engelska sparar ungefär en veckas arbete.

## Low

- [ ] Migrera helt och hållet till typescript istället för javascript. → i praktiken redan gjort under `src/`; kvar är konfigurationsfiler och `scripts/*.mjs`, som medvetet får förbli JavaScript.
- [ ] Om möjligt i komponenten `Link` Detektera automatiskt ifall en länk leder till en extern sajt, eller är en fil, och ge den `target="_blank"` → ej schemalagd. Blir enklare efter T11, eftersom interna länkar då bär en `PageKey` och allt annat per definition är externt.
- [ ] Se till att inga globala stilar appliceras av komponenter eller sidor. All global styling ska ske via app.css. Om en sida behöver "pierce the scope boundry" känns det som att komponenten i fråga behöver få mer optioner eller något. → T23 tar bort den värsta (`:global(body)` på statistiksidan) och T31 skriver ner regeln för när en `:global()` är acceptabel.
- [ ] Implementera fungerande besöksstatistik som inte använder sig av cookies och som inte lagrar persondata, på så vis är vi kompliant med GDPR utan att inkräkta på användarupplevelsen. Kanske lita blint på requestens Referer. → ej schemalagd, oberoende av roadmapen.
- [x] Kanske gruppera sidor i projektet efter typ: site, statistik, eventuellt någon för verktyg. Alltså på sveltekit-sätt, en mapp med parentes runt namnet. (Gjort: `(site)`, `(en)`, `(stats)`; verktyg/dev-grupp tillkommer i T24.)
- [ ] Önska något lättare sätt att hantera språkfilen för hemsidan och hur innehållet hamnar på sidor. → T17 hindrar att språken glider isär; T18 delar upp filen per sida. T18 är märkt valfri — den gör filen trevligare men löser inget fel.
- [ ] Stöd för dark mode. → ej schemalagd. Kräver att design-tokens är helt semantiska; ta upp igen efter T31.
