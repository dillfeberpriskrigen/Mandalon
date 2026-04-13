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
```

This project uses `@sveltejs/adapter-static`.

After the build, the generated static site is written to `build/`.

## Static hosting

Upload the contents of `build/` to your web root, for example `public_html`.

Typical deploy flow:

```bash
npm install
npm run build
```

Then copy the contents of `build/` into the public directory used by the subdomain.
