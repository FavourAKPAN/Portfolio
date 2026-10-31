# Favour Akpan — Portfolio

Next.js (App Router, TypeScript, Tailwind CSS v3). Fonts (Space Grotesk, Inter) are self-hosted through `next/font/local`, so builds need no network access to Google Fonts.

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Where to edit
- `src/config/site.ts` — name, email, links, location, resume path.
- `src/data/projects.ts` — drives the work cards and `/work/[slug]` pages. Optional `testCases` (ID, scenario, expected, actual, status) render a table only when real data is added.
- `src/data/skills.ts` — skills, tools and process steps.
- `public/images/`, `public/Favour_Akpan_Resume.pdf` — assets. `design-reference/Main.dc.html` is the approved design reference only.

## Still missing / to review
- No live URL yet. On Vercel, metadata uses `VERCEL_PROJECT_PRODUCTION_URL` automatically; set `NEXT_PUBLIC_SITE_URL` when you add a custom domain.
- Case-study pages contain only supplied facts (summaries, links, covered topics, and role/period from the resume for Trexpal and Padijar). No research, metrics or outcomes were added. Add `testCases` to the QA projects to show test tables.
- The Open Graph image reuses `trexpal_cover.jpg`; a purpose-made 1200×630 image would crop better.
- The linked resume PDF still contains your phone number and a "Junior Product Management" header. The site never shows the number, but the PDF is public.
- Not tested with a screen reader or on real touch devices.

## Deploy
1. `git init && git add . && git commit -m "Initial portfolio"`
2. Create an empty GitHub repo, then `git remote add origin <url> && git push -u origin main`.
3. In Vercel: Add New → Project → import the repo. Framework preset: Next.js. No environment variables. Deploy.
