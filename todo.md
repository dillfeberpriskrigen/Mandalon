# Todo

## Fråga AI

- [ ] Be AI att se över om något borde struktureras om, förenklas eller refaktoreras för att göra kodbasen enklare att underhålla.
- [ ] Många komponenter är omgivna av en div med en class när de används på sidor. Är det nödvändigt? Är det något i mitt pattern som borde ändras?

## High

- [ ] Kolla manuellt igenom struktur och innehåll efter refaktorering.
- [ ] Be AI att ta bort eventuell debugg-kod och kommentarer.
- [x] Gruppera engelska och svenska routes i kodbasen med sveltekit groups, alltså parenteser. Framför allt med syfte att hitta lättare i koden.

## Medium

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
- [x] Kanske gruppera sidor i projektet efter typ: site, statistik, eventuellt någon för verktyg. Alltså på sveltekit-sätt, en mapp med parentes runt namnet. (Gjort: `(site)`, `(en)`, `(stats)`; verktyg/dev-grupp kan tillkomma senare.)
- [ ] Önska något lättare sätt att hantera språkfilen för hemsidan och hur innehållet hamnar på sidor.
- [ ] Stöd för dark mode.
