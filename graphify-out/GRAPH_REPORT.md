# Graph Report - rexliu3.github.io  (2026-09-16)

## Corpus Check
- 94 files · ~144,817 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 17 file(s) not represented in the graph (top: .scss 10, (none) 5, .toml 1)

## Summary
- 355 nodes · 636 edges · 35 communities (20 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `21a8fb72`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ApartmentPage.jsx
- Apartment.jsx
- normalizeContent.js
- package.json
- ref_react
- fields.js
- devDependencies
- scripts
- studio/package.json
- manifest.json
- .prettierrc.json
- Sorting Algorithm Visualizer
- Minesweeper Grid
- Personal Website
- Apartment Icon
- HKP Solutions Logo
- Responsive Device Illustration
- Investocracy Logo
- Profile Photograph
- RISE Logo
- Berkeley SkyDeck
- Sudoku Gameplay
- Cafe Jazz Recordings
- Rex Liu Resume
- What You Must Do When Invoked
- graphify reference: extra exports and benchmark
- graphify reference: query, path, explain
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- AGENTS.md
- extraction-spec.md
- App.jsx

## God Nodes (most connected - your core abstractions)
1. `scripts` - 16 edges
2. `project()` - 16 edges
3. `front()` - 14 edges
4. `What You Must Do When Invoked` - 12 edges
5. `floor()` - 10 edges
6. `/graphify` - 10 edges
7. `Icon()` - 9 edges
8. `getContentRooms()` - 9 edges
9. `fallbackContent` - 9 edges
10. `normalizeContent()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `RoomPanel()` --calls--> `useDialog()`  [EXTRACTED]
  src/components/apartment/RoomPanel.jsx → src/hooks/useDialog.js
- `navigateNext()` --calls--> `getContentRooms()`  [EXTRACTED]
  src/components/apartment/RoomPanel.jsx → src/components/apartment/rooms.js
- `MusicTastePanel()` --calls--> `safeUrl()`  [EXTRACTED]
  src/components/apartment/panels/MusicTastePanel.jsx → src/utils/urls.js
- `Pillow()` --calls--> `front()`  [EXTRACTED]
  src/components/apartment/scene/Sofa.jsx → src/components/apartment/scene/geometry.js
- `Dialog()` --calls--> `useDialog()`  [EXTRACTED]
  src/hooks/useDialog.test.jsx → src/hooks/useDialog.js

## Import Cycles
- None detected.

## Communities (35 total, 15 thin omitted)

### Community 0 - "ApartmentPage.jsx"
Cohesion: 0.11
Nodes (22): ref_testing_library_jest_dom_vitest, @testing-library/react, ApartmentIntro(), ApartmentFooter(), ApartmentHeader(), ApartmentNavigation(), ApartmentScene(), getCaption() (+14 more)

### Community 1 - "Apartment.jsx"
Cohesion: 0.21
Nodes (22): Apartment(), Bookshelf(), Cat(), CoffeeTable(), Desk(), floor(), front(), points() (+14 more)

### Community 2 - "normalizeContent.js"
Cohesion: 0.17
Nodes (17): ref_sanity_cli, CONTENT_TIMEOUT_MS, fetchSiteContent(), sanityConfig, src_sanity_config, ContentContext, SanityContentProvider(), src_sanity_defaultcontent (+9 more)

### Community 3 - "package.json"
Cohesion: 0.06
Nodes (28): dependencies, react, react-dom, sanity, engines, node, react, react-dom (+20 more)

### Community 4 - "ref_react"
Cohesion: 0.12
Nodes (17): ref_react, JazzPlayer(), BooksPanel(), CityDrawing(), EducationPanel(), ExperienceItem(), MusicTastePanel(), PhotosPanel() (+9 more)

### Community 5 - "fields.js"
Cohesion: 0.17
Nodes (16): ref_sanity, ref_sanity_structure, singletonTypes, apartmentPortrait, apartmentProject, city, experience, imageField() (+8 more)

### Community 6 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, gh-pages, globals, jsdom (+8 more)

### Community 7 - "scripts"
Cohesion: 0.12
Nodes (16): scripts, build, check, deploy, dev, format, format:check, lint (+8 more)

### Community 8 - "studio/package.json"
Cohesion: 0.12
Nodes (16): styled-components, dependencies, react, react-dom, sanity, styled-components, react, react-dom (+8 more)

### Community 9 - "manifest.json"
Cohesion: 0.25
Nodes (7): background_color, display, icons, name, short_name, start_url, theme_color

### Community 10 - ".prettierrc.json"
Cohesion: 0.33
Nodes (5): printWidth, semi, singleQuote, tabWidth, trailingComma

### Community 11 - "Sorting Algorithm Visualizer"
Cohesion: 0.33
Nodes (6): Bubble Sort, Generate New Array, Heap Sort, Merge Sort, Quick Sort, Sorting Algorithm Visualizer

### Community 12 - "Minesweeper Grid"
Cohesion: 0.67
Nodes (3): Highlighted Board Cell, Minesweeper Grid, Minesweeper Wall

### Community 24 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 25 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 26 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 27 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 28 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 29 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 34 - "App.jsx"
Cohesion: 0.24
Nodes (7): ref_react_dom_client, App(), MainPage(), NotFoundPage(), useSanityContent(), unregister(), src_styles_styles

## Knowledge Gaps
- **142 isolated node(s):** `printWidth`, `tabWidth`, `semi`, `singleQuote`, `trailingComma` (+137 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 165 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@testing-library/react` connect `ApartmentPage.jsx` to `normalizeContent.js`, `package.json`, `ref_react`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `printWidth`, `tabWidth`, `semi` to the rest of the system?**
  _142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ApartmentPage.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11095305832147938 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06218487394957983 - nodes in this community are weakly interconnected._
- **Should `ref_react` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._