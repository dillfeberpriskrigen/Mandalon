## Passenger Setup

For a Passenger-based Node deployment, use:

- Node.js version: `18.20.8`
- Application mode: `Production`
- Application root: the deployed project directory for the subdomain
- Application startup file: `app.js`

On the server, install dependencies and build before starting:

```bash
npm install
npm run build
```

If the app is updated, rebuild it and then restart the application in the hosting panel.

If the host serves a subdomain from its own `public_html`-style directory, deploy the project in that subdomain directory so the domain, app root and Passenger config all point to the same place.
