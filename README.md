# Princess's Portfolio

A playful portfolio built as a tiny operating system.

Instead of using a standard landing page, this project turns the portfolio into an interactive desktop experience with draggable windows, clickable folders, fullscreen media previews, a mobile phone mode, sound effects, background music, PDF viewing, and a flipbook comic viewer.

## Overview

This portfolio was designed to feel personal, nostalgic, and a little bit mischievous. The desktop view mimics an old-school computer workspace, while the mobile view becomes a phone-inspired launcher with swipeable app screens.

The experience includes:

- draggable desktop windows
- shortcut folders with files inside
- custom project galleries
- PDF viewing inside the portfolio
- a comic flipbook viewer
- sound effects for clicks, closing actions, and page flips
- background music controls
- a separate mobile OS-style layout

## Built With

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `pdfjs-dist`
- `react-pageflip`

## Fonts Used

- `Pixelify Sans`
- `Geist Mono`
- `Instrument Serif`

## Main Structure

- [app/page.tsx](/Users/princessmikaelaborbajo/Documents/project/my-art-portfolio/app/page.tsx): entry point for the portfolio
- [app/components/desktop/DesktopScene.tsx](/Users/princessmikaelaborbajo/Documents/project/my-art-portfolio/app/components/desktop/DesktopScene.tsx): main desktop interaction layer
- [app/components/desktop/mobile/MobileOsShell.tsx](/Users/princessmikaelaborbajo/Documents/project/my-art-portfolio/app/components/desktop/mobile/MobileOsShell.tsx): mobile phone-style experience
- [app/components/desktop/data.ts](/Users/princessmikaelaborbajo/Documents/project/my-art-portfolio/app/components/desktop/data.ts): desktop shortcuts, folder files, project content, and document metadata
- [app/components/desktop/projects/ComicFlipbookViewer.tsx](/Users/princessmikaelaborbajo/Documents/project/my-art-portfolio/app/components/desktop/projects/ComicFlipbookViewer.tsx): comic flipbook and PDF page rendering
- [app/globals.css](/Users/princessmikaelaborbajo/Documents/project/my-art-portfolio/app/globals.css): global styling, theme tokens, animations, and layout rules

## Getting Started

Run the development server:

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- The project is asset-heavy because it contains illustrations, videos, PDFs, comic pages, and project media.
- Some UI projects inside the portfolio also include companion prototype or live links.
- The mobile version is intentionally different from the desktop version and is designed like a phone OS instead of a direct shrink-down.

## Deployment

This project is ready to deploy on Vercel.

If you update large media assets, it is a good idea to keep file sizes optimized so previews, PDFs, and image-heavy sections stay smooth in production.
