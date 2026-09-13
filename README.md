# Rex's Personal Website

Find it here: [rexliu.dev](https://rexliu.dev).

## Development

Use Node.js 22.12 or newer and install dependencies from the lockfile:

```bash
npm ci --legacy-peer-deps
npm run dev
```

The application runs on port 3000. For a production preview, run
`npm run build` followed by `npm run preview`.

Run `npm run check` before committing. It runs ESLint, Prettier checks, the test
suite, and the production build. Use `npm run format` to apply the shared style.
Studio changes additionally require `npm run sanity:build` after installing its
dependencies with `npm --prefix studio ci`.

## Code organization

- `src/components/pages/`: routing views, loading states, and apartment state.
- `src/components/apartment/scene/`: SVG objects and shared projection helpers.
- `src/components/apartment/panels/`: individual room content.
- `src/hooks/`: audio lifecycle, dialog keyboard behavior, and collection access.
- `src/sanity/`: shared configuration, content defaults, fetching, and validation.
- `src/styles/apartment/`: active styles, split by responsibility; `styles.scss`
  is the entry point. Other style folders support the retained portfolio components.
- `studio/schemaTypes/`: one schema per document type with shared field helpers.
- `scripts/`: explicit maintenance operations such as dataset seeding.

Keep side effects in hooks or maintenance scripts and validate remote data at the
content boundary. Components should receive normalized data through props or
`useSanityContent`. Keep the shared SVG projection in `scene/geometry.js` so
objects stay aligned. Preserve dialog keyboard controls and reduced-motion styles.

The app retains its existing React 16 / Create React App toolchain for compatibility.
Its dependency tree still reports security advisories and deprecation warnings;
upgrading the build system and React is a separate migration, not resolved by formatting
or removing unused direct dependencies.

## Content management

The site reads all profile, apartment, experience, project, education, community, city, interest, and music metadata from the public `production` dataset in the **Rex’s Internet Apartment** Sanity project.

To edit content locally:

```bash
npm --prefix studio install
npm run sanity:dev
```

The Studio is configured in `studio/` and deployed at [rex-internet-apartment.sanity.studio](https://rex-internet-apartment.sanity.studio/). Publish changes there and the application will pick them up from Sanity's API CDN.

Project, dataset, and API version defaults are centralized in
`src/sanity/config.json`. The browser prefers live content, fills missing required
fields at the content boundary, and falls back to bundled apartment content if a
request fails or exceeds eight seconds. Cancellation is preserved when a view unmounts.

Hosted preview origins may be rejected by Sanity's CORS allowlist. The fallback
keeps those previews usable, but does not grant access to live CMS changes. Add the
exact preview origin in the project's API/CORS settings when live content is needed.
No write token belongs in browser configuration.

`src/sanity/defaultContent.json` is shared by the browser fallback and seed script.
Update it when changing the baseline apartment content. Live publishing does not
automatically update that snapshot. The older portfolio collections have no bundled
snapshot and are empty when the API cannot be reached.

To seed a dataset, provide a write token and run the script below. It reads the
legacy portfolio collections and uses `createOrReplace`: existing documents with
the same IDs are overwritten. It is a maintenance operation, not part of preview
or build.

```bash
SANITY_API_TOKEN=... npm run sanity:seed
```

Optional `SANITY_PROJECT_ID` and `SANITY_DATASET` environment variables override the default target. The write token is used only by the seed script and must never be exposed to the browser or committed.
