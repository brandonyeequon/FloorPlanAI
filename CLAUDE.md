# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the FloorPlanAI codebase.

## Project Overview

**FloorPlanAI** is an AI-powered floor plan generation platform that transforms natural language descriptions into professional architectural layouts. Built for contractors, architects, interior designers, homeowners, and real estate professionals.

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

This is a **FloorPlanAI SaaS application** using Next.js 15 App Router with multi-tenant architecture. Key patterns:

- **Server Components First**: Data fetching primarily on server
- **JWT Session Management**: httpOnly cookies with automatic refresh via middleware
- **Multi-tenant RBAC**: Users belong to teams with Owner/Member roles
- **Stripe Integration**: Full subscription lifecycle with webhooks
- **Email System**: Resend integration for demo requests and notifications
- **Route Groups**: `(dashboard)` for protected routes, `(login)` for auth
- **Custom Design**: Paper texture backgrounds and FloorPlanAI branding

## Current Implementation Status

**✅ Production Ready:**
- Landing page with FloorPlanAI branding
- Demo request system with email notifications
- User interface and component library
- Database schema and authentication infrastructure
- Payment processing setup (Stripe)

**🔧 Development Mode:**
- Database currently disabled for frontend-only deployment
- Authentication system present but not fully active
- Payment processing configured but mocked

## Database Schema (PostgreSQL + Drizzle)

Core entities and relationships:
- **users**: Authentication + soft deletes (`deletedAt`)
- **teams**: Stripe integration (`stripeCustomerId`, `subscriptionStatus`)
- **teamMembers**: Many-to-many users↔teams with roles
- **activityLogs**: Audit trail for user actions

All tables use auto-incrementing serial IDs. Teams table contains Stripe subscription data.

## Authentication Flow

1. **Global Middleware** (`/middleware.ts`): Protects `/dashboard/*` routes
2. **Session Refresh**: Automatic JWT renewal on GET requests
3. **Auth Actions** (`/app/(login)/actions.ts`): Sign-in/up server actions
4. **Session Utils** (`/lib/auth/session.ts`): JWT signing/verification with Jose

## Email System (Resend)

**Demo Request Flow:**
1. User fills out demo form on landing page
2. Form submission hits `/api/demo-request`
3. Server validates data with Zod schemas
4. Email sent via Resend to configured notification address
5. User sees success confirmation

**Configuration:**
- `RESEND_API_KEY`: API key from Resend dashboard
- `DEMO_NOTIFICATION_EMAIL`: Where demo requests are sent

## Key Directories

- `/app/(dashboard)`: Main application routes with FloorPlanAI branding
  - `page.tsx`: Landing page with demo form
  - `layout.tsx`: Header with floating navigation
  - `dashboard/`: Settings and management pages
- `/app/(login)`: Authentication pages (placeholder)
- `/app/api`: REST endpoints for demo requests, users, teams, Stripe
- `/lib/db`: Database schema, queries, migrations, setup scripts
- `/lib/auth`: Authentication utilities and session management
- `/lib/payments`: Stripe integration for subscriptions
- `/components/ui`: shadcn/ui components (9 components available)
- `/public`: Static assets including floor plan images

## FloorPlanAI Specific Features

**Target Audiences:**
- Contractors: Client proposals, CAD exports, code compliance
- Architects: Professional layouts, building code checks
- Interior Designers: Space planning, client collaboration
- Homeowners: DIY planning, contractor communication
- Real Estate Agents: Property visualization
- Developers: Project planning

**Demo Request Form Fields:**
- Contact information (name, email, phone)
- Professional role (contractor, architect, designer, etc.)
- Company/organization
- Project type (residential, commercial, renovation, etc.)
- Custom message/requirements

**Design System:**
- Custom paper texture backgrounds
- Floating header with rounded corners
- Blue accent color (#2563eb)
- Professional typography
- Responsive design for mobile/desktop

## Environment Variables

**Required for full functionality:**
```bash
# Database
POSTGRES_URL=your_postgres_connection_string

# Authentication
AUTH_SECRET=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
DEMO_NOTIFICATION_EMAIL=notifications@yourdomain.com

# App
BASE_URL=https://yourdomain.com
```

## Development Workflow

1. **Environment Setup**: Run `pnpm db:setup` to create `.env` file
2. **Email Setup**: Configure Resend API key for demo requests
3. **Database**: Run `pnpm db:migrate && pnpm db:seed` (optional)
4. **Development**: Start with `pnpm dev`
5. **Testing**: Use demo form to test email notifications

## Tech Stack Specifics

- **Next.js 15** with experimental features (Turbopack, PPR)
- **Drizzle ORM** with PostgreSQL and full TypeScript inference
- **Tailwind CSS 4** with custom design system and paper textures
- **Resend** for email delivery (replaces generic email solutions)
- **shadcn/ui** components with Radix UI primitives
- **SWR** for client-side data fetching
- **Zod** for schema validation
- **Jose** for JWT handling (not jsonwebtoken)

## UI Components Available

Located in `/components/ui/`:
- `button.tsx` - Button component
- `card.tsx` - Card layouts
- `input.tsx` - Form inputs
- `label.tsx` - Form labels
- `select.tsx` - Dropdown selects
- `textarea.tsx` - Multi-line text inputs
- `switch.tsx` - Toggle switches
- `avatar.tsx` - User avatars
- `dropdown-menu.tsx` - Dropdown menus
- `radio-group.tsx` - Radio button groups

## Important Notes

- Current deployment is frontend-focused with mocked backend
- Email system is fully functional via Resend
- Database schema exists but queries have null guards for frontend-only mode
- All FloorPlanAI branding and messaging is production-ready
- Ready for full backend activation when needed
- Paper texture backgrounds use CSS for performance
- Responsive design tested across device sizes