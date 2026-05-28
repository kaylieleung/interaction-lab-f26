# liminal

A dreamcore interactive piece. Five intimate questions feed a procedural generator that builds a small literary space — a paragraph of description, a fragmented poem scattered across the room, ambient music tuned to the mood.

Nothing the user types appears in the output. The answers select tags (era, emotional register, palette color) which shape which pre-written sentences and poems get assembled.

No API. No server. No keys. No cost. Pure static site.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the writing

All of the literary content lives in `app/lib/content.js`:

- `SENTENCES` — opener / sceneSetter / sensory / uncanny / closer arrays. Each entry has `text`, `era`, and `emotion` tags. The generator picks one from each category to assemble the description.
- `POEMS` — array of poems. Each is an array of `stanzas` plus `era` and `emotion` tags. The matching pool gets filtered, then one poem is chosen and its stanzas become the in-space fragments.

Tag values:
- era: `pre80s` | `80s` | `90s` | `early2000s` | `2010s` | `recent` | `timeless` | `any`
- emotion: `grief` | `longing` | `tenderness` | `fear` | `peace` | `any`

Use `any` for sentences/poems that work in any context.

## Edit the generation logic

`app/lib/generate.js` is the engine. The interesting bits:

- `detectEra(yearStr)` — pulls a 4-digit year out of the answer, buckets it into an era.
- `detectEmotion(str)` — keyword-matches the unspoken answer against the EMOTION_KEYWORDS dictionary in content.js.
- `detectColor(colorStr)` — tries to find a color name in the answer, returns hex.
- `generate(answers)` — orchestrates everything and returns the blueprint.

To add a new emotion category: add it to `EMOTION_KEYWORDS` in `content.js`, then tag some sentences and poems with it.

## Deploy for free

Push to a GitHub repo, then any of these work in ~2 minutes:

- **Vercel** — go to [vercel.com/new](https://vercel.com/new), import the repo, deploy. Free for hobby projects.
- **Netlify** — [app.netlify.com/start](https://app.netlify.com/start), connect repo, deploy.
- **Cloudflare Pages** — [pages.cloudflare.com](https://pages.cloudflare.com), connect repo.
- **GitHub Pages** — needs a static export. Add `output: 'export'` to `next.config.js` and run `npm run build`.

You'll get a free `*.vercel.app` (or equivalent) URL. No env variables. No payment info. Just a URL.
