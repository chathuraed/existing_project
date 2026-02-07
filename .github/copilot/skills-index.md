# Skills Index

This document provides a comprehensive index of all available skills in this repository.

## Location
All skills are located in `.agents/skills/` directory.

## Available Skills

### Forms & Validation

#### @formik-skill
**Directory:** `.agents/skills/formik-skill/`  
**Version:** 1.0  
**Description:** Build React forms with Formik library including validation, field management, form state, error handling, and async submissions.

**Use when:**
- Creating forms in React applications
- Handling form validation with Yup
- Managing field state
- Implementing complex form patterns

**Key Files:**
- `SKILL.md` - Comprehensive form building guide
- `AGENTS.md` - AI-optimized instructions
- `assets/` - Form templates and examples
- `references/` - Formik documentation
- `scripts/` - Helper utilities

---

### State Management

#### @redux-toolkit-skill
**Directory:** `.agents/skills/redux-toolkit-skill/`  
**Version:** 2.0.0  
**Description:** Redux Toolkit and RTK Query patterns for state management and API data fetching.

**Use when:**
- Setting up Redux store
- Creating slices
- Implementing API calls with RTK Query
- Building optimistic updates
- Managing cache
- Handling real-time data

**Key Files:**
- `SKILL.md` - Redux Toolkit patterns
- `AGENTS.md` - RTK Query best practices
- `examples/` - Implementation examples

---

### React Development

#### @react-patterns
**Directory:** `.agents/skills/react-patterns/`  
**Version:** 2.0.0  
**Description:** Comprehensive React 18 patterns expert covering hooks, concurrent features, Suspense, and modern TypeScript development.

**Use when:**
- React development and component architecture
- State management patterns
- Performance optimization
- Implementing React 18 features

**Key Files:**
- `SKILL.md` - React patterns guide
- `AGENTS.md` - AI-optimized patterns
- `reference.md` - React API reference
- `learn.md` - Learning resources

---

#### @react-useeffect
**Directory:** `.agents/skills/react-useeffect/`  
**Version:** 1.0  
**Description:** React useEffect best practices from official docs. Teaches when NOT to use Effect and better alternatives.

**Use when:**
- Writing or reviewing useEffect hooks
- Using useState for derived values
- Data fetching patterns
- State synchronization

**Key Topics:**
- When to use Effects
- When NOT to use Effects
- Effect cleanup and dependencies
- Performance optimization

---

### Performance & Build Optimization

#### @react-vite-best-practices
**Directory:** `.agents/skills/react-vite-best-practices/`  
**Version:** 1.0.0  
**Description:** React and Vite performance optimization guidelines.

**Use when:**
- Vite configuration
- Build optimization
- Code splitting
- Lazy loading
- HMR configuration
- Bundle size optimization

**Key Files:**
- `SKILL.md` - Vite optimization guide
- `rules/` - Specific optimization rules

---

#### @vercel-react-best-practices
**Directory:** `.agents/skills/vercel-react-best-practices/`  
**Version:** 1.0.0  
**Description:** React and Next.js performance optimization guidelines from Vercel Engineering.

**Use when:**
- Writing or reviewing React/Next.js code
- React components optimization
- Next.js pages
- Data fetching patterns
- Bundle optimization
- Performance improvements

**Key Files:**
- `SKILL.md` - Performance guide (57 rules across 8 categories)
- `AGENTS.md` - AI-optimized instructions
- `rules/` - Specific performance rules (50+ rule files)

**Categories:**
- Rendering optimization
- Async operations
- Bundle size reduction
- Client-side patterns
- JavaScript patterns
- Server-side patterns
- Styling optimization
- Testing patterns

---

### Component Design

#### @vercel-composition-patterns
**Directory:** `.agents/skills/vercel-composition-patterns/`  
**Version:** 1.0  
**Description:** React composition patterns that scale. Use when refactoring components with boolean prop proliferation or building flexible component libraries.

**Use when:**
- Refactoring components with many boolean props
- Building flexible component libraries
- Designing reusable APIs
- Compound components
- Render props
- Context providers
- Component architecture

