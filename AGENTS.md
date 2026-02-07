# AGENTS.md — AI Personas & Skill Dispatcher

## 🔌 MCP Servers

This project is configured with 4 MCP servers in `.vscode/mcp.json`:

| Server | Type | Purpose | Status |
|--------|------|---------|--------|
| **Figma** | HTTP (Local) | Design tokens, component specs | Requires local server on :3845 |
| **Wix MCP** | HTTP (Remote) | Site management, REST APIs | Always available |
| **Wix Design System** | NPX | Components, props, icons, examples | On-demand |
| **Octocode** | NPX | GitHub code search, repo analysis | On-demand |

### Quick MCP Usage

```bash
# Wix Design System
"Get Button component properties from Wix Design System"
"List all icons in the Wix Design System"
"Show examples for Card component"

# Octocode (GitHub)
"Search GitHub for React authentication patterns"
"Find Redux Toolkit examples in popular repos"

# Wix MCP
"Create a new Wix site"
"List all my Wix sites"
"Update site metadata"

# Figma (requires local server)
"Get design tokens from Figma"
"Extract component specs from Figma file"
```

---

## 🧑‍💻 Agent Roles

### 🎨 UI Architect
- **Specialty**: Design-to-code via Figma & Wix Design System MCP.
- **Skills**: `@web-design-guidelines`, `@vercel-composition-patterns`.
- **MCP Servers**: Figma MCP (local), Wix Design System MCP
- **Instruction**: 
  1. Pull component specs from Wix Design System MCP first
  2. Get design tokens from Figma (if available)
  3. Implement using Wix Design System components
  4. Follow `@web-design-guidelines` for accessibility and responsive design

### 🧠 Logic Specialist
- **Specialty**: State management and API integration.
- **Skills**: `@redux-toolkit-skill`, `@formik-skill`, `@react-useeffect`.
- **MCP Servers**: Octocode (for pattern research), Wix MCP (for API integration)
- **Instruction**: 
  1. Use Octocode to find proven patterns in top repos
  2. Prioritize RTK Query slices for all data-driven components
  3. Follow `@formik-skill` for form management with validation
  4. Apply `@react-useeffect` best practices for side effects

### 🚀 Performance & Build
- **Specialty**: Optimization and deployment.
- **Skills**: `@react-vite-best-practices`, `@vercel-react-best-practices`.
- **MCP Servers**: Octocode (for optimization patterns)
- **Instruction**:
  1. Follow `@react-vite-best-practices` for build optimization
  2. Apply `@vercel-react-best-practices` for deployment
  3. Use code splitting and lazy loading patterns
  4. Monitor bundle size and performance metrics

## ⌨️ Custom Commands

### Skill Commands
- `/plan`: Create an implementation strategy referencing specific `.agents/skills/`.
- `/ui-audit`: Use Wix Design System MCP to check if current code matches component specs.
- `/migrate`: Invoke `@legacy-to-agents-migration` logic for refactoring.

### MCP Commands
- `/wix-component <name>`: Get Wix Design System component properties and examples.
- `/wix-icons`: List all available icons in Wix Design System.
- `/search-github <query>`: Search GitHub repositories for code patterns using Octocode.
- `/figma-tokens`: Extract design tokens from Figma (requires local server).

---

## Available Skills Reference

Skills are located in `.agents/skills/` and contain detailed instructions, examples, and best practices.

### 📦 React Development

| Skill | Location | Use When |
|-------|----------|----------|
| **Formik** | [.agents/skills/formik-skill/SKILL.md](.agents/skills/formik-skill/SKILL.md) | Building forms with validation (Formik + Yup) |
| **Redux Toolkit** | [.agents/skills/redux-toolkit-skill/SKILL.md](.agents/skills/redux-toolkit-skill/SKILL.md) | State management, RTK Query, data fetching |
| **React Patterns** | [.agents/skills/react-patterns/SKILL.md](.agents/skills/react-patterns/SKILL.md) | Component patterns, hooks, composition |
| **React useEffect** | [.agents/skills/react-useeffect/SKILL.md](.agents/skills/react-useeffect/SKILL.md) | Side effects, lifecycle, cleanup patterns |
| **React + Vite** | [.agents/skills/react-vite-best-practices/SKILL.md](.agents/skills/react-vite-best-practices/SKILL.md) | Vite configuration, build optimization |
| **Vercel React** | [.agents/skills/vercel-react-best-practices/SKILL.md](.agents/skills/vercel-react-best-practices/SKILL.md) | Deployment, serverless, performance |
| **Composition Patterns** | [.agents/skills/vercel-composition-patterns/SKILL.md](.agents/skills/vercel-composition-patterns/SKILL.md) | Component composition, render props |

### 🎨 Web Design

| Skill | Location | Use When |
|-------|----------|----------|
| **Web Design Guidelines** | [.agents/skills/web-design-guidelines/SKILL.md](.agents/skills/web-design-guidelines/SKILL.md) | UI/UX, design systems, accessibility |

