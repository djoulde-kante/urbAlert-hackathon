# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

UrbanAlert Guinée is a web platform for reporting and navigating urban infrastructure issues in Guinea. It allows citizens and tourists to report problems (damaged roads, power outages, uncollected waste) in real-time with photos and GPS location. The platform features an interactive map, authentication system, and a dashboard for authorities to track and manage interventions.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom theme system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Authentication**: Firebase Auth with email/password and Google OAuth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Maps**: Leaflet for interactive mapping
- **Forms**: React Hook Form with Zod validation
- **Package Manager**: npm (with pnpm-lock.yaml also present)

## Development Commands

### Essential Commands
```bash
# Navigate to the web app directory
cd urbAlert-Plateform-web

# Install dependencies (use --legacy-peer-deps for compatibility)
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Testing Individual Components
When testing specific pages or components, navigate to:
- Home: http://localhost:3000
- Map: http://localhost:3000/carte
- Report: http://localhost:3000/signaler
- Login: http://localhost:3000/connexion
- Register: http://localhost:3000/inscription
- Dashboard: http://localhost:3000/tableau-de-bord

## Project Architecture

### Directory Structure
```
urbAlert-Plateform-web/
├── app/                    # Next.js App Router pages
│   ├── (auth pages)/      # Authentication pages
│   ├── carte/             # Interactive map page
│   ├── signaler/          # Report problem page
│   └── tableau-de-bord/   # Admin dashboard
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── map-component.tsx # Leaflet map integration
│   ├── header.tsx        # Main navigation
│   └── report-form.tsx   # Problem reporting form
└── lib/                  # Utilities and configurations
    ├── api/              # API layer (auth, services)
    ├── context/          # React contexts (auth)
    ├── services/         # Business logic services
    └── firebase.ts       # Firebase configuration
```

### Key Architectural Patterns

**Authentication Flow**:
- Uses Firebase Auth with email verification requirement
- AuthContext provides global auth state management
- Protected routes check authentication status
- User data stored in Firestore with role-based access (user/admin)

**Data Layer**:
- Firebase Firestore for user data and reports
- Real-time updates for map markers and dashboard
- Server timestamps for all data operations
- Type-safe API layer in `lib/api/auth.ts`

**UI Component System**:
- Radix UI primitives as base components
- Consistent theming with CSS custom properties
- Dark/light mode support via next-themes
- Responsive design with Tailwind CSS

**Map Integration**:
- Leaflet for interactive mapping
- Mock data for signalements (reports) in development
- Custom markers for different problem types (routes, electricity, waste)
- Filter system for different report categories

## Firebase Configuration

The app uses Firebase services:
- **Authentication**: Email/password, Google OAuth, email verification
- **Firestore**: User profiles, reports, admin functions
- **Storage**: Photo uploads for reports

Firebase config is in `urbAlert-Plateform-web/lib/firebase.ts` with environment-specific settings.

## Important Development Notes

### Dependency Management
- Use `npm install --legacy-peer-deps` due to Next.js 15 and React 19 compatibility
- Both npm and pnpm lock files exist - prefer npm for consistency

### Authentication Requirements
- All new users must verify email before accessing protected features
- Google OAuth users bypass email verification
- Admin role assignment requires manual Firestore update

### Map Development
- Mock data exists in `map-component.tsx` for development
- Production will need real-time Firestore integration for signalements
- Custom icons for different report types (red for roads, yellow for electricity, green for waste)

### Styling System
- Uses CSS custom properties for consistent theming
- Tailwind config extends with custom colors and animations
- Components follow shadcn/ui patterns for consistency

### Form Handling
- React Hook Form with Zod validation throughout
- Consistent error handling and user feedback
- File uploads integrated with Firebase Storage

## Common Development Workflows

### Adding New Pages
1. Create page component in appropriate `app/` subdirectory
2. Follow existing naming convention (French route names)
3. Use layout.tsx for consistent header/footer
4. Add navigation links to `header.tsx` if needed

### Adding New Components
1. Place UI primitives in `components/ui/`
2. Business logic components in `components/`
3. Follow TypeScript strict mode conventions
4. Use Radix UI patterns for accessibility

### Working with Authentication
- Use `useAuth()` hook for auth state
- Check `user` and `userData` for different auth levels
- Protected routes should redirect unauthenticated users
- Admin features check `userData?.role === 'admin'`

### Map Development
- Test with mock data in `map-component.tsx`
- Use Leaflet's imperative API within useEffect
- Handle component cleanup to prevent memory leaks
- Custom markers require inline SVG for proper styling

## Language and Localization
- Primary language: French (fr)
- UI text, routes, and content in French
- Consider this when adding new features or content
