# Todo

## Fråga AI
- [ ] Be AI att se över om något borde struktureras om, förenklas eller refaktoreras för att göra kodbasen enklare att underhålla.
- [ ] Många komponenter är omgivna av en div med en class när de används på sidor. Är det nödvändigt? Är det något i mitt pattern som borde ändras?

## Vital fixes

- [x] Se till att **npm run check** kan köras utan att retunera fel.

## High
- [ ] Kolla manuellt igenom struktur och innehåll efter refaktorering.
- [ ] Be AI att ta bort eventuell debugg-kod och kommentarer.

## Medium

- [x] Ta bort /empty som använts för att testa layout
- [ ] English / Swedish toggle fungerar inte på Design guide sidan
- [ ] Text har ibland bakgrund men ibland transparent, då stör hemsidans bakgrundsbild. Se till att all text har bakgrund eller placeras i en Surface eller något annat bra.
- [ ] Lägg in stöd för permalinks eller åtminstone redirects, för att lätt kunna hantera flyttade sidor och URL:er. Ta hänsyende till hur svelte och sveltekit arbetar effektivt och vad som kan göras på klienten respektive vad som måste göras på servern. Försök göra allt så det går att köras på klienten.
- [ ] Utvärdera hantering av locales och förbättra vid behov. Det är dumt ifall det finns tvetydigheter i tolkning av URL:er och det är dumt ifall något av detta förhindrar svelte och sveltekit att arbeta effektivt.
- [ ] Gör det tydligare i menyn i sidhuvudet vilken sida som är aktiv.
- [ ] Flytta språkvalet till en EN / SV knapp istället, och gör så att Contact har en liten telefon-ikon. Det känns märkligt med en orange knapp "mitt i" menyn just nu.
- [ ] Ge länkar ett tydligare utseende. Den på designguide sidan ser bara ut som vanlig tjock text. Alla länkar borde ha liknande utseende. De på kontakt sidan ser bättre ut. Det tyck vara den som kalla callout-style som inte ser ut som en länk.
- [ ] Experiment sidan fyller ett bra syfte för utvecklaren, men be AI att strukturera befintligt innehåll på sidan så det blir lite mer förklarande vad som demonstreras. Kanske fundera ut bättre namn, om möjligt gör enbart tillgänglig när man kör med `npm run dev` och utelämna ur produktion.
- [ ] Utvecklaren ska komplettera todo med extern feedback från granskning. Påminn användaren om detta.
- [ ] Gör om designguide sidan att mer likna en "read the docs" sida.

## Low

- [ ] Migrera helt och hållet till typescript istället för javascript.
- [ ] Om möjligt i komponenten `Link` Detektera automatiskt ifall en länk leder till en extern sajt, eller är en fil, och ge den `target="_blank"`
- [ ] Se till att inga globala stilar appliceras av komponenter eller sidor. All global styling ska ske via app.css. Om en sida behöver "pierce the scope boundry" känns det som att komponenten i fråga behöver få mer optioner eller något.
- [ ] Implementera fungerande besöksstatistik som inte använder sig av cookies och som inte lagrar persondata, på så vis är vi kompliant med GDPR utan att inkräkta på användarupplevelsen. Kanske lita blint på requestens Referer.
- [ ] Kanske gruppera sidor i projektet efter typ: site, statistik, eventuellt någon för verktyg. Alltså på sveltekit-sätt, en mapp med parentes runt namnet.
- [ ] Önska något lättare sätt att hantera språkfilen för hemsidan och hur innehållet hamnar på sidor.
- [ ] Stöd för dark mode.

## Konsolidering av komponenter och formatmallar

Det här är en stor punkt. Bryt ut de flesta delar av webbplatsen till återanvändbara komponenter och säkerställ en enhetlig styling som främst styrs från `app.css` och de CSS-filer som importeras därifrån.

- Minimera antalet scoped styles direkt i +page.svelte filer och se till att detta styrs via komponenter och/eller app.css och dess importer
- Skapa en enhetlig hantering av text så att endast ett fåtal textstilar används konsekvent på hela webbplatsen.
- Implementera en textbehållare för att säkerställa enhetlig bredd, placering och läsbarhet på alla sidor.
- Skapa ytterligare komponenter för kod som upprepas på flera sidor eller som kan bli vanligt använda.