### 🔄 Migration & Legacy

| Skill | Location | Use When |
|-------|----------|----------|
| **Legacy Migration** | [.agents/skills/legacy-to-agents-migration/SKILL.md](.agents/skills/legacy-to-agents-migration/SKILL.md) | Refactoring legacy code to skills architecture |

---

## Skill Details

#### [Formik](.agents/skills/formik-skill/SKILL.md)
Form management with Formik and Yup validation.

**Use when:**
- Building forms with complex validation logic
- Managing form state and submission
- Handling async validation
- Implementing multi-step forms

**MCP Integration:** Use Octocode to find Formik patterns in popular repos

---

#### [Redux Toolkit](.agents/skills/redux-toolkit-skill/SKILL.md)
Modern Redux patterns with Redux Toolkit and RTK Query.

**Use when:**
- Managing global application state
- Implementing data fetching with caching
- Creating async thunks and slices
- Optimizing API calls with RTK Query

**MCP Integration:** 
- Octocode: Search for RTK Query patterns
- Wix MCP: Integrate with Wix REST APIs

---

#### [React Patterns](.agents/skills/react-patterns/SKILL.md)
React component patterns and best practices.

**Use when:**
- Designing component architecture
- Implementing custom hooks
- Using compound components
- Optimizing renders with memoization

**MCP Integration:** 
- Octocode: Find React patterns in top repos
- Wix Design System: Get component examples

---

#### [React useEffect](.agents/skills/react-useeffect/SKILL.md)
Best practices for using the useEffect hook.

**Use when:**
- Managing side effects
- Handling component lifecycle
- Avoiding common useEffect pitfalls
- Optimizing effect dependencies
- Implementing cleanup functions

**MCP Integration:** Octocode: Search for useEffect patterns and anti-patterns

---

#### [React + Vite Best Practices](.agents/skills/react-vite-best-practices/SKILL.md)
Best practices for React applications built with Vite.

**Use when:**
- Setting up Vite projects
- Optimizing build configuration
- Implementing code splitting
- Configuring plugins and aliases
- Optimizing dev server performance

**MCP Integration:** Octocode: Find Vite configuration patterns

---

#### [Vercel React Best Practices](.agents/skills/vercel-react-best-practices/SKILL.md)
Best practices for React applications deployed on Vercel.

**Use when:**
- Deploying to Vercel
- Optimizing for serverless functions
- Implementing ISR/SSR/SSG strategies
- Configuring edge functions
- Following Vercel-specific patterns

**MCP Integration:** Octocode: Find Vercel deployment patterns

---

#### [Vercel Composition Patterns](.agents/skills/vercel-composition-patterns/SKILL.md)
Component composition patterns for modern React.

**Use when:**
- Building composable components
- Implementing advanced composition patterns
- Using render props and compound components
- Creating flexible component APIs

**MCP Integration:** 
- Octocode: Search for composition patterns
- Wix Design System: Study Wix component composition

---

### Web Design

#### [Web Design Guidelines](.agents/skills/web-design-guidelines/SKILL.md)
Modern web design principles and best practices.

**Use when:**
- Creating UI designs
- Following design system principles
- Ensuring accessibility and responsiveness
- Implementing consistent spacing and typography
- Building accessible components

**Key Topics:**
- Color theory and typography
- Layout and spacing systems
- WCAG accessibility standards
- Responsive design patterns
- Design tokens and theming

**MCP Integration:**
- Wix Design System: Get design tokens, spacing, colors
- Figma: Extract design specs and tokens (requires local server)
- Octocode: Find design system implementations

---

---

## 🔄 MCP + Skills Workflow

### Workflow 1: Component Development (UI Architect)
```bash
# Step 1: Get component specs from Wix Design System
"Get Button component properties from Wix Design System"

# Step 2: Get design tokens (if Figma server available)
"Extract button design tokens from Figma"

# Step 3: Implement using skills
@web-design-guidelines "Create Button component with variants"

# Step 4: Verify composition
@vercel-composition-patterns "Review Button component composition"
```

### Workflow 2: State Management (Logic Specialist)
```bash
# Step 1: Research patterns
"Use Octocode to find RTK Query patterns for user authentication"

# Step 2: Implement with skill
@redux-toolkit-skill "Create user authentication slice with RTK Query"

# Step 3: Integrate with Wix API
"Use Wix MCP to connect authentication to Wix user management"

# Step 4: Optimize effects
@react-useeffect "Review useEffect usage in auth components"
```

### Workflow 3: Form Development
```bash
# Step 1: Get UI components
"List all form-related components in Wix Design System"

# Step 2: Implement form
@formik-skill "Create user registration form with Yup validation"

# Step 3: Connect to state
@redux-toolkit-skill "Connect form to Redux state"

# Step 4: Optimize
@react-patterns "Optimize form render performance"
```

