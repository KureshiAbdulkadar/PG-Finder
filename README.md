# PG Finder

A React-based PG (paying guest accommodation) discovery product prototype, focused on browsing and evaluating places to stay.

## Overview

This repository contains a Vite + React application, UI design notes, and product planning documents. It includes a test setup for unit, accessibility, and browser flows.

### Stack

- React 18 and React Router
- Vite 5
- Tailwind CSS and Framer Motion
- i18next for localization
- Vitest and Playwright for testing

## Getting started

Prerequisites: Node.js and npm. Use an actively supported Node.js LTS version compatible with the project dependencies.

```bash
npm ci
npm run dev
```

Open the local URL shown in the terminal.

## Quality checks

```bash
npm run build
npm run lint
npm test
npm run test:e2e
```

Some browser tests may require installing Playwright browsers first: `npx playwright install`.

## Product and design

- [Design notes](DESIGN.md)
- [Initial plan](PLAN.md)
- [Revised plan](PLAN_V2.md)

## Status

Active prototype. A previous build log in `error.txt` reports a Tailwind `ring-brand-red/20` class failure. The current stylesheet no longer contains that class; the build should be rerun before treating that log as current.

## Portfolio

Built as a product and interface exploration. More work: [tanveerkureshi.com](https://tanveerkureshi.com).
