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

This project uses `@sveltejs/adapter-node` and is built for SSR.

After the build, the generated Node server bundle is written to `build/`.

You can start it locally after build with:

```bash
npm run start
```

## SSR hosting

This project should now run as a Node app instead of being uploaded as plain static files.

`@sveltejs/adapter-node` makes the app listen on the `PORT` provided by the host.

## Passenger

If your hosting uses Passenger, point Passenger at the repository root and use:

```text
app.js
```

as the startup file.

That file imports the generated SSR server from `build/index.js`.

Typical deploy flow:

```bash
npm install
npm run build
```

Important:

- Build the app before Passenger starts or restarts it.
- Run it with Node 18 to match `package.json`.
- Do not deploy this by copying `build/` into a static `public_html` directory.
