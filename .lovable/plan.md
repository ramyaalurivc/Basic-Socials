## Changes

### 1. AI Visibility section — questions-only, typing + rotating
Rewrite `src/components/site/AiSearch.tsx`:
- Remove the "AI Answer" panel entirely (Basic Socials · Hyderabad, IN + tagline).
- Keep just the centered glass search bar (sparkle icon + input + send button, both fixed).
- Loop through queries showing realistic AI-search behavior:
  - Type query character-by-character (existing engine).
  - Brief "thinking" state (send icon becomes spinner).
  - Hold the completed query, then smoothly fade/slide the current query up and out while the next query fades in from below inside the same fixed bar (only the text scrolls; icons and bar stay put).
- Keep the surrounding heading, subtext, and provider pills (ChatGPT · Gemini · Perplexity · Claude · Grok) unchanged.
- Tighten timings for a smoother, cleaner rhythm.

### 2. Hero CTA buttons — stop drifting with cursor
In `src/components/site/Hero.tsx`, remove the `magnetic`, `data-magnetic`, and `data-magnetic-strength` attributes from both "Start a project →" and "Enter Basic" buttons so they stay static. Keep the `data-sfx="enter"` on Enter Basic. (No changes to `use-magnetic` hook — other magnetic elements, if any, remain unaffected.)

### 3. Blog preview section on home page
Create `src/components/site/BlogPreview.tsx`:
- Section with same padding rhythm (`py-24 md:py-32`), pill label ("The Blog"), heading ("Fresh from the studio." or similar on-brand), and short subline.
- Grid of the 3 latest posts from `src/content/posts` (reuse card style from `blog.index.tsx`: glass rounded card, date · read time, title, excerpt, tags, "Read article →").
- "View all articles →" link to `/blog` at the bottom.
- Import and render in `src/routes/index.tsx` **before** `<Faq />`, after `<Portfolio />`.

No backend, routing, or content changes. All work is in frontend components.
