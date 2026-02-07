# Workspace Patterns & Conventions

This document defines the coding patterns, conventions, and architectural decisions for this project.

## Technology Stack

### Core Technologies
- **Runtime**: Node.js 18+ / Bun
- **Framework**: Astro 5.8.0
- **UI Library**: React 18.3.1
- **Language**: TypeScript 5.8.3 (strict mode)
- **Build Tool**: Vite (via Astro)

### State & Data Management
- **State Management**: Redux Toolkit 2.11.2
- **Data Fetching**: RTK Query (part of Redux Toolkit)
- **Form Management**: Formik 2.4.9
- **Validation**: Yup 1.7.1

### UI & Styling
- **Component Library**: Wix Design System 1.0.0
- **Styling**: Tailwind CSS 4.1.18
- **Design Tokens**: Wix Design System tokens

### Wix Integration
- **Wix SDK**: 1.21.2
- **Wix Astro**: 2.13.0
- **Wix CLI**: 1.1.135
- **Wix Services**: Dashboard, Editor, CRM, Stores, App Management

## File Organization

```
project-root/
├── .agents/                    # Skills and agent configurations
│   ├── README.md
│   └── skills/                 # Custom skills library
├── .github/                    # GitHub and Copilot configurations
│   ├── copilot/               # Copilot-specific configs
│   └── copilot-instructions.md
├── .vscode/                    # VS Code settings
│   └── mcp.json               # MCP server configuration
├── src/                        # Source code (assumed structure)
│   ├── components/            # React components
│   ├── features/              # Feature-based modules
│   ├── hooks/                 # Custom React hooks
│   ├── store/                 # Redux store and slices
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
├── AGENTS.md                   # AI personas and workflows
├── CLAUDE.md                   # Technical standards
├── astro.config.mjs           # Astro configuration
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## Naming Conventions

### Files & Directories
| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `UserProfile.tsx` |
| Custom Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utility Functions | camelCase | `formatDate.ts` |
| Type Definitions | PascalCase | `User.ts` |
| Constants | UPPER_SNAKE_CASE file | `API_CONSTANTS.ts` |
| Redux Slices | camelCase | `userSlice.ts` |

### Code Entities
| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `const UserProfile = () => {}` |
| Functions | camelCase | `function formatDate() {}` |
| Variables | camelCase | `const userData = {}` |
| Constants | UPPER_SNAKE_CASE | `const API_BASE_URL = ''` |
| Types/Interfaces | PascalCase | `interface User {}` |
| Enums | PascalCase | `enum Status {}` |
| Type Parameters | Single uppercase letter or PascalCase | `<T>` or `<TData>` |

## TypeScript Standards

### Strict Mode Requirements
```typescript
// ✅ DO: Use strict TypeScript
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ DON'T: Use any type
const data: any = fetchData(); // Never do this

// ✅ DO: Define proper types
const data: User = fetchData();
```

### Type Definitions
- All types in `src/types/` directory
- Use interfaces for object shapes
- Use type aliases for unions, primitives, functions
- Export types from index files

```typescript
// src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'user' | 'guest';

// src/types/index.ts
export * from './user';
export * from './product';
```

## Import Order

Always follow this import order:

```typescript
// 1. React and React hooks
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

// 3. Internal components
import { Button } from '@/components/Button';
import { UserCard } from '@/components/UserCard';

// 4. Internal hooks and utils
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatDate';

// 5. Types
import type { User, UserRole } from '@/types';

// 6. Styles
import styles from './Component.module.css';
```

## Component Patterns

### Function Components (Default)
```typescript
// ✅ DO: Use arrow function components
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button onClick={onClick} className={variant}>
      {label}
    </button>
  );
};
```

### Named Exports (Preferred)
```typescript
// ✅ DO: Use named exports
export const UserProfile = () => { /* ... */ };
export const UserSettings = () => { /* ... */ };

// ❌ DON'T: Use default exports for components
export default UserProfile;
```

## State Management

### Redux Toolkit Slices
```typescript
// ✅ DO: Use Redux Toolkit createSlice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
```

### RTK Query for Data Fetching
```typescript
// ✅ DO: Use RTK Query for API calls
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
```

### Component State
```typescript
// ✅ DO: Use useState for local component state
const [isOpen, setIsOpen] = useState(false);

// ❌ DON'T: Use useEffect for derived state
// Bad
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// Good
const fullName = `${firstName} ${lastName}`;
```

## Form Management

### Formik with Yup Validation
```typescript
// ✅ DO: Use Formik with Yup schema
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* form fields */}
    </form>
  );
};
```

## Styling Standards

### Use Wix Design System Tokens
```typescript
// ✅ DO: Use Wix Design System components and tokens
import { Button, Text } from '@wix/design-system';

const Component = () => (
  <>
    <Button>Click me</Button>
    <Text>Hello World</Text>
  </>
);

// ❌ DON'T: Hardcode colors, spacing, or design values
const badStyle = {
  color: '#FF0000',           // Never hardcode
  padding: '16px',            // Never hardcode
  fontSize: '14px',           // Never hardcode
};
```

## Error Handling

### Try-Catch Pattern
```typescript
// ✅ DO: Handle errors properly
const fetchUser = async (id: string) => {
  try {
    const response = await api.getUser(id);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch user:', error.message);
    }
    throw error;
  }
};
```

### Error Boundaries
```typescript
// ✅ DO: Use error boundaries for component errors
import { ErrorBoundary } from 'react-error-boundary';

const App = () => (
  <ErrorBoundary fallback={<ErrorFallback />}>
    <YourComponent />
  </ErrorBoundary>
);
```

## Testing Standards

(Add when testing infrastructure exists)

## Performance Patterns

### Memoization
```typescript
// ✅ DO: Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ DO: Use useCallback for functions passed to children
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// ❌ DON'T: Overuse memoization
const simple = useMemo(() => a + b, [a, b]); // Unnecessary
```

### Code Splitting
```typescript
// ✅ DO: Use lazy loading for route-based code splitting
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <Dashboard />
  </Suspense>
);
```

## Comments & Documentation

### When to Comment
```typescript
// ✅ DO: Comment complex logic or non-obvious decisions
// Calculate user score based on activity and engagement
// Uses weighted average: activity (70%) + engagement (30%)
const userScore = (activity * 0.7) + (engagement * 0.3);

// ❌ DON'T: Comment obvious code
// Set the user name
const userName = user.name; // Redundant
```

### JSDoc for Public APIs
```typescript
// ✅ DO: Use JSDoc for public functions and types
/**
 * Formats a date string to a human-readable format
 * @param date - ISO 8601 date string
 * @param locale - Locale code (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(date: string, locale = 'en-US'): string {
  return new Date(date).toLocaleDateString(locale);
}
```

## Git Commit Conventions

```
feat: Add user authentication
fix: Resolve login redirect issue
docs: Update API documentation
style: Format code with prettier
refactor: Simplify user state logic
test: Add user service tests
chore: Update dependencies
```

## Development Commands

```bash
# Development
bun run dev          # Start Wix development environment
bun run astro        # Run Astro CLI

# Build
bun run build        # Production build
bun run preview      # Preview production build

# Wix CLI
bun run wix          # Wix CLI commands
bun run env          # Manage Wix environment
bun run generate     # Generate Wix components
bun run release      # Release to Wix platform
```

## DO's and DON'Ts Summary

### ✅ DO
- Use TypeScript strict mode
- Define all types explicitly
- Use Wix Design System components and tokens
- Use RTK Query for data fetching
- Use Formik for form management
- Follow naming conventions
- Keep components small and focused
- Write focused, incremental changes
- Use proper error handling
- Leverage skills for domain-specific tasks

### ❌ DON'T
- Use `any` type in TypeScript
- Hardcode colors, spacing, or design values
- Use manual `useEffect` for data fetching
- Mix concerns in components
- Create overly generic solutions
- Skip type definitions
- Use default exports for components
- Ignore accessibility requirements
- Make broad, unfocused changes
- Duplicate code across skills

---

For more information, see:
- **AGENTS.md** - AI workflows and skill usage
- **CLAUDE.md** - Technical standards and patterns
- **.github/copilot-instructions.md** - Copilot guide
- **.github/copilot/skills-index.md** - Skills reference
