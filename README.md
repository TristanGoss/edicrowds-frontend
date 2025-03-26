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
- Data preparation and processing using OpenStreetMap and Geopandas
- Nowcast engine implemented using FastAPI 
- Webscrapers implemented using FastAPI and BeautifulSoup 
- GDPR-compliant web analytics using Umami Cloud
- Buymeacoffee for micro-donations

## Edinburgh Crowds Architecture
```mermaid
graph TD

  DataSource1[/Data Source 1/] --> Engine
  DataSource2[/Data Source 2/] --> Engine
  CensusOAs[/National Census Observation Areas/] --> OfflineProcessing
  OpenStreetMap[/OpenStreetMap Overpass API/] --> OfflineProcessing
  OfflineProcessing[Offline Processing] -->|Augmented OAs| PostGIS

  subgraph OVHCloud
    PostGIS --> Tegola
    Tegola -->|Vector Tiles| nginx
    Engine <--> PostGIS
    Engine[FastAPI Nowcast Engine] -->|pedestrian densities| nginx
  end

  subgraph Vercel
    nginx --> ReactSPA[React SPA]
  end

  ReactSPA --> User([User])

  classDef offline fill:#fff,stroke:#000,stroke-dasharray: 5 5;
  class OfflineProcessing offline;
```

## Repository structure
Edinburgh Crowds is implemented in three GitHub repositories:
- [edicrowds-frontend](https://github.com/TristanGoss/edicrowds-frontend) (a public GPLv3 licenced repository)
- [edicrowds-backend](https://github.com/TristanGoss/edicrowds-backend) (a public GPLv3 licenced repository)
- [edicrowds-backend-private](https://github.com/TristanGoss/edicrowds-backend-private) (a private repository, this repository)

edicrowds-backend is almost exactly the same as edicrowds-backend-private (and the two are kept synchronised). The difference is that edicrowds-backend does not contain the nowcasting engine (which we retain as a trade secret). Instead, if cloned and run, edicrowds-backend will return a dummy nowcast.

## CI/CD and Deployment
In order to keep initial cloud costs down, Edinburgh Crowds does not use any artefact registries or CI/CD, although we plan to add these eventually. Instead, we require linting and unit testing via pre-commit hooks, and (for the backend) clone the repository onto the deployment target. From there, docker-compose handles the rest (apart from ssl certificate registration, which is manual). For the frontend, we let Vercel scan the edicrowds-frontend repo and pull in deployments as needed.

## Getting Started

### Install dependencies
```bash
npm install
```

### Pre-commit Hook (Husky)
This project uses [Husky](https://typicode.github.io/husky) to run type and lint checks automatically before each commit. Husky should be automatically setup as a side-effect of running `npm install`.

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
