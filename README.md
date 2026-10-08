# Canary Charity Club

Vietnamese React/Vite presentation for Canary: Home, About, Events, Stories and ways to support the club. Hash routing keeps links refreshable on static hosting. The public presentation uses a reviewed bundled content snapshot so a failed remote image or database request cannot leave the site blank.

## Run and build

Use Node.js 22 and npm. Initialize the existing shared-component submodule before installation:

```sh
git submodule update --init --recursive
npm ci
npm run dev
npm run lint:public
npm run build
```

The normal build is in `dist/`, with the existing GitHub Pages base `/Canary-Charity-Club/`. `build.yml` verifies the presentation. `pages.yml` builds and deploys the polished branch to **https://canary.pswork.dev/** through GitHub Actions and GitHub Pages, using Pages metadata to choose the correct asset base.

The deployment repository is [JimmyK300/Canary-Charity-Club](https://github.com/JimmyK300/Canary-Charity-Club), a fork because the current account cannot administer Pages in the organization repository. The organization remote is preserved as `origin`; publish the presentation branch to the `deploy` remote to update this demo. Recursive checkout initializes the shared-component submodule. GitHub's `github-pages` environment permits `main` and `codex/canary-presentation`.

For a separate review host at the domain root:

```sh
npm run build -- --base=/ --outDir dist-review
npm run preview -- --base=/ --outDir dist-review --host 127.0.0.1 --port 4175
```

For an embedded preview served at `/demos/canary/`:

```sh
npm run build -- --base=/demos/canary/ --outDir dist-embedded
```

## Interactive support demonstration

Home ends with the shared support module, `id="dong-hanh"`; Donate uses the same module. It has selectable sample amounts, a contribution progress bar, anonymized fictional supporters, two expandable fictional experience examples, a reset action and a native modal QR preview. Sample changes persist only within the browser tab's session (`canary-support-demo-v1`), so navigating between Home and Donate retains the demonstration. The module limits the sample list to 20 entries.

The adjacent disclosure reads **“Dữ liệu mẫu · Không phải đóng góp thực.”** It explicitly identifies every amount, goal, supporter name and experience in the module as fictional. The two experience examples also say “Câu chuyện hư cấu.” The modal says **“Không thanh toán · Không quét để chuyển tiền.”** Its crossed-out SVG is a deliberately non-encoded graphic containing no payment/recipient/account data. “Áp dụng vào bản mẫu” only updates local demonstration state; its status repeats that no actual contribution or payment occurred. Native dialog behavior supplies background inertness, Escape closing and focus restoration, with an explicit Tab loop between its two buttons; the close button and outside-click dismissal also work.

The inquiry button remains a genuine user-approved `mailto:` action; the website does not send messages or process payments. Original event photographs and their provenance are unchanged. Demo contribution data is separate from verified photo-backed activity content.

## Content and contact boundaries

The current archive uses **11 unique original image files** (excluding the branding illustration): 4 Concert Trầm, 6 Quảng Ngãi, and 1 Gia Đình 3 — Yêu. Each main page has a distinct lead image. Stories includes a linked photo gallery; the existing detail page shows complete album selections with neutral visible-scene captions. Concert collage artwork is preserved as supplied by the club. The soft Bắc Trà My JPEG was reviewed and excluded from this selection.

The complete original filenames, Drive file IDs, original SHA-256 hashes and optimized dimensions are recorded in [`public/images/archive/provenance.json`](public/images/archive/provenance.json). New originals were read from the same authenticated personal Drive source on 8 October 2026. Only orientation, size and WebP encoding changed; no scenes were generated or altered. Gia Đình 3 — Yêu source folder: `1ZG_pSkC7A0UOkUBy-jYM9GO3ihA8GLHY` under Thiện nguyện. Photographs do not establish dates, beneficiary circumstances, donation values or outcomes.

`src/data/public-content.json` contains the suitable Vietnamese introduction and mission/vision from the project's existing Firestore content, reviewed on 8 October 2026. Activity and story entries use verified source-album titles and neutral visible-photo descriptions, instead of synthetic narratives. The presentation excludes unverified impact figures, test member/contact/donor data, contradictory detailed articles, and the original donation QR code. Article links preserve their identifier across refresh; dates and full reports have an honest pending-content state.

The original Firebase Storage photos return HTTP 402. Originals were recovered from the user's connected club Drive albums. Local WebP files in `public/images/archive/` preserve the original images with only orientation/size/encoding optimization. No stock or generated event photos are used.

| Local image             | Original source album/file                                                                                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `concert-tram-*`        | Gây quỹ / Concert Trầm-Gen 2 — `425684272_367576962890598_8414411504320186197_n (2).jpg`, file ID `1mDuq0MgoJzHPBEHHRTb4Xg8Cv8TzPP7V`                                                                                                               |
| `quang-ngai-activity-*` | Thiện nguyện / Quảng Ngãi-Trọn Niềm Vui-Gen 2 — `20240810_092048.jpg`, file ID `1r251YtJA_40it1X-IaMIEr8krw1ehlxz`                                                     |
| `quang-ngai-group-*`    | Same album — `z5719517248343_829ac20c6a3d25710cc371e1f2be9185.jpg`, file ID `1jchymvyl4he-rqNAiPVawUeKeWLyWlk1` (outdoor scene; local filename retained from recovery) |
| `canary-logo-*`         | Logo / `quality_restoration_20250122214336047.jpg`, file ID `1CydMVQ3Z-tBRoaIJkN4WYKeN7vQRmXIz` (original Gen 3 branding)                                                                                                                      |

Root source album: Canary website img/vid, folder ID `1CACSCPN5rv5SS0pBql3fV_J-lbgmhcaj`. Concert folder ID: `1IrJN1Zav-W3Be69VdAs6pztEginyVuXD`; Logo folder ID: `1PDx3nMZnyJrm6yaFXqZtnmbDGd4IB2EC`. Quảng Ngãi source folder ID: `1C-4zzLTjgnGZZnOo4FtSNgPO7oSunG8K`. Captions state source album names only; they do not assert dates, recipients, fundraising totals or results.

Donate is an inquiry flow, not a payment form. The user-approved contact opens an email application via a button, with an editable draft that can also be copied or downloaded. No message is sent by the website. Official club payment instructions remain unavailable.

The original Firestore services and shared-component submodule are preserved for future integration, but live CMS editing is not part of this public demo. After content is verified, update the snapshot and rebuild. The repository-wide `npm run lint` includes dormant legacy/submodule files with pre-existing failures; `lint:public` checks the active presentation files.
