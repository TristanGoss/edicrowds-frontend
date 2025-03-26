# edicrowds-frontend
This repository contains the frontend for the Edinburgh Crowds project.

Edinburgh Crowds will provide a web-based nowcast of pedestrian density in Edinburgh.
Edinburgh Crowds is a dual-use project; it exists both to act as an open-source porfolio and (hopefully) a minor income source for Tristan Goss.

## Tools & Technologies used

- This project was bootstrapped with [Vite](https://vitejs.dev/), using the React + TypeScript template.
- Linting on pre-commit hooks via Husky, including for 100% type coverage
- Frontend Hosted on Vercel
- Domain management via names.co.uk
- Email forwarding via ImprovMX
- Mailing list via Google Forms
- Background maps via MapTiler, MapLibre and OpenStreetMap
- Observation Area tiles served via Postgres and Tegola, both hosted on OVHCloud
- Data preparation using OpenStreetMap and Geopandas
- GDPR-compliant web analytics using Umami Cloud
- Buymeacoffee for micro-donations

## Getting Started

### Install dependencies
```bash
npm install
```

### Pre-commit Hook (Husky)
This project uses [Husky](https://typicode.github.io/husky) to run type and lint checks automatically before each commit.

#### How it works
When you commit changes (using `git commit`), Husky runs:

```bash
npm run precommit
```
This runs:
- ESLint (`npm run lint`)
- TypeScript Strict Checking (`npm run typecheck`)
- Type Coverage CHecking (`npm run typecoverage`)
- Type Pruning Checks (`npm run prune`)

#### Setup (only needed once after cloning)
```bash
npm run setuphusky
```

### Start the Development Server
```bash
npm run dev
```
This will start the app at http://localhost:5173.

### Build for Production
```bash
npm run build
```
The production-ready output will be in the `dist/` folder.

### Preview the production build
```bash
npm run preview
```

### Project Structure
```bash
├── public/             # Static assets
├── src/                # Source code
│   ├── assets/         # Images, fonts, etc.
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── index.html          # HTML template
├── tsconfig.json       # TypeScript config
└── vite.config.ts      # Vite config
```

### Learn More
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
