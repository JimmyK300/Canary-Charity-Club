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

The normal build is in `dist/`, with the existing GitHub Pages base `/Canary-Charity-Club/`. The CI workflow builds and uploads an artifact only; it does not publish the site. The existing `npm run deploy` command is an explicit production publication action.

For a separate review host at the domain root:

```sh
npm run build -- --base=/ --outDir dist-review
npm run preview -- --base=/ --outDir dist-review --host 127.0.0.1 --port 4175
```

## Content and contact boundaries

`src/data/public-content.json` contains the suitable Vietnamese introduction and mission/vision from the project's existing Firestore content, reviewed on 8 October 2026. Activity and story entries use verified source-album titles and neutral visible-photo descriptions, instead of synthetic narratives. The presentation excludes unverified impact figures, test member/contact/donor data, contradictory detailed articles, and the sample donation QR code. Article links preserve their identifier across refresh; dates and full reports have an honest pending-content state.

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