**Key Files:**
- `SKILL.md` - Composition patterns guide
- `AGENTS.md` - Pattern implementations
- `examples/` - Reference implementations

---

### UI/UX & Design

#### @web-design-guidelines
**Directory:** `.agents/skills/web-design-guidelines/`  
**Version:** 1.0.0  
**Description:** Review UI code for Web Interface Guidelines compliance.

**Use when:**
- Reviewing UI code
- Checking accessibility
- Design audits
- UX reviews
- Checking against best practices

**Key Topics:**
- Web Interface Guidelines
- Accessibility standards (WCAG)
- Responsive design
- Design system compliance
- Color contrast
- Typography
- Spacing systems

---

### Migration & Refactoring

#### @legacy-to-agents-migration
**Directory:** `.agents/skills/legacy-to-agents-migration/`  
**Version:** 1.0  
**Description:** Refactor legacy codebases into modular .agent/skills architecture with zero behavior change.

**Use when:**
- Migrating legacy code
- Refactoring to skills architecture
- Improving modularity
- Reducing technical debt
- Separating concerns

**Goals:**
1. Preserve existing functionality
2. Improve modularity and separation of concerns
3. Move business logic into reusable skills
4. Ensure agents orchestrate skills only

---

## Skill Structure

Each skill follows this standard structure:

```
skill-name/
├── SKILL.md           # Human-readable documentation with YAML frontmatter
├── AGENTS.md          # AI-optimized instructions (optional)
├── rules/             # Specific rule files (optional)
│   ├── rule-1.md
│   └── rule-2.md
├── examples/          # Reference implementations (optional)
├── references/        # External documentation (optional)
├── scripts/           # Helper utilities (optional)
└── assets/            # Templates and resources (optional)
```

## YAML Frontmatter Format

Each `SKILL.md` starts with YAML frontmatter:

```yaml
---
name: skill-name
version: "1.0.0"
description: Brief description of when to use this skill
license: MIT
tags: [tag1, tag2, tag3]
metadata:
  author: author-name
  framework: react
  language: typescript
---
```

## How to Use Skills

### In Prompts
Reference skills using the `@` symbol followed by the skill name:

```
@formik-skill "Create a registration form with validation"
@redux-toolkit-skill "Add RTK Query endpoint for user data"
@react-patterns "Implement compound component pattern"
```

### Skill Chaining
Combine multiple skills for complex workflows:

```
@formik-skill "Create the form" 
→ @redux-toolkit-skill "Connect to Redux"
→ @vercel-react-best-practices "Optimize performance"
```

## Skill Discovery

GitHub Copilot automatically discovers skills in `.agents/skills/`. Each skill:
1. Must have a `SKILL.md` file with valid YAML frontmatter
2. Should have descriptive tags and metadata
3. Can include optional AI-optimized `AGENTS.md`
4. May contain rules, examples, and scripts

## Quick Reference

| Task | Skill | Command Example |
|------|-------|-----------------|
| Form creation | `@formik-skill` | `@formik-skill "Create login form"` |
| Data fetching | `@redux-toolkit-skill` | `@redux-toolkit-skill "Add RTK Query"` |
| Component patterns | `@react-patterns` | `@react-patterns "Use custom hooks"` |
| Side effects | `@react-useeffect` | `@react-useeffect "Fix double render"` |
| Build optimization | `@react-vite-best-practices` | `@react-vite-best-practices "Reduce bundle"` |
| Performance | `@vercel-react-best-practices` | `@vercel-react-best-practices "Optimize render"` |
| Component design | `@vercel-composition-patterns` | `@vercel-composition-patterns "Refactor props"` |
| UI review | `@web-design-guidelines` | `@web-design-guidelines "Check accessibility"` |
| Refactoring | `@legacy-to-agents-migration` | `@legacy-to-agents-migration "Migrate module"` |

---

For more information, see:
- **AGENTS.md** (root) - AI personas, MCP servers, workflows
- **CLAUDE.md** (root) - Technical standards and project memory
- **.github/copilot-instructions.md** - Comprehensive Copilot guide
