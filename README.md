# Design Systems Course

A static course site: HTML, Tailwind CSS and plain JavaScript, hosted on Firebase Hosting.

## Project layout

| Path | What it is |
|---|---|
| `index.html` | Course page |
| `materials.html` | All study material, every level |
| `js/course-data.js` | All course content: levels, modules, videos, exercises, concepts, study material |
| `js/app.js` | Course page behaviour (levels, progress, progress codes) |
| `js/materials-page.js` | Study material page behaviour |
| `js/theme.js` | Light / dark toggle |
| `css/input.css` | Tailwind source and theme colours. Edit this, not `styles.css` |
| `css/styles.css` | Built CSS (generated) |
| `thumbs/` | Video thumbnails and article previews |
| `scripts/build.js` | Copies the site into `dist/` for hosting |
| `dist/` | What gets deployed (generated, not committed) |

## Work locally

```bash
npm install
npm run watch
```

`npm run watch` rebuilds the CSS on every save. Open `index.html` through any local server.

## Deploy to Firebase

One-time setup:

```bash
firebase login
firebase use staging
```

`.firebaserc` names the Firebase project as `staging`. `firebase use staging` makes it the active project for this folder, so deploys go there.

Every deploy:

```bash
npm run deploy
```

Firebase runs `npm run build` first (CSS, then `dist/`), then uploads `dist/`.

To check the built site before deploying, run `npm run preview` and open http://127.0.0.1:5000.

Pages are served without `.html`: `/materials` works, and `/materials.html` redirects to it.
