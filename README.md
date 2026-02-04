# Job Scraper - Frontend

Modern Next.js frontend for the Job Scraper application.

## Architecture

```
job-scraper-ui/
├── app/
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   ├── jobs/            # Job listings
│   ├── applied-jobs/    # Applied jobs tracking
│   └── layout.tsx       # Root layout
├── components/          # Reusable components
├── services/
│   └── api.ts           # API service layer
├── hooks/
│   └── useAuth.ts       # Auth hook
├── docker-compose/      # Docker configuration
└── Dockerfile
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Fetch with Next.js rewrites

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | User login |
| `/signup` | User registration |
| `/jobs` | Browse and apply to jobs |
| `/applied-jobs` | View applied jobs |

## Environment Configuration

### Local Development (`.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Docker (`docker-compose/.env`)
```env
NEXT_PUBLIC_API_BASE_URL=http://api:8000
```

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Running with Docker

```bash
# Create shared network (once)
docker network create job-scraper-network

# Build and run
cd docker-compose
docker-compose up -d --build
```

## All 4 Run Modes

| Mode | Backend | Frontend | Frontend API URL |
|------|---------|----------|------------------|
| 1 | Local | Local | `http://localhost:8000` |
| 2 | Docker | Docker | `http://api:8000` |
| 3 | Local | Docker | `http://host.docker.internal:8000` |
| 4 | Docker | Local | `http://localhost:8000` |

## Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Auth**: JWT-based authentication
- **Job Search**: Filter jobs by title/company
- **One-click Apply**: Redirects to external job source
- **Application Tracking**: View all applied jobs
