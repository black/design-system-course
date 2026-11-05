# Design Systems Course

A free Figma design systems course in three levels: Beginner, Intermediate and Pro.

**Live site:** https://designx-system.web.app/

Built with HTML, Tailwind CSS and plain JavaScript, hosted on Firebase.

## Edit the course

All content (modules, videos, exercises, study material) is in `js/course-data.js`.

## Run locally

```bash
npm install
npm run watch
```

Then open `index.html` through any local server.

## Deploy

```bash
firebase login
firebase use staging
npm run deploy
```

`firebase login` and `firebase use staging` are needed once. The deploy builds the site first, then uploads it.
