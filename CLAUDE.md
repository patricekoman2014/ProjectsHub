# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 application using the App Router pattern.

**Stack:**
- Next.js 16.1.1 with App Router (`app/` directory)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4 (uses `@import "tailwindcss"` syntax, `@theme` directive for custom properties)
- ESLint 9 flat config with Next.js Core Web Vitals and TypeScript rules

**Path alias:** `@/*` maps to project root (e.g., `@/app/page.tsx`)

**Key files:**
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/globals.css` - Tailwind CSS v4 setup with CSS custom properties for theming
- `next.config.ts` - Next.js configuration (TypeScript format)
- `eslint.config.mjs` - ESLint 9 flat config
