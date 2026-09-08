# Pixcel Studio — Liquid Glass Website

A responsive React + Vite creative studio website with liquid-glass visuals, mouse-follow cursor, animated hero, portfolio cards, services, testimonials, and Decap CMS.

## Run locally

Requirements: Node.js 20+.

```bash
npm install
npm run dev
```

## Content is CMS-driven

The frontend imports the JSON content files at build time:

- `content/site.json` — homepage text/contact details
- `content/portfolio/*.json` — portfolio items
- `content/testimonials/*.json` — testimonials
- `content/services/services.json` — services
- `public/images/uploads/*` — CMS-uploaded images

After a CMS edit is committed, Netlify rebuilds the site and the new content appears.

## Deploy + Decap CMS

1. Create a GitHub repository and push this project.
2. In Netlify, create a site from that repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Enable Netlify Identity.
6. Set registration to **Invite only**.
7. Enable **Git Gateway**.
8. Invite your editors.
9. Replace `YOUR-SITE.netlify.app` in `public/admin/config.yml` with the real site URL.
10. Open `https://YOUR-SITE.netlify.app/admin/`.

### CMS image upload

Go to **CMS → Portfolio → New** and upload the portfolio image. Decap saves uploads to `public/images/uploads`, then commits the image and JSON content to your Git repository. Netlify rebuilds the site from the commit.

### Customize design

- Colors and responsive breakpoints: `src/styles.css`
- Icons/animation/layout: `src/main.jsx`
- CMS fields: `public/admin/config.yml`
- Portfolio/testimonial/service content: `content/`

The SVG portfolio images included are placeholders. Replace them with real JPG/PNG/WebP work through Decap.

## Official Decap notes

Decap CMS stores content in your Git repository and supports drag-and-drop media uploads. The `config.yml` belongs in the `/admin` folder. The included setup uses the documented Git Gateway backend with Netlify Identity and the `media_folder`/`public_folder` pattern. See the official Decap documentation for the current setup flow.
