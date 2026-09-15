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
- `src/hooks/`: audio lifecycle and dialog keyboard behavior.
- `src/sanity/`: shared configuration, content defaults, fetching, and validation.
- `src/styles/apartment/`: styles split by responsibility; `styles.scss` is the entry point.
- `studio/schemaTypes/`: one schema per document type with shared field helpers.

Keep side effects in hooks or maintenance scripts and validate remote data at the
content boundary. Components should receive normalized data through props or
`useSanityContent`. Keep page state in `ApartmentPage` and pass normalized content
and explicit event handlers to its presentation components. The CMS query lives in `src/sanity/siteQuery.js`;
transport, cancellation, and fallback handling live in `client.js`. Keep the shared SVG projection in `scene/geometry.js` so
objects stay aligned. Preserve dialog keyboard controls and reduced-motion styles.

The app retains its existing React 16 / Create React App toolchain for compatibility.
Its dependency tree still reports security advisories and deprecation warnings;
upgrading the build system and React is a separate migration, not resolved by formatting
or removing unused direct dependencies.

## Content management

Website copy, labels, room metadata, and presentation text live in
`src/sanity/defaultContent.json` and ship with the application. Sanity contains
only content expected to change independently: the résumé, wall portrait,
photography portfolio, experience, side projects, and travel entries. The jazz
playlist and presentation copy remain bundled with the site.

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

Upload portfolio photographs in **Photography portfolio → Images**. Each image
supports alternative text, a caption, and a location, and the array order controls
the display order. Published images appear in the camera panel.

Upload the framed wall image in **Apartment portrait → Portrait** and provide its
alternative text. The bundled profile picture remains the fallback until an upload
is published.

Hosted preview origins may be rejected by Sanity's CORS allowlist. The fallback
keeps those previews usable, but does not grant access to live CMS changes. Add the
exact preview origin in the project's API/CORS settings when live content is needed.
No write token belongs in browser configuration.

`src/sanity/defaultContent.json` is the source of truth for website copy and the
bundled fallback for apartment content. Copy changes require a site deployment.
Sanity write tokens are used only for explicit maintenance and deployment work;
they must never be exposed to browser code or committed.
