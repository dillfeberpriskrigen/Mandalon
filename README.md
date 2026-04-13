# Mandalon

SvelteKit remake of `mandalon.se`.

## Local development

Use Node `18.20.8` or another Node `18` release that satisfies the engine requirement.

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
npm run start
```

The production server uses `@sveltejs/adapter-node` and starts from `build/index.js`.

## Passenger / shared hosting

If you deploy this on a Passenger-based host:

- Node.js version: `18.20.8`
- Application mode: `Production`
- Application startup file: `app.js`

After upload or pull:

```bash
npm install
npm run build
```

Then restart the app in the hosting panel.
