# Ankit Noneriya — Portfolio

A premium, cinematic personal portfolio built with React, Vite, Tailwind CSS and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

This outputs a static site to `dist/`, ready to deploy.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, "Add New Project" → import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

## Editing content

- **Copy & data**: section text lives directly in each file under `src/sections/`.
- **Services**: edit the `services` array in `src/sections/Services.jsx`.
- **Portfolio**: edit the `projects` array in `src/sections/Work.jsx` — swap the placeholder
  tint blocks in `src/components/ProjectCard.jsx` for real screenshots when ready
  (replace the gradient `div` with an `<img>`).
- **Contact details**: WhatsApp number and email live in `src/sections/Contact.jsx`
  (`WHATSAPP_NUMBER`) and `src/components/Footer.jsx`.
- **Colors & type**: design tokens are in `tailwind.config.js`.

## Notes

- The project inquiry form does not send WhatsApp messages silently — it opens
  `wa.me` in a new tab with the message pre-filled, so the visitor reviews and
  sends it themselves.
- Motion respects `prefers-reduced-motion` (via Framer Motion's `MotionConfig`),
  and the custom cursor only activates on fine-pointer (desktop) devices.
