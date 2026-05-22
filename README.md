# ludovickninja.github.io

Static GitHub Pages site hosting Ludo B. Design's public landing page and a
collection of internal jewelry-workshop tools, 3D / AR viewers, and quiz
prototypes. Everything in this repo is served as-is from
`https://ludovickninja.github.io/<path>/`.

The root `index.html` is a redirect that sends visitors to `/Links/`, which
acts as the public homepage.

---

## Table of contents

- [Live URLs](#live-urls)
- [Repository layout](#repository-layout)
- [DesignBuddyDesktop](#designbuddydesktop)
- [3D & AR viewers](#3d--ar-viewers)
- [Quizzes & sandboxes](#quizzes--sandboxes)
- [Shared assets](#shared-assets)
- [External integrations](#external-integrations)
- [Local development](#local-development)
- [Review notes](#review-notes)

---

## Live URLs

| Path | Purpose |
|------|---------|
| `/` | Redirects to `/Links/` |
| `/Links/` | Public landing page (bio, quote form, socials, viewer links) |
| `/Dev/` | Internal project navigator for every subproject in this repo |
| `/DesignBuddyDesktop/` | Multi-tool workshop dashboard (calculators, FAQ, contacts, news) |
| `/Model_Viewer/` | Three.js GLB model viewer with model selector |
| `/MTL_Signature_Viewer/` | MTL signature ring viewer (Three.js + webcam capture) |
| `/CAD_Preview/` | Lightweight CAD reference page |
| `/MTL/MTL.html` | Standalone MTL material preview page |
| `/AR/`, `/AR1/`, `/AR2/` | WebRTC + Three.js AR experiments (camera + 3D overlay) |
| `/UnrealViewer/` | Stub viewer page targeting Unreal-exported content |
| `/quiz/`, `/quiz1/`, `/quiz2/`, `/Quiz3/` | Jewelry trivia quiz iterations |
| `/thirdThree/` | Three.js + webcam layout experiment |
| `/myLibTest/` | Sandbox for `lib/myThreeJSlib.js` |
| `/api/Models.json` | Static JSON catalog of GLB models by collection |

---

## Repository layout

```
.
├── index.html              # redirect to /Links/
├── Links/                  # public landing page (the "homepage")
├── Dev/                    # internal project navigator
├── DesignBuddyDesktop/     # workshop dashboard (the largest app)
├── Model_Viewer/           # Three.js GLB viewer
├── MTL_Signature_Viewer/   # Three.js viewer + capture
├── MTL/                    # MTL.html standalone material preview
├── CAD_Preview/            # minimal CAD reference page
├── AR/  AR1/  AR2/         # three iterations of WebRTC AR experiments
├── UnrealViewer/           # stub viewer
├── quiz/ quiz1/ quiz2/ Quiz3/  # jewelry trivia quiz iterations
├── thirdThree/             # Three.js + webcam sandbox
├── myLibTest/              # sandbox for lib/myThreeJSlib.js
├── api/Models.json         # GLB model catalog
├── assets/                 # shared images, SVGs, GLB models, HDRIs
└── lib/myThreeJSlib.js     # local Three.js helpers (sandbox-only)
```

---

## DesignBuddyDesktop

The main internal tool. A single-page tabbed dashboard rendered entirely
client-side; tab content lives in `partials/*.html` and is fetched lazily on
first activation.

**Entry point**: `DesignBuddyDesktop/index.html` → loads `fingerSizes.js`,
`materialDensities.js`, `contacts.js`, then `app.js`.

**Translations**: English + French, switched via the sidebar `<select>`.
`app.js` holds the `translations` object and re-renders all tabs on language
change.

### Tabs

| Category    | Tab                          | Source                                 |
|-------------|------------------------------|----------------------------------------|
| Stone Counts| Full Eternity                | `partials/stone-count-full-eternity.html` |
| Stone Counts| Halos                        | `partials/stone-count-halo.html`       |
| Stone Counts| Hidden Halos                 | `partials/stone-count-hidden-halo.html`|
| Weights     | Karat Conversion             | `partials/weight-conversion.html`      |
| Weights     | Wedding Band                 | `partials/weight-wedding-band.html`    |
| Weights     | Width Conversion             | `partials/width-conversion.html`       |
| Weights     | Diamond Sizes                | `partials/weight-diamond-sizes.html`   |
| Informations| Useful Links                 | `partials/useful-links.html`           |
| Informations| FAQ (embedded React app)     | `partials/faq.html` → iframe to `partials/faq-app.html` |
| Informations| Jewelry News Feed            | `partials/news-feed.html` (rss2json)   |
| Informations| Contact Repository           | `partials/contact-repository.html` (data in `contacts.js`) |
| Forms       | Rush Requests                | `partials/rush-requests.html`          |
| Forms       | Stone Order Form             | `partials/stone-order-form.html`       |
| Forms       | Employee Suggestions         | `partials/employee-suggestions.html`   |
| GPTs        | Design Buddy Chat (v1 / v2)  | External ChatGPT GPT links             |
| GPTs        | StyleMatch                   | Upload image → n8n webhook → SKU match |

### Key calculations (in `app.js`)

- `calcEternityStoneCount(...)` — derives stone count and angular step for an
  eternity band from finger inner diameter, melee diameter, band thickness,
  spacing, and coverage ratio. Coverage ratio is mapped from the UI's
  full/half/three-quarters buttons.
- `setupHalo` / `setupHiddenHalo` — perimeter-based stone counts for halo
  and hidden-halo configurations across round/oval/pear/marquise/rectangular
  center shapes. Result is rounded down to the nearest even number.
- `setupWeightConversion` — volume = mass/density; converts a known piece's
  weight to a target material using `materialDensities.js`.
- `setupWeddingBandWeight` — closed-form volume of a pipe band (annular
  prism) or comfort-fit band (torus approximation), then mass via density.
- `setupWidthConversion` / `setupDiamondSizes` — linear scaling of weight by
  width/thickness ratios, plus a minimum thickness rule
  (`0.65 × stone + 0.4 mm`).
- `setupNewsFeed` — pulls RSS feeds (National Jeweler, JCK Online, Instore
  Magazine) via `api.rss2json.com` and lists the 12 most recent items.
- `setupContactRepository` — renders `window.contacts` from `contacts.js`,
  with free-text search and multi-tag filtering.
- `setupStyleMatch` — POSTs a user-selected image as multipart/form-data to
  the n8n StyleMatch webhook and shows the JSON response.

### Configurable endpoint

```js
window.DESIGN_BUDDY_STYLE_MATCH_URL // optional override for the StyleMatch webhook
```
Default falls back to the hardcoded `crownring.app.n8n.cloud/webhook-test/...`
endpoint in `app.js`.

---

## 3D & AR viewers

All viewers load Three.js 0.132.0 from `cdn.skypack.dev` and pull GLB models
from `/assets/models/` and HDR environments from `/assets/environment/`.

- **Model_Viewer** — orbit-controlled GLB viewer with a model dropdown.
  Auto-centers each model and rotates the object on a clock-driven tick.
  Environment: `Studio.hdr`.
- **MTL_Signature_Viewer** — same renderer pipeline plus a `capture.js`
  helper for snapping the canvas.
- **AR / AR1 / AR2** — three progressive iterations of a WebRTC viewer:
  a `<video>` element streams the device camera, the Three.js canvas
  overlays it, and a Controls accordion exposes perspective/top/front
  cameras, turntable toggle, reset, and camera-device pickers. Each
  iteration tweaks scene setup and capture behavior; `webrtc.js` is the
  same MediaDevices boilerplate across the three.
- **thirdThree** — small Three.js + webcam page used for layout trials.
- **UnrealViewer** — minimal stub for Unreal-exported content
  compatibility tests.
- **MTL/MTL.html** — single-page material preview (note: file is
  `MTL.html`, not `index.html`, so the `/MTL/` URL does **not** resolve on
  GitHub Pages — see [Review notes](#review-notes)).

---

## Quizzes & sandboxes

- **quiz, quiz1, quiz2, Quiz3** — four near-identical jewelry trivia quiz
  iterations. Each has a name screen, progress bar, multiple-choice question
  list, and a final score screen. They differ mainly in the question bank
  and filename casing (`script.js` vs `Script.js`, `style.css` vs
  `styles.css`).
- **myLibTest** — integration sandbox for `lib/myThreeJSlib.js`. The lib
  exports `logLog` and `myThreeJSlib`, plus internal helpers
  (`fitCameraToObject`, `getObjCenter`, `calculateAspectRatioFit`).

---

## Shared assets

- `assets/models/` — GLB rings and demo models (Model, MTL, Heart Band,
  Beveled Edge, Bombe, Bombe Mid, Haimy).
- `assets/environment/` — `Studio.hdr` and `royal_esplanade_1k.hdr` for IBL.
- `assets/svg/` — `logo.svg`, `camera.svg`, `arrow/`.
- `assets/img/` — branding images and product photo.
- `api/Models.json` — model catalog grouped by collection (Models, Aurélie,
  Laurie-Anne, Eric). Note: a few entries reference GLB files
  (`Diamond.glb`, `Laurie-Anne Pere.glb`, `Eric.glb`, …) that are **not
  present** in `assets/models/`.

---

## External integrations

| Service | Used for | Where |
|---------|----------|-------|
| `crownring.app.n8n.cloud/webhook-test/43ac772c-…` | StyleMatch image → SKU lookup | `DesignBuddyDesktop/app.js` |
| `crownring.app.n8n.cloud/webhook/faq-search` | FAQ semantic search | `DesignBuddyDesktop/partials/faq-app.html` |
| `crownring.app.n8n.cloud/webhook/faq-submit` | FAQ question submission + AI draft | `DesignBuddyDesktop/partials/faq-app.html` |
| `api.rss2json.com` | Convert publisher RSS feeds to JSON for the News tab | `DesignBuddyDesktop/app.js` |
| ChatGPT custom GPTs (`chatgpt.com/g/...`) | Design Buddy v1 / v2 chat tabs | `DesignBuddyDesktop/app.js` |
| Google Forms | Quote requests on the Links page | `Links/index.html` |
| `cdn.skypack.dev` | Three.js 0.132.0 + addons | All viewers, `lib/myThreeJSlib.js` |
| `unpkg.com` | React 18 + Babel standalone for the FAQ app | `DesignBuddyDesktop/partials/faq-app.html` |
| `webrtc.github.io/adapter` | Cross-browser MediaDevices polyfill | AR/AR1/AR2 |

No API keys, OAuth secrets, or other credentials are present in source.
All endpoints are public client-callable URLs; access control (if any) lives
on the n8n side.

---

## Local development

This is a pure static site — there is no build step, package manager, or
server runtime.

```bash
# from the repo root
python3 -m http.server 8000
# then visit http://localhost:8000/Links/  (or /DesignBuddyDesktop/, etc.)
```

A static server is required (not `file://`) because:
- `DesignBuddyDesktop/app.js` uses `fetch()` to load tab partials.
- Three.js ES module imports require proper MIME types.
- The FAQ React app loads JSX via Babel and posts to webhooks.

Deployment is automatic via GitHub Pages on push to the default branch.

---

## Review notes

These are observations from a one-pass review of the codebase. None of them
block the site from working today; they're listed so future work has a
starting point.

### Repository hygiene

- **Tracked editor/OS artifacts.** `.DS_Store` (root, `assets/`,
  `assets/models/`), `.vs/` (Visual Studio user state), and `slnx.sqlite`
  are committed. These should be in a `.gitignore` and removed from
  history when convenient. `.gitattributes` is currently empty.
- **`Dev/README.md` is a placeholder** containing the single word
  `readme`. The Dev portal page (`Dev/index.html`) is the actual navigator
  and is in good shape.
- **Broken Dev portal links.** `Dev/index.html` links to
  `../CustomPlatform/`, but no `CustomPlatform/` directory exists in the
  repo. It also links to `../MTL/MTL.html`; that file exists, but the
  surrounding `/MTL/` directory has no `index.html`, so the bare `/MTL/`
  URL returns the GitHub Pages 404.
- **Duplicated iterations.** `AR/`, `AR1/`, `AR2/` and `quiz/`, `quiz1/`,
  `quiz2/`, `Quiz3/` are near-clones kept side-by-side. If only the latest
  iteration is in use, the older ones could move to a branch/tag and out
  of the live site.

### Asset / catalog mismatches

- `api/Models.json` references GLB files that aren't in `assets/models/`
  (e.g. `Diamond.glb`, `Laurie-Anne Pere.glb`, `Laurie-Anne Pere1.glb`,
  `Eric.glb`, `Eric1.glb`). Either commit the assets or remove the
  catalog entries.
- `Model_Viewer/index.html` hardcodes the model dropdown rather than
  reading from `api/Models.json`. The catalog is currently unused by the
  viewer.

### Code quality (DesignBuddyDesktop/app.js)

- **Implicit global in `setupDiamondSizes`** — `newThickness` is assigned
  without `let`/`const` (`app.js:864`, `app.js:866`), so it leaks onto
  `window`. Adding `let` is a one-line fix.
- **`setupContactRepository` assumes every contact has `tags`** —
  `c.tags.forEach(...)` and `c.tags.join(' ')` will throw on a contact
  without a `tags` array. Current `contacts.js` always sets it, but a
  defensive `(c.tags ?? [])` would avoid future surprises.
- **`Model_Viewer/main.js` disposes the old renderer's `renderLists` but
  not the previous scene/object** when the dropdown changes — small leak
  on each model switch.
- **Three.js 0.132.0 is from late 2021.** APIs like `outputEncoding` and
  `RoughnessMipmapper` are deprecated/removed in newer versions; upgrading
  is non-trivial but worth tracking.

### External-service durability

- **StyleMatch uses a `webhook-test/...` URL.** In n8n, test webhooks only
  respond while the workflow editor is open and "Listen for test event"
  is active. The production URL is `/webhook/<id>` (no `-test`). Worth
  promoting the StyleMatch flow to a production webhook for reliability,
  same as the FAQ search/submit endpoints already do.
- **FAQ app pulls React 18, ReactDOM, and Babel-standalone from `unpkg`
  on every load** and compiles JSX in the browser. Fine for an internal
  tool, but it's ~3 MB of JS and a noticeable cold start. A pre-built
  bundle would help if responsiveness matters.

### Security / privacy

- No secrets in source.
- The site is fully static and client-side; all calls go to public
  endpoints. The n8n webhooks accept anonymous POSTs — if they reach
  internal Notion data, consider adding a shared-secret header check on
  the n8n side.
- `contacts.js` ships real phone numbers and emails of suppliers to anyone
  who visits `/DesignBuddyDesktop/`. If the directory was intended to be
  internal-only, GitHub Pages is the wrong host — there's no auth.
