An AI-powered GitHub pull request reviewer that automatically analyzes code changes and posts actionable review comments on your PRs. Connect your GitHub App, and every opened, updated, or reopened pull request gets a structured markdown review — no manual sync required.

## Description

Chai AI Code Reviewer is a full-stack SaaS app built with Next.js. It listens for GitHub pull request webhooks, fetches the PR diff, uses vector search to find the most relevant code chunks, and generates a review with the Vercel AI SDK and OpenRouter. Reviews are posted back to GitHub as PR comments.

Optionally, you can sync an entire repository into Pinecone for richer context — for example, how changed code relates to other files outside the diff. PR reviews work without syncing; repo sync is an enhancement for deeper, cross-file feedback.

The dashboard lets you connect GitHub, browse repositories, and manage a Free or Pro subscription. An overview page and a dedicated pull-request history view are in progress.

## Features

- **Automatic PR reviews** — Reviews run on opened, synchronize, and reopened PR events via GitHub webhooks
- **AI-generated feedback** — Structured markdown reviews covering correctness, security, performance, reliability, readability, and maintainability
- **GitHub App integration** — Install the app on your org or account to access repositories and post review comments
- **Vector-based context** — PR diffs are chunked and indexed in Pinecone so the model focuses on the most relevant changes
- **Optional repo sync** — Manually sync a repository's codebase for extra context from files outside the PR diff
- **Dashboard** — Repository browser with search/filtering, GitHub connection status, and account settings (overview stats and pull-request history views are in progress)
- **Authentication** — Sign in with GitHub using Better Auth
- **Subscription billing** — Free plan (5 reviews/month) and Pro plan (unlimited reviews) via Razorpay
- **Background jobs** — Long-running sync and review tasks handled reliably with Inngest
- **Dark mode** — Theme support across the dashboard UI

## Tech Stack & Tools

### Frontend

| Tool | Purpose |
| --- | --- |
| Next.js 16 | React framework (App Router) |
| React 19 | UI library |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | Accessible UI components |
| TanStack Query | Server state, caching, and mutations |
| Remix Icon (`@remixicon/react`) | Icons |
| Recharts | Dashboard charts |
| next-themes | Dark / light mode |

### Backend & Data

| Tool | Purpose |
| --- | --- |
| PostgreSQL | Primary database |
| Prisma 7 | ORM and migrations |
| Better Auth | GitHub OAuth and session management |
| Inngest | Background jobs (PR reviews, repo sync) |

### AI & Search

| Tool | Purpose |
| --- | --- |
| Vercel AI SDK | LLM integration (`generateText`) |
| OpenRouter | AI model provider |
| Pinecone | Vector database for code chunk retrieval |

### GitHub & Payments

| Tool | Purpose |
| --- | --- |
| Octokit | GitHub App API (PR files, repo contents, comments) |
| GitHub App + Webhooks | PR events and repository access |
| Razorpay | Subscriptions and billing webhooks |

### Dev Tools

| Tool | Purpose |
| --- | --- |
| ESLint | Linting |
| Inngest CLI | Local background job dev server |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- GitHub OAuth App + GitHub App
- Pinecone index (integrated embeddings: `llama-text-embed-v2`, field map `text=text`)
- OpenRouter API key
- Razorpay account (for subscriptions)

### Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### Install & run

```bash
npm install
npx prisma migrate dev
npm run dev
```

For background jobs locally, run the Inngest dev server in a separate terminal:

```bash
npx inngest-cli@latest dev
```

Set `INNGEST_DEV=1` in your `.env` when using the local Inngest dev server.

Open [http://localhost:3000](http://localhost:3000), sign in with GitHub, connect the GitHub App, and open a pull request on a connected repository to trigger your first AI review.

## Project Structure

```
app/                    # Next.js routes and API endpoints
features/
  ai/                   # OpenRouter client for the Vercel AI SDK
  auth/                 # Better Auth sign-in and session helpers
  billing/              # Razorpay subscriptions and usage limits
  dashboard/            # Dashboard shell, navigation, and repository browser
  github/               # GitHub App, webhooks, installations
  inngest/              # Inngest client
  pinecone/             # Pinecone vector client
  repo-sync/            # Optional full-repo indexing
  reviews/              # PR review pipeline (Inngest + AI)
  settings/             # Plan details and account settings
components/             # Shared UI components
lib/                    # Auth, DB, server actions
prisma/                 # Schema and migrations
```
