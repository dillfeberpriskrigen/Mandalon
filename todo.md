# Todo

## Vital fixes

- [x] Se till att **npm run check** kan köras utan att retunera fel.

## High

## Medium

- [x] Ta bort /empty som använts för att testa layout
- [ ] English / Swedish toggle fungerar inte på Design guide sidan
- [ ] Text har ibland bakgrund men ibland transparent, då stör hemsidans bakgrundsbild. Se till att all text har bakgrund eller placeras i en Surface eller något annat bra.
- [ ] Lägg in stöd för permalinks eller åtminstone redirects, för att lätt kunna hantera flyttade sidor och URL:er. Ta hänsyende till hur svelte och sveltekit arbetar effektivt och vad som kan göras på klienten respektive vad som måste göras på servern. Försök göra allt så det går att köras på klienten.
- [ ] Utvärdera hantering av locales och förbättra vid behov. Det är dumt ifall det finns tvetydigheter i tolkning av URL:er och det är dumt ifall något av detta förhindrar svelte och sveltekit att arbeta effektivt.
- [ ] Gör det tydligare i menyn i sidhuvudet vilken sida som är aktiv.
- [ ] Flytta språkvalet till en EN / SV knapp istället, och gör så att Contact har en liten telefon-ikon. Det känns märkligt med en orange knapp "mitt i" menyn just nu.

## Low

- [ ] Migrera helt och hållet till typescript istället för javascript.
- [ ] Om möjligt i komponenten `Link` Detektera automatiskt ifall en länk leder till en extern sajt, eller är en fil, och ge den `target="_blank"`
- [ ] Se till att inga globala stilar appliceras av komponenter eller sidor. All global styling ska ske via app.css. Om en sida behöver "pierce the scope boundry" känns det som att komponenten i fråga behöver få mer optioner eller något.
- [ ] Implementera fungerande besöksstatistik som inte använder sig av cookies och som inte lagrar persondata, på så vis är vi kompliant med GDPR utan att inkräkta på användarupplevelsen. Kanske lita blint på requestens Referer.

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
- [ ] **Minska scoped styles i sidor:** Audit varje `+page.svelte`; flytta delad styling till komponenter eller `src/lib/styles/` (via `app.css`). Lämna kvar endast layout unik för sidan (grid/flex/breakpoints). (delvis: `.surface-grid` i `surface.css`; `.content-list` i `typography.css` — konsulttjanster/om-mandalon; `.text-body` muted; muted `:global(p)` pierces borttagna på phase-1 + paketering + sections; kunskapsbank intro → `MediaArticleSection`, kvar guide-callout page-local; home phase 2 klar — `HeroSection` + `FeatureCarousel` + `SalesIntroSection`; page-unique layout på kontakt; `designguide` deferred from consolidation until redesign)
- [x] **Flytta site chrome:** Flytta `SiteHeader.svelte` och `SiteFooter.svelte` till `src/lib/components/layout/` och uppdatera imports.
- [x] **Flytta innehållskomponenter:** Flytta `ParagraphArray.svelte` till `src/lib/components/content/` och uppdatera imports.
- [x] **Utvärdera Image:** Behåll `Image.svelte` endast om den behövs (t.ex. lazy loading, aspect ratio, caption). Annars ta bort komponenten och använd `<img>` direkt tills behov uppstår.

### Komponenter att bygga (efter strukturen ovan)

- [x] **`PageHeader`** / [x] **`PageShell`** — gemensamt sidhuvud (`h1` + lead) och sid-padding som upprepas på de flesta sidor.
- [x] **`Heading` och `Link`** — implementera WIP-komponenterna så typografilagret (option A) kan användas konsekvent på sidor.
- [x] **Utöka `MediaArticleSection`** — `kontakt` person-rader och `kunskapsbank` intro + topic-rader migrerade.
- [x] **Paneler/kort via `Surface`** — ersätt duplicerade `.panel` / `.service-card` / `.intro-panel`-stilar på t.ex. om-mandalon och konsulttjanster.
- [ ] **`Table`** — migrera capabilities-tabellen på paketering när komponenten implementeras.
- [x] **`FaqSection`** — extrahera från kunskapsbank vid sidmigration.
- [ ] **Övriga upprepningar** — vid sidmigration: extrahera till `sections/` / `content/` när samma mönster syns på 2+ sidor (t.ex. callouts, feature-rader); behåll engångsmönster i sidan. (delvis: 2-col Surface-grid → global `.surface-grid`; bullet lists → `.content-list`; home `SalesIntroSection`; kunskapsbank guide-callout behålls page-local)

# Fixed

- Favicon (ikon på fliken)
- Göra så att "Hero"-delen på startsidan inte tar upp hela sidan på höjden, nu blir allt lila och inga kontraster

- Fixa till en vit mandalon-logga uppe till vänster istället för inverterade färger
- Knappen för nedladdning av designguiden är svart, ser knas ut, går inte att läsa

- Jag gillar inte att menyn känns som den är till höger om mitten. Åtminstone inte så mycket. Kanske göra så att loggan + menyn är centrerad?

- Gör en sektion "Bonding Services", kanske istället för "Chip & Sensors"

- Bottenmenyn är överflödig
