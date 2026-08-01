# Mandalon

SvelteKit remake of `mandalon.se`.

## Node versions

Deploy and local `.nvmrc` target **Node 18.20.8** (the host only offers Node 18). `package.json` `engines.node` is therefore `>=18.20.8`.

CI builds on **Node 24** (see `.github/workflows/inleed-node-multi.yml`). Full local tooling does not all fit on Node 18: **ESLint 10** requires `^20.19.0 || ^22.13.0 || >=24`. Prefer Node 20.19+, 22.13+, or 24 for `npm run lint` and day-to-day development; use 18.20.8 when you need to mirror the deploy runtime.

`@types/node` is currently major 24 — ahead of the deploy runtime. `@sveltejs/adapter-static` remains in `devDependencies` but is unused; production uses `@sveltejs/adapter-node`.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
```

The build uses `@sveltejs/adapter-node` and writes a Node server under `build/`. Entry for Phusion Passenger is `_passenger.cjs`, which imports `./build/index.js`.

## Deploy (Inleed / Passenger)

GitHub Actions workflow: `.github/workflows/inleed-node-multi.yml`.

1. CI (`NODE_VERSION=24`) runs `npm ci` and `npm run build`.
2. The artifact is `build/`, `package.json`, `package-lock.json`, and `_passenger.cjs`.
3. On the server (`SERVER_NODE_VERSION=18`), the app is unpacked, `npm install --omit=dev` runs in the Node 18 venv, and Passenger starts the app via `_passenger.cjs`.

Pushes to `develop` / `test1` / `test2` deploy to the matching secrets; `main` deploys to production.