### Komponentstruktur

- [x] **Typografi (option A):** Använd `Text`, `Heading` och `Link` som typografilager — ta bort `Typography.svelte` (undvik dubbel abstraktion). (`.text-label` tillagt)
- [x] **Enhetlig textstil:** Inventera textklasser/stilar i sidor och scoped CSS; begränsa till få tillåtna varianter (`Text` + `Heading` + globala heading-klasser) och migrera bort ad-hoc fontstorlekar. (`designguide` deferred — own ad-hoc styles until redesign)
- [x] **Textbehållare:** Ta bort `narrow` / `wide` från `PageContent`; använd en gemensam bredd på alla sidor. Ersätt blandade container-/bredd-mönster (inkl. `.text-width` där det behövs) så brödtext får enhetlig bredd, placering och läsbarhet. (`PageContent` = `.text-width`; `PageShell` utan `narrow`; `.container-wide` / `.container-narrow` borttagna; `--container-width-narrow` removed from `app.css` — designguide sets `--container-width: 980px` page-locally)
- [x] **Minska scoped styles i sidor:** Audit varje `+page.svelte`; flytta delad styling till komponenter eller `src/lib/styles/` (via `app.css`). Lämna kvar endast layout unik för sidan (grid/flex/breakpoints). (klart för phase-1 + paketering + home; page-unique layout kvar på kontakt/kunskapsbank callout/om-mandalon; `Table`/`Button`/`layout.css`; `designguide` deferred)
- [x] **Flytta site chrome:** Flytta `SiteHeader.svelte` och `SiteFooter.svelte` till `src/lib/components/layout/` och uppdatera imports.
- [x] **Flytta innehållskomponenter:** Flytta `ParagraphArray.svelte` till `src/lib/components/content/` och uppdatera imports.
- [x] **Utvärdera Image:** Behåll `Image.svelte` endast om den behövs (t.ex. lazy loading, aspect ratio, caption). Annars ta bort komponenten och använd `<img>` direkt tills behov uppstår.

### Komponenter att bygga (efter strukturen ovan)

- [x] **`PageHeader`** / [x] **`PageShell`** — gemensamt sidhuvud (`h1` + lead) och sid-padding som upprepas på de flesta sidor.
- [x] **`Heading` och `Link`** — implementera WIP-komponenterna så typografilagret (option A) kan användas konsekvent på sidor.
- [x] **Utöka `MediaArticleSection`** — `kontakt` person-rader och `kunskapsbank` intro + topic-rader migrerade.
- [x] **Paneler/kort via `Surface`** — ersätt duplicerade `.panel` / `.service-card` / `.intro-panel`-stilar på t.ex. om-mandalon och konsulttjanster.
- [x] **`Table`** — capabilities-tabellen på paketering migrerad; styles i `src/lib/styles/table.css`.
- [x] **`FaqSection`** — extrahera från kunskapsbank vid sidmigration.
- [x] **`Button`** — primary/secondary; `a` eller `button`; styles i `src/lib/styles/button.css` (demo på experiment; designguide ej omkopplad).
- [x] **Övriga upprepningar** — extraherat vid 2+ sidor (`.surface-grid`, `.content-list`, home sections, `MediaArticleSection`); engångsmönster (kunskapsbank guide-callout, kontakt map) behålls page-local.

# Fixed

- Favicon (ikon på fliken)
- Göra så att "Hero"-delen på startsidan inte tar upp hela sidan på höjden, nu blir allt lila och inga kontraster

- Fixa till en vit mandalon-logga uppe till vänster istället för inverterade färger
- Knappen för nedladdning av designguiden är svart, ser knas ut, går inte att läsa

- Jag gillar inte att menyn känns som den är till höger om mitten. Åtminstone inte så mycket. Kanske göra så att loggan + menyn är centrerad?

- Gör en sektion "Bonding Services", kanske istället för "Chip & Sensors"

- Bottenmenyn är överflödig
