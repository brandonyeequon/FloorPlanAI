# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Production build and start
pnpm build
pnpm start

# Database operations
pnpm db:setup      # Initial setup with .env creation
pnpm db:migrate    # Run database migrations
pnpm db:seed       # Seed with test user (test@test.com / admin123)
pnpm db:generate   # Generate new migrations
pnpm db:studio     # Open Drizzle Studio

# Stripe webhook testing (run in separate terminal)
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Architecture Overview

This is a **Next.js 15 SaaS starter** using App Router with multi-tenant architecture. Key patterns:

- **Server Components First**: Data fetching primarily on server
- **JWT Session Management**: httpOnly cookies with automatic refresh via middleware
- **Multi-tenant RBAC**: Users belong to teams with Owner/Member roles
- **Stripe Integration**: Full subscription lifecycle with webhooks
- **Route Groups**: `(dashboard)` for protected routes, `(login)` for auth

## Database Schema (PostgreSQL + Drizzle)

Core entities and relationships:
- **users**: Authentication + soft deletes (`deletedAt`)
- **teams**: Stripe integration (`stripeCustomerId`, `subscriptionStatus`)
- **teamMembers**: Many-to-many users↔teams with roles
- **activityLogs**: Audit trail for user actions
- **invitations**: Team invitation system

All tables use auto-incrementing serial IDs. Teams table contains Stripe subscription data.

## Authentication Flow

1. **Global Middleware** (`/middleware.ts`): Protects `/dashboard/*` routes
2. **Session Refresh**: Automatic JWT renewal on GET requests
3. **Auth Actions** (`/app/(login)/actions.ts`): Sign-in/up server actions
4. **Session Utils** (`/lib/auth/session.ts`): JWT signing/verification with Jose

## Key Directories

- `/app/(dashboard)`: Protected dashboard routes with nested layouts
- `/app/(login)`: Authentication pages (sign-in, sign-up)
- `/app/api`: REST endpoints for users, teams, Stripe webhooks
- `/lib/db`: Database schema, queries, migrations, setup scripts
- `/lib/auth`: Authentication utilities and session management
- `/lib/payments`: Stripe integration for subscriptions
- `/components/ui`: shadcn/ui components built on Radix UI

## Development Workflow

1. **Environment Setup**: Run `pnpm db:setup` to create `.env` file
2. **Database**: Run `pnpm db:migrate && pnpm db:seed`
3. **Development**: Start with `pnpm dev`
4. **Stripe Testing**: Use webhook listener + test card `4242 4242 4242 4242`

## Tech Stack Specifics

- **Next.js 15** with experimental features (Turbopack, PPR)
- **Drizzle ORM** with PostgreSQL and full TypeScript inference
- **Tailwind CSS 4** with CSS variables for theming
- **SWR** for client-side data fetching
- **Zod** for schema validation
- **Jose** for JWT handling (not jsonwebtoken)

## Important Notes

- No linting/testing setup currently configured
- Uses server actions extensively for form handling
- Middleware handles both auth protection and session refresh
- Activity logging system tracks all user actions
- Stripe webhooks handle subscription status updates at `/api/stripe/webhook`