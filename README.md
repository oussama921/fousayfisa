# Fusayfisa — mosaic atelier site

A one-page portfolio and commission site for hand-laid mosaic work (Next.js 16, Tailwind 4).

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Languages

The site is available in Portuguese (`/pt`, the default: `/` redirects there), English (`/en`) and French (`/fr`). All text, including photo captions, is in `src/i18n/`, with one file per language. `en.ts` defines the structure, so TypeScript reports any text missing from `pt.ts` or `fr.ts`.

## Editing

- **Name, contact details, WhatsApp number:** `src/lib/site.ts` (the phone, email and WhatsApp values are placeholders).
- **Photos:** images live in `public/works/` as `<category>-NN.jpg`, and their sizes are listed in `src/data/works.json`. To add a photo, put it in `public/works/`, add an entry with its width and height to `works.json`, and give it a caption under `titles` in each language file.
- **Sections:** `src/components/` (Hero, Services, Featured, Gallery, Process, Contact).

The quote form doesn't need a backend. It opens WhatsApp, or the visitor's email app, with the message already written.
