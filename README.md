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
2. The artifact is `build/`, `package.json`, `package-lock.json`, `_passenger.cjs`, `.env.example`, and `scripts/ensure-env.mjs`.
3. On the server, `scripts/ensure-env.mjs` runs **before** the app is stopped: it copies `.env.example` to `.env` if needed, appends missing keys, and fails if `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, or `CONTACT_TO` are empty. The running site stays up if that check fails.
4. Then the app is stopped, unpacked (`SERVER_NODE_VERSION=18`), `npm install --omit=dev` runs in the Node 18 venv, and Passenger starts via `_passenger.cjs` (which loads `.env` next to the wrapper, outside `build/`).

Copy `.env.example` to `.env` for local `npm run dev`. Vite loads it automatically. Do not commit `.env`. On the server the file lives beside `_passenger.cjs` so it survives `rm -rf build`.

Pushes to `develop` / `test1` / `test2` deploy to the matching secrets; `main` deploys to production.

### New environment (DirectAdmin)

Create the **subdomain** first. Document root: **Default** → `/domains/<hostname>/public_html`.

Application root, `APP_ROOT_*`, and `cloudlinux-selector --app-root` have no leading slash and no trailing slash: `domains/<hostname>/node-root`.

Then Extra Features → Setup Node.js App → Create Application:

- Node.js version: `18.20.8`
- Application mode: Production
- Application root: `domains/<hostname>/node-root`
- Application URL: choose the subdomain; leave the extra path field **empty** (app at `/`)
- Application startup file: `_passenger.cjs` (this repo’s Passenger entry, not `app.js`)
- Passenger log file: the prefix is `/home/<user>/`; fill `domains/<hostname>/node-log/passenger.log`

Those fields write `public_html/.htaccess`.

Create Application also adds `node-root/` (stub `_passenger.cjs`, empty `public/` and `tmp/`), empty `node-log/`, and `~/nodevenv/domains/<hostname>/node-root/18/`. Until the first GitHub deploy, the stub is a tiny HTTP server that responds `It works!` plus the Node version. Deploy replaces it with this repo’s `_passenger.cjs` (loads `.env`, imports `./build/index.js`) and creates `.env` via `scripts/ensure-env.mjs`. After `npm install` on the server, `node_modules` is a symlink into that venv.

**The only manual filesystem step:** delete the DirectAdmin placeholder so Apache does not serve it instead of the Node app:

```bash
rm ~/domains/<hostname>/public_html/index.html
```

Do **not** delete `public_html/`. That directory is the Apache docroot; CloudLinux `.htaccess` lives there. Without it Passenger never starts. Do not put site files in `public_html`.

Layout after setup:

```text
/home/<user>/domains/<hostname>/node-root/     # APP_ROOT, deploy target
/home/<user>/domains/<hostname>/node-log/      # passenger.log (outside deploy)
/home/<user>/domains/<hostname>/public_html/   # .htaccess (plus empty cgi-bin)
/home/<user>/nodevenv/domains/<hostname>/node-root/18/
```

### GitHub secrets

No trailing slash on any path-like value. No `/home/<user>/` prefix on `APP_ROOT_*`.

Shared by `develop` / `test1` / `test2`: `SSH_HOST`, `SSH_PORT`, `SSH_USER`, `SSH_PRIVATE_KEY`.

Per preview branch (`deploy-dev` maps these onto `APP_ROOT` and `DOMAIN`): `APP_ROOT_DEVELOPMENT`, `DOMAIN_DEVELOPMENT`, `APP_ROOT_TEST1`, `DOMAIN_TEST1`, `APP_ROOT_TEST2`, `DOMAIN_TEST2`.

Production (`main`): `SSH_HOST_MAIN`, `SSH_PORT_MAIN`, `SSH_USER_MAIN`, `SSH_PRIVATE_KEY_MAIN`, `APP_ROOT_MAIN`.

- `APP_ROOT_*`: `domains/<hostname>/node-root`. Same string as DirectAdmin Application root and `--app-root`. Used as `cd`, SCP `target`, Selector `--app-root`, and `/home/<user>/nodevenv/<APP_ROOT>/18/bin/activate`. A trailing slash or an absolute home path breaks the venv path and Selector.
- `DOMAIN_*`: `<hostname>` (no `https://`, no trailing slash). Selected in the same `deploy-dev` step as `APP_ROOT`.
- `SSH_HOST` / `SSH_HOST_MAIN`: hostname or IP only (no `ssh://`)
- `SSH_PORT` / `SSH_PORT_MAIN`: integer
- `SSH_USER` / `SSH_USER_MAIN`: account name (the `/home/<user>` basename)
- `SSH_PRIVATE_KEY` / `SSH_PRIVATE_KEY_MAIN`: full PEM, including the BEGIN/END lines

### `cloudlinux-selector` (SSH)

Inleed runs the app with CloudLinux Node Selector. After SSH login the shell starts in `/home/<user>/`. The Node files live at:

```text
/home/<user>/domains/<hostname>/node-root
```

`--app-root` is **relative to that home directory**, not an absolute path. It is the same value stored in the GitHub secrets `APP_ROOT_*` (and used for `cd`, SCP, and the Node venv under `~/nodevenv/<app-root>/18/`).

```bash
# Restart a running app (typical after a manual .env change)
cloudlinux-selector restart --json --interpreter nodejs --app-root domains/<hostname>/node-root

# Same flags as CI: stop, then start
cloudlinux-selector stop --json --interpreter nodejs --app-root domains/<hostname>/node-root
cloudlinux-selector start --json --interpreter nodejs --app-root domains/<hostname>/node-root
```

Example: if `pwd` is `/home/you/domains/test.example.se/node-root`, then `--app-root` is `domains/test.example.se/node-root`. Do not pass `/home/you/...` or only `node-root`.

## Adding images

Content images live under `static/mandalon/` as **WebP**. Do not add new JPEG or PNG assets for page content.

1. Export or convert the source file to WebP at equivalent visual quality (roughly quality 85 for photos, 90 for diagrams with flat color / text). Keep the intrinsic pixel size you intend to declare — do not invent responsive `srcset` variants by hand.
2. Place the `.webp` file under `static/mandalon/` (or a subdirectory such as `designguide/`).
3. Register it in the relevant page module under `src/lib/content/pages/` as a `ContentImage`: `{ src, alt, width, height }`, with `width`/`height` equal to the file’s intrinsic dimensions. Keep Swedish and English entries in sync.
4. Render it with `src/lib/components/media/Image.svelte` (required `src`, `alt`, `width`, `height`; optional `caption`, `priority`). Do not add raw `<img>` tags on content pages.
5. Logos and other SVG chrome assets may stay as SVG. If per-width responsive variants are ever genuinely needed, prefer `@sveltejs/enhanced-img` over a hand-maintained `srcset` pipeline.
