# My Journals

A small static site that presents journal photos as a Paper-inspired shelf of notebooks. Tap a journal to open it, then flip through full-spread pages.

Live on GitHub Pages after the first deploy: `https://<your-username>.github.io/my-journal/`

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (with base path `/my-journal/`).

## Adding a journal

1. Create a folder under `public/journals/<id>/`.
2. Add a cover image and spread photos (one photo per open left+right spread).
3. Register it in [`public/journals/manifest.json`](public/journals/manifest.json):

```json
{
  "id": "summer-2025",
  "title": "Summer 2025",
  "cover": "/journals/summer-2025/cover.jpg",
  "accent": "#E8C4C0",
  "spreads": [
    {
      "src": "/journals/summer-2025/spread-01.jpg",
      "caption": "optional short note",
      "date": "July 4"
    }
  ]
}
```

### Photo tips

- Photograph full open spreads (left + right in one frame)
- Even lighting, avoid heavy glare
- Landscape orientation, long edge about **2000–3000px**
- JPEG or WebP; keep filenames simple (`spread-01.jpg`, …)

Replace the placeholder SVGs anytime — no code changes needed beyond the manifest.

## Deploy to GitHub Pages

1. Create a GitHub repo named `my-journal` and push this project to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow). The included workflow builds and publishes automatically.

Manual alternative from your machine (after the repo exists and Pages is set to deploy from the `gh-pages` branch):

```bash
npm run deploy
```

## Stack

- Vite + React + TypeScript
- [StPageFlip](https://github.com/Nodlik/StPageFlip) for page turns
- Content from a JSON manifest + static images
# my-portfolio