### Workflow 4: Performance Optimization (Performance & Build)
```bash
# Step 1: Analyze current build
@react-vite-best-practices "Analyze bundle size and dependencies"

# Step 2: Research patterns
"Use Octocode to find code splitting strategies"

# Step 3: Implement optimizations
@vercel-react-best-practices "Implement lazy loading and code splitting"

# Step 4: Verify
"Test build output and performance metrics"
```

---

## CLI Commands

All CLI instructions can be found at:
`node_modules/@wix/cli/agents/instructions.md`

## Wix Extensions Reference

General reference: [About Extensions](https://dev.wix.com/docs/wix-cli/guides/extensions/about-extensions)

Base URL: `https://dev.wix.com/docs/wix-cli/guides/extensions`

### Dashboard Extensions
- **Dashboard Pages**: `/dashboard-extensions/dashboard-pages/` → `add-dashboard-page-extensions` | `dashboard-page-extension-files-and-code`
- **Dashboard Plugins**: `/dashboard-extensions/dashboard-plugins/` → `add-dashboard-plugin-extensions` | `dashboard-plugin-extension-files-and-code`
- **Dashboard Modals**: `/dashboard-extensions/dashboard-modals/` → `add-dashboard-modal-extensions` | `dashboard-modal-extension-files-and-code`
- **Dashboard Menu Plugins**: `/dashboard-extensions/dashboard-menu-plugins/` → `add-dashboard-menu-plugin-extensions` | `dashboard-menu-plugin-extension-files-and-code`

### Backend Extensions
- **Events**: `/backend-extensions/events/` → `add-event-extensions` | `event-extension-files-and-code`
- **Service Plugins**: `/backend-extensions/service-plugins/` → `add-service-plugin-extensions` | `service-plugin-extension-files-and-code`

### Site Extensions
- **Site Widgets**: `/site-extensions/site-widgets/` → `add-site-widget-extensions` | `site-widget-extension-files-and-code`
- **Site Plugins**: `/site-extensions/site-plugins/` → `add-site-plugin-extensions` | `site-plugin-extension-files-and-code`
- **Embedded Scripts**: `/site-extensions/embedded-scripts/` → `add-embedded-script-extensions` | `embedded-script-extension-files-and-code`

---

## How to Use Skills

When working on a task, reference the appropriate skill by viewing its SKILL.md file:

```bash
# Direct skill reference
@formik-skill "Create a login form"

# Or specify the path
"View .agents/skills/formik-skill/SKILL.md"
```

Each skill directory contains:
- **SKILL.md**: Main instructions with detailed guidelines and YAML frontmatter
- **AGENTS.md** (optional): AI-optimized instructions
- **rules/** (optional): Specific rule files
- **examples/** (optional): Reference implementations
- **resources/** (optional): Additional templates and assets
- **scripts/** (optional): Helper utilities

---

## Quick Reference

### 🎯 When to Use What

| Task | Skill | MCP Server | Command Example |
|------|-------|------------|-----------------|
| Build form | `@formik-skill` | - | `@formik-skill "Create registration form"` |
| Fetch data | `@redux-toolkit-skill` | Wix MCP | `@redux-toolkit-skill "Add RTK Query for users"` |
| UI component | `@react-patterns` | Wix Design System | `"Get Button props" + @react-patterns` |
| Side effects | `@react-useeffect` | - | `@react-useeffect "Fix double API call"` |
| Optimize build | `@react-vite-best-practices` | - | `@react-vite-best-practices "Reduce bundle"` |
| Deploy | `@vercel-react-best-practices` | - | `@vercel-react-best-practices "Setup SSR"` |
| Component API | `@vercel-composition-patterns` | Octocode | `"Search composition patterns" + implement` |
| Design system | `@web-design-guidelines` | Wix Design System + Figma | `"Get design tokens" + @web-design-guidelines` |
| Refactor legacy | `@legacy-to-agents-migration` | - | `@legacy-to-agents-migration "Migrate auth module"` |

### 🔌 MCP Server Quick Commands

```bash
# Wix Design System MCP
"Get [Component] component properties"
"List all icons in Wix Design System"
"Show examples for [Component]"
"Get design tokens for spacing/colors"

# Octocode (GitHub)
"Search GitHub for [pattern] in React"
"Find [library] usage examples"
"Show [concept] implementations"

# Wix MCP
"List my Wix sites"
"Create new Wix site"
"Update site [property]"

# Figma MCP (requires local server)
"Get design tokens from Figma"
"Extract component specs"
```

### 📋 Skill Reference Shortcuts

```bash
# Forms & Validation
@formik-skill

# State Management
@redux-toolkit-skill

# React Patterns
@react-patterns
@react-useeffect

# Performance & Build
@react-vite-best-practices
@vercel-react-best-practices

# Component Design
@vercel-composition-patterns
@web-design-guidelines

# Migration
@legacy-to-agents-migration
```

---

## 📍 File Locations

- **MCP Configuration:** `.vscode/mcp.json`
- **Skills Directory:** `.agents/skills/`
- **This File:** `AGENTS.md` (root)
- **Technical Guide:** `CLAUDE.md` (root)
- **Project Overview:** `.agents/README.md`