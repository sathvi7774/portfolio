# Adigoppula Sathvik — Portfolio

A production-ready, framework-free portfolio site: neo-brutalist visual system,
light/dark mode, scroll animations, an accessible keyboard-navigable project
carousel, and a validated contact form. Pure HTML/CSS/JS — no build step, no
dependencies to install, deploy anywhere that serves static files.

## Structure

```
index.html          Page markup, SEO meta tags, structured data
css/style.css        Full design system (tokens, layout, components, both themes)
js/script.js          All interactivity (theme, nav, carousel, modal, form, animation)
assets/              Images, favicon, resume PDF
manifest.json         PWA manifest
robots.txt / sitemap.xml   SEO
```

## Before you publish — swap these placeholders

1. **Photo** — replace `assets/profile.jpg` with a real photo (same filename, or
   update the `src` in the hero section of `index.html`).
2. **Resume** — replace `assets/Adigoppula_Sathvik_Resume.pdf` with your real
   resume (a simple starter version is included so the download button works
   out of the box).
3. **Project screenshots** — add real images to `assets/projects/` named
   `chatbot.jpg`, `mentor-connect.jpg`, `portfolio.jpg` (the site falls back to
   placeholder graphics until you do).
4. **GitHub / LinkedIn links** — every `https://github.com/` and
   `https://linkedin.com/` placeholder should be replaced with your real
   profile URLs (header, mobile menu, hero, footer, contact section, and each
   project card).
5. **Domain** — replace `https://sathvik-portfolio.example.com/` in
   `index.html`, `robots.txt`, and `sitemap.xml` with your real deployed URL.
6. **Contact form** — the form currently simulates sending (client-side only,
   no backend). To make it actually deliver messages, connect it to a service
   like Formspree, EmailJS, or Getform, and swap the `setTimeout` block in
   `js/script.js`'s submit handler for a real `fetch()` call.

## Run locally

No build tools needed. Either:

- Open `index.html` directly in a browser, or
- Serve it locally so relative paths and `fetch`-based features behave exactly
  like production: `python3 -m http.server 8000` from this folder, then visit
  `http://localhost:8000`.

## Deploy

Any static host works — no build command needed:

- **Vercel / Netlify**: drag-and-drop this folder, or connect the repo (leave
  build command empty, output directory `/`).
- **GitHub Pages**: push this folder to a repo and enable Pages on the `main`
  branch.

## Notes on what's included

- **Theme**: toggled by the header button, persisted in `localStorage`,
  respects `prefers-color-scheme` on first visit.
- **Accessibility**: skip link, visible focus rings, ARIA labels/roles on the
  nav, mobile menu, carousel and modal, `prefers-reduced-motion` support
  throughout (disables cursor glow, typing animation, and counts up instantly).
- **Icons**: official technology logos via the Devicon CDN
  (`cdn.jsdelivr.net/gh/devicons/devicon`); everything else is hand-drawn
  inline SVG, so the page has no icon-font dependency beyond that one CDN call.
- **Fonts**: Space Grotesk (display), DM Sans (body), IBM Plex Mono (labels/
  data), loaded from Google Fonts.
- **Performance**: images use `loading="lazy"` outside the hero, no
  render-blocking scripts, everything is plain CSS/JS with no framework
  runtime to ship.
