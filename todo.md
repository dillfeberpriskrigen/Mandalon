# Todo

## Vital fixes

## Medium

## Low

## Samordning av komponenter och formatmallar

Det här är en stor punkt. Bryt ut de flesta delar av webbplatsen till återanvändbara komponenter och säkerställ en enhetlig styling som främst styrs från `app.css` och de CSS-filer som importeras därifrån.

- Skapa en enhetlig hantering av text så att endast ett fåtal textstilar används konsekvent på hela webbplatsen.
- Implementera någon form av textbehållare (eller några få varianter) för att säkerställa enhetlig bredd, placering och läsbarhet.

### Komponentstruktur

- [ ] **Typografi (option A):** Använd `Text`, `Heading` och `Link` som typografilager — ta bort `Typography.svelte` (undvik dubbel abstraktion).
- [ ] **Flytta site chrome:** Flytta `SiteHeader.svelte` och `SiteFooter.svelte` till `src/lib/components/layout/` och uppdatera imports.
- [ ] **Flytta innehållskomponenter:** Flytta `ParagraphArray.svelte` till `src/lib/components/content/` och uppdatera imports.
- [ ] **Utvärdera Image:** Behåll `Image.svelte` endast om den behövs (t.ex. lazy loading, aspect ratio, caption). Annars ta bort komponenten och använd `<img>` direkt tills behov uppstår.

### Komponenter att bygga (efter strukturen ovan)

- [ ] **`PageHeader` / `PageShell`** — gemensamt sidhuvud (`h1` + lead) och sid-padding som upprepas på de flesta sidor.
- [ ] **Utöka `MediaArticleSection`** — täck samma mönster som `kontakt` (person-rader) och `kunskapsbank` (topic-rader).
- [ ] **Paneler/kort via `Surface`** — ersätt duplicerade `.panel` / `.service-card` / `.intro-panel`-stilar på t.ex. om-mandalon och konsulttjanster.
- [ ] **`Table`** — migrera capabilities-tabellen på paketering när komponenten implementeras.
- [ ] **`FaqSection`** — extrahera från kunskapsbank vid sidmigration.
- [ ] **`experiment`-sidan** — visa demos av komponenter i olika lägen (se refactoring-regeln).

# Fixed

- Favicon (ikon på fliken)
- Göra så att "Hero"-delen på startsidan inte tar upp hela sidan på höjden, nu blir allt lila och inga kontraster

- Fixa till en vit mandalon-logga uppe till vänster istället för inverterade färger
- Knappen för nedladdning av designguiden är svart, ser knas ut, går inte att läsa

- Jag gillar inte att menyn känns som den är till höger om mitten. Åtminstone inte så mycket. Kanske göra så att loggan + menyn är centrerad?

- Gör en sektion "Bonding Services", kanske istället för "Chip & Sensors"

- Bottenmenyn är överflödig
