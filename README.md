# FloorPlanAI

An AI-powered floor plan generation platform that transforms natural language descriptions into professional architectural layouts. Perfect for contractors, architects, interior designers, homeowners, and real estate professionals.

**Demo: [https://floor-plan-ai.vercel.app/](https://floor-plan-ai.vercel.app/)**

## Features

### 🏗️ Core Functionality
- **Natural Language Input**: Describe your space requirements in plain English
- **AI-Powered Generation**: Advanced algorithms create optimized floor plans
- **Professional Output**: CAD-ready exports for contractors and architects
- **Building Code Compliance**: Automated checks against local regulations
- **Template Library**: Pre-built layouts for common space types

### 👥 Multi-User Support
- **Role-Based Access**: Separate workflows for contractors vs homeowners
- **Team Collaboration**: Share and review projects with clients
- **Client Portal**: Interactive sharing for real-time feedback
- **Project Management**: Organize multiple floor plan projects

### 📧 Business Features
- **Demo Request System**: Integrated contact form with email notifications
- **Professional Branding**: Industry-focused design and messaging
- **Export Options**: PDF, DWG (AutoCAD), SVG, PNG formats
- **Responsive Design**: Works seamlessly on desktop and mobile

### 🔧 Technical Features
- **Subscription Management**: Stripe-powered billing system
- **User Authentication**: Secure JWT-based login system
- **Activity Logging**: Track all user actions and project changes
- **Team Management**: Multi-tenant architecture with owner/member roles

## Target Audience

### For Contractors
- Generate client proposals in minutes
- Professional CAD-ready exports
- Building code compliance checks
- Collaborative client review tools

### For Homeowners
- No design experience required
- Visualize your dream space instantly
- Share plans with contractors
- Budget-friendly planning tool

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/) integration
- **Email**: [Resend](https://resend.com/) for notifications
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/) with [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication**: JWT with httpOnly cookies
- **Styling**: Custom paper texture backgrounds with responsive design

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database
- Stripe account for payments
- Resend account for email delivery

### Installation

```bash
git clone https://github.com/yourusername/FloorPlanAI
cd FloorPlanAI
pnpm install
```

### Environment Setup

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

This will prompt you to configure:
- PostgreSQL database (local Docker or remote)
- Stripe API keys
- Authentication secrets

### Database Setup

Run the database migrations and seed with demo data:

```bash
pnpm db:migrate
pnpm db:seed
```

This creates a test user:
- Email: `test@test.com`
- Password: `admin123`

### Email Configuration

Add your email service credentials to `.env`:

```bash
RESEND_API_KEY=your_resend_api_key_here
DEMO_NOTIFICATION_EMAIL=your-email@domain.com
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see FloorPlanAI in action.

### Stripe Webhook Testing

For local development with Stripe webhooks:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## API Endpoints

### Demo Requests
- `POST /api/demo-request` - Submit demo request form
  - Validates user input with Zod schemas
  - Sends email notifications via Resend
  - Supports all user roles (contractor, architect, homeowner, etc.)

### User Management
- `GET /api/user` - Get current user profile
- `POST /api/user` - Update user information

### Team Management
- `GET /api/team` - Get team information
- `POST /api/team` - Team operations

### Stripe Integration
- `POST /api/stripe/checkout` - Create checkout sessions
- `POST /api/stripe/webhook` - Handle subscription events

## Database Schema

### Core Tables
- **users**: User accounts with authentication
- **teams**: Multi-tenant team organization
- **teamMembers**: User-team relationships with roles
- **activityLogs**: Audit trail for all user actions

### Subscription Management
- **teams.stripeCustomerId**: Links teams to Stripe customers
- **teams.subscriptionStatus**: Track subscription states
- **teams.planName**: Current subscription plan

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

## Deployment

### Environment Variables

Required environment variables for production:

```bash
# Database
POSTGRES_URL=your_postgres_connection_string

# Authentication
AUTH_SECRET=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Email
RESEND_API_KEY=your_resend_api_key
DEMO_NOTIFICATION_EMAIL=notifications@yourdomain.com

# App
BASE_URL=https://yourdomain.com
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect to [Vercel](https://vercel.com/) 
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Stripe Production Setup

1. Create production webhook in Stripe Dashboard
2. Set endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Listen for: `checkout.session.completed`, `customer.subscription.updated`
4. Update `STRIPE_WEBHOOK_SECRET` with production value

### Domain Configuration

1. Configure your custom domain in Vercel
2. Update `BASE_URL` environment variable
3. Update Stripe webhook endpoints
4. Configure email domain in Resend (optional)

## Architecture

### Frontend Architecture
- **App Router**: Next.js 15 with nested layouts
- **Server Components**: Default server-side rendering
- **Client Components**: Interactive forms and animations
- **Route Groups**: `(dashboard)` for protected routes

### Authentication Flow
- JWT tokens stored in httpOnly cookies
- Automatic token refresh via middleware
- Protected routes with global middleware
- Session verification on API routes

### Multi-tenant Design
- Teams as primary tenant boundary
- Role-based access control (Owner/Member)
- Shared resources with team isolation
- Activity logging per team

## Project Structure

```
├── app/
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── layout.tsx         # Dashboard layout with navigation
│   │   ├── page.tsx           # Main landing page
│   │   └── dashboard/         # Settings and management
│   ├── (login)/               # Authentication routes
│   ├── api/                   # API endpoints
│   └── layout.tsx             # Root layout
├── components/ui/             # shadcn/ui components
├── lib/
│   ├── auth/                  # Authentication utilities
│   ├── db/                    # Database schema and queries
│   └── payments/              # Stripe integration
└── public/                    # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- 📧 Email: support@floorplanai.com
- 💬 Demo Request: Use the form on our website
- 🐛 Bug Reports: GitHub Issues

---

**FloorPlanAI** - Transforming ideas into architectural reality with the power of AI.