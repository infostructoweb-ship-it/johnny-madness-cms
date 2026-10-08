# Johnny Madness – website met CMS

Teksten en afbeeldingen staan in `src/_data/` en zijn aan te passen via Pages CMS.
Bij elke wijziging bouwt Cloudflare de site opnieuw (± 1 minuut).

## Mappen
- `src/_data/home.json` – teksten en afbeeldingen van de homepagina
- `src/_data/site.json` – algemene instellingen (SEO, boeklink, footer, socials)
- `src/index.njk` – de opbouw van de pagina
- `src/css/style.css` – opmaak (kleuren bovenaan bij `:root`)
- `src/images/uploads/` – afbeeldingen die via de CMS geüpload worden
- `.pages.yml` – bepaalt welke velden in de CMS zichtbaar zijn
- `eleventy.config.js` – bouwinstellingen (zet afbeeldingen automatisch om naar WebP)

## Cloudflare-instellingen
- Framework preset: None
- Build command: `npm run build`
- Build output directory: `_site`

## CMS
Inloggen via https://app.pagescms.org met GitHub. Klanten nodig je uit per e-mail
(ze hebben geen GitHub-account nodig).

## Lokaal testen (optioneel)
`npm install` en daarna `npm start`, open http://localhost:8080
