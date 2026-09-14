# Rex's Personal Website

Find it here: [rexliu.dev](https://rexliu.dev).

## Development

Use Node.js 22.12 or newer and install dependencies from the lockfile:

```bash
nvm use # Optional: selects the Node.js version in .nvmrc
npm ci --legacy-peer-deps
npm run dev
```

The application runs on port 3000. For a production preview, run
`npm run build` followed by `npm run preview`.

Run `npm run check` before committing. It runs ESLint, Prettier checks, the test
suite, and the production build. Use `npm run format` to apply the shared style.
GitHub Actions runs the website checks and Studio build on pushes and pull requests.
Studio changes additionally require `npm run sanity:build` after installing its
dependencies with `npm --prefix studio ci`.

## Code organization

- `src/components/pages/`: routing views, loading states, and apartment state.
- `src/components/apartment/`: apartment presentation, navigation, and room dialogs.
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
`useSanityContent`. Collection consumers use canonical content keys, such as
`useCollection("courseGroups")`, rather than legacy database collection names.
Keep page state in `ApartmentPage` and pass explicit values and event handlers to
its presentation components. The CMS query lives in `src/sanity/siteQuery.js`;
transport, cancellation, and fallback handling live in `client.js`. Keep the shared SVG projection in `scene/geometry.js` so
objects stay aligned. Preserve dialog keyboard controls and reduced-motion styles.

The app retains its existing React 16 / Create React App toolchain for compatibility.
Its dependency tree still reports security advisories and deprecation warnings;
upgrading the build system and React is a separate migration, not resolved by formatting
or removing unused direct dependencies.

## Content management

Website copy, labels, room metadata, and presentation text live in
`src/sanity/defaultContent.json` and ship with the application. Sanity contains
only content expected to change independently, including the résumé, Instagram
gallery, experience, projects, coursework, community work, interests, travel
entries, and music.

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

Upload résumé updates in **Résumé → PDF** in Sanity Studio and publish the
document. The site uses the uploaded PDF from Sanity’s CDN and falls back to
`public/Resume_RexLiu.pdf` when the field is empty.

Hosted preview origins may be rejected by Sanity's CORS allowlist. The fallback
keeps those previews usable, but does not grant access to live CMS changes. Add the
exact preview origin in the project's API/CORS settings when live content is needed.
No write token belongs in browser configuration.

`src/sanity/defaultContent.json` is the source of truth for website copy and
provides browser fallbacks for selected collections. Copy changes require a site
deployment. The older portfolio collections have no bundled snapshot and are empty
when the API cannot be reached.

To seed a dataset, provide a write token and run the script below. It reads the
legacy portfolio collections and uses `createOrReplace`: existing documents with
the same IDs are overwritten. It is a maintenance operation, not part of preview
or build.

```bash
SANITY_API_TOKEN=... npm run sanity:seed
```

Optional `SANITY_PROJECT_ID` and `SANITY_DATASET` environment variables override the default target. The write token is used only by the seed script and must never be exposed to the browser or committed.

## Instagram gallery

The camera panel reads cached Instagram posts from Sanity. A scheduled GitHub
Actions workflow refreshes the latest 12 posts every six hours, so the Instagram
access token never reaches the browser. If no posts have been synced, the panel
keeps showing the configured fallback photo.

The connected Instagram account must be a professional Business or Creator
account. Create a Meta app with Instagram API with Instagram Login, authorize that
account with the `instagram_business_basic` scope, and add these GitHub repository
secrets:

- `INSTAGRAM_ACCESS_TOKEN`: the access token for the connected Instagram account.
- `SANITY_API_TOKEN`: a Sanity token with permission to create and delete documents
  in the configured dataset.

Run **Sync Instagram gallery** from the repository’s Actions tab for the first
import. For a local manual sync, use:

```bash
INSTAGRAM_ACCESS_TOKEN=... SANITY_API_TOKEN=... npm run instagram:sync
```

`INSTAGRAM_API_VERSION`, `INSTAGRAM_MEDIA_LIMIT`, `SANITY_PROJECT_ID`, and
`SANITY_DATASET` are optional overrides. Rotate or refresh the Instagram token
before it expires; a failed sync leaves the last successful gallery in Sanity.
