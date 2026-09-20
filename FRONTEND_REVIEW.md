# Frontend review — September 20, 2026

Reviewed the public application with Playwright/Chromium, axe-core, screenshot inspection, and the [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). The existing apartment design is preserved; fixes address reproduced interaction, accessibility, and layout issues.

## Coverage

| Surface            | Checks                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Homepage           | Header, navigation, introduction, scene, overview cards, contact links, footer, day/night themes               |
| Directory          | Expand/collapse, search, no results, reset, keyboard focus restoration                                         |
| Books              | Published nonfiction/fiction, covers, links, empty state, long titles                                          |
| Travel             | Journey, 45 published visits, pin activation, keyboard notes, complete place list                              |
| Projects           | Published project, bundled fallback projects, previews, links, long content                                    |
| Music & dance      | Published annual song lists and Spotify links                                                                  |
| Café jazz          | All track controls, playback, pause, selection, volume, failed audio recovery                                  |
| Photos             | Published empty state and populated gallery fixture with long captions                                         |
| Education          | Both published schools, logos, long institution names, night-mode contrast                                     |
| About me           | Portrait, introduction, contact links                                                                          |
| Résumé             | Five published jobs, logos, notes, open/download actions                                                       |
| Scene interactions | Every hotspot, weather, cat, motion pause/resume, reduced-motion preference                                    |
| Shared dialogs     | Deep links, refresh, browser history, focus trap, Escape, close buttons, backdrop dismissal, next-corner cycle |
| Not found          | Return-home action, persisted theme, custom Netlify HTTP 404 routing                                           |

Responsive audit widths: **1440, 768, 390, and 320px**, in both day and night mode. Dialog screenshots and accessibility scans include the beginning and end of scrollable content. Long-content browser tests also run at 320px. Mobile tests use Chromium with iPhone 13 emulation, not a physical iPhone or Safari.

## Fixed findings

- `src/pages/ApartmentPage.jsx:28` — skip link targeted the scene instead of the directory button; native fragment navigation now moves keyboard focus to the intended control.
- `src/components/apartment/panels/VisitedCitiesMap.jsx:47` — focus/hover opened a pin and its click handler immediately closed it; activation now consistently opens the note.
- `src/components/apartment/panels/VisitedCitiesMap.jsx:61` — tooltip positioning could clip near map edges; its horizontal position is clamped with room for the label.
- `src/components/apartment/panels/VisitedCitiesMap.jsx:70` — dense pins obscure individual visits; a native expandable list exposes every place and visit date.
- `src/styles/apartment/_theme.scss:1` — light dialog surfaces inherited night text/focus colors; dialogs now define their own light palette.
- `src/styles/apartment/_panels.scss` — low-contrast secondary text, labels, book spines, record labels, and company links darkened while preserving the palette.
- `src/styles/apartment/_panels.scss:174` — broad paragraph specificity overrode component typography; reduced specificity and removed the now-unnecessary jazz-credit `!important`.
- `src/styles/apartment/_panels.scss:97` — contained dialog overscroll, reserved space for the sticky header during keyboard scrolling, and allowed long text to wrap.
- `src/styles/apartment/_panels.scss:133` — enlarged dialog close buttons to 44px and gave footer controls a 44px minimum height.
- `src/components/apartment/ApartmentScene.jsx:43` — added a pause/resume control for continuous animations; operating-system reduced-motion behavior remains supported.
- `src/components/apartment/RoomDirectory.jsx:32` — supplied a search field name and disabled irrelevant autocomplete.
- `src/pages/NotFoundPage.jsx:5` — preserved the saved theme on the not-found page.
- `netlify.toml:8` — configured the application's not-found page for unknown paths with HTTP 404, using [Netlify's custom 404 routing](https://docs.netlify.com/manage/routing/redirects/redirect-options/#custom-404-page-handling).

## Validation

- 51 unit tests passed.
- All 88 page/theme/viewport audits finished with zero detected axe violations, horizontal overflows, broken images, or JavaScript exceptions.
- Another 16 accessibility checks passed for expanded/empty directories, map notes, and expanded place lists at desktop and 320px widths in both themes.
- 26 Playwright browser checks passed across desktop and mobile (24 in the full run, followed by the two added hotspot/navigation cases).
- ESLint, Prettier, production build, and `git diff --check` passed.
- Graphify updated with `graphify update .`.
- No application dependencies added; axe-core was installed only in a temporary audit directory.

Local preview origins are not allowed by the CMS's existing CORS configuration. The published-content audit fetched the public CMS response through Playwright's request client and fulfilled it locally; the fallback tests deliberately block the CMS. Production verification passed using the real browser request without interception.

Screenshots and detailed accessibility results are in `/private/tmp/rex-frontend-audit/final/`. Automated checks supplement visual and keyboard review; they do not establish complete WCAG conformance. The separately hosted Sanity Studio is outside this public-site deployment.

## Deployment

Published and verified at [www.rexliu.dev](https://www.rexliu.dev/). [Netlify deployment 6ab01d2d588dbc3b67b59f6d](https://app.netlify.com/projects/competent-albattani-54885e/deploys/6ab01d2d588dbc3b67b59f6d) completed on September 20, 2026. Live Playwright checks passed for the homepage, public CMS request, all nine dialogs, persisted night mode, résumé PDF response, and custom HTTP 404/return-home flow. No JavaScript exceptions occurred.

Deploy the existing Netlify project `efee5e79-b7f7-4c05-8508-857234628134` from an isolated source folder containing `src/`, `public/`, `package.json`, `package-lock.json`, `index.html`, `vite.config.js`, `netlify.toml`, and `.nvmrc`. The Netlify MCP uploader does not honor this repository's full ignore rules; staging avoids bundling nested Studio dependencies and local environment files. Netlify builds the application from these same tested source files.
