# CLAUDE.md — Project Memory & Technical Standards

## 🛠 Project Environment
- **Runtime**: Node.js 18+ / Bun
- **Framework**: React 18.3.1 + Astro 5.8.0 (Vite)
- **State/Forms**: Redux Toolkit 2.11, Formik 2.4 + Yup 1.7
- **UI Library**: Wix Design System
- **MCP Servers**: 
  - Figma (Local:3845)
  - Wix Design System (@wix/design-system-mcp)
  - Octocode (Repo search)

## 📜 Coding Standards
- **Styling**: ALWAYS use Wix Design System tokens. Never hardcode hex/pixel values.
- **State**: Use RTK Query for data fetching. No manual `useEffect` fetches.
- **Types**: Strict TypeScript. No `any`. Define interfaces in `src/types/`.

## 🚫 Error Log (Technical Debt)
*Record AI mistakes here to prevent repetition:*
- (Example) "Claude once used npm instead of bun; always use bun for this repo."
- (Example) "Don't use default exports for components; use named exports."

### Directory Structure

This project follows the `.agents` directory convention:

```
.agents/
├── README.md          # Legacy migration skill overview
└── skills/            # Custom skills directory
    ├── formik-skill/                     # Form management with Formik + Yup
    ├── legacy-to-agents-migration/       # Migrate legacy code to skills architecture
    ├── react-patterns/                   # React component patterns and best practices
    ├── react-useeffect/                  # useEffect hook best practices
    ├── react-vite-best-practices/        # Vite-specific React optimizations
    ├── redux-toolkit-skill/              # Redux Toolkit and RTK Query patterns
    ├── vercel-composition-patterns/      # Component composition patterns
    ├── vercel-react-best-practices/      # Vercel deployment best practices
    └── web-design-guidelines/            # UI/UX and design system principles
```

**Location:** All skills are in `.agents/skills/` (note the plural form)

### Skills Organization

Each skill follows this structure:

```
skill-name/
├── SKILL.md           # Human-readable documentation
├── AGENTS.md          # AI/LLM-optimized instructions
├── rules/             # Specific rule files (optional)
│   ├── rule-1.md
│   └── rule-2.md
├── references/        # Reference documentation (optional)
├── scripts/           # Helper scripts (optional)
└── assets/            # Templates and examples (optional)
```

---

## Skills System

### Skill Discovery

Claude Code automatically discovers skills in `.agents/skills/`. Each skill directory contains:

1. **SKILL.md** - Human-friendly documentation with YAML frontmatter
2. **AGENTS.md** (optional) - AI-optimized instructions with structured examples
3. **rules/** (optional) - Specific rule files for detailed guidelines
4. **examples/** (optional) - Reference implementations
5. **scripts/** (optional) - Helper utilities

**How to reference:** Use `@skill-name` in prompts (e.g., `@formik-skill` or `@react-patterns`)

### Skill Frontmatter (SKILL.md)

```yaml
---
name: skill-name
description: Brief description of when to use this skill
version: "1.0.0"
license: MIT
metadata:
  author: author-name
  framework: react
  language: typescript
tags: [react, typescript, forms]
---
```

### Agent Instructions (AGENTS.md)

The AGENTS.md file should include:

```markdown
# Skill Name

**Version X.Y.Z**
Author Name
Month Year

> **Note:**  
> This document is optimized for AI agents and LLMs.

## Abstract
Concise summary of skill purpose and scope.

## Table of Contents
1. [Section One](#section-one) — **CRITICAL**
2. [Section Two](#section-two) — **HIGH**
3. [Section Three](#section-three) — **MEDIUM**

## Sections with Impact Levels

### Section Name
**Impact: CRITICAL/HIGH/MEDIUM/LOW**

Description and context.

#### Bad Example
```code
// What NOT to do
```

**Problems:**
- List specific issues
- Explain why it's problematic

#### Good Example
```code
// Recommended approach
```

**Benefits:**
- Clear advantages
- Performance impacts
- Maintainability gains

**Impact:** Specific measurable impact of following this pattern
```

---

## MCP Server Integration

### Configured MCP Servers

This project is configured with the following MCP servers in `.vscode/mcp.json`:

#### 1. Figma MCP (Local Server)
```jsonc
"figma": {
  "type": "http",
  "url": "http://127.0.0.1:3845/mcp"
}
```
**Use for:** Design system integration, component specs, design tokens
**Status:** Requires local Figma MCP server running on port 3845

#### 2. Wix MCP (Remote Server)
```jsonc
"com.wix/mcp": {
  "type": "http",
  "url": "https://mcp.wix.com/sse"
}
```
**Use for:** Wix site management, REST API interactions, site creation and configuration
**Status:** Remote server, always available

#### 3. Wix Design System MCP (NPX Package)
```jsonc
"wix-design-system-mcp": {
  "command": "npx",
  "args": ["-y", "@wix/design-system-mcp"]
}
```
**Use for:** Wix design system components, properties, examples, and icons
**Status:** Installed via npx on demand

#### 4. Octocode MCP (NPX Package)
```jsonc
"octocode": {
  "command": "npx",
  "args": ["octocode-mcp"]
}
```
**Use for:** GitHub repository code search, file content retrieval, PR analysis, repository structure exploration
**Status:** Installed via npx on demand

### Using MCP Servers

Claude Code automatically connects to configured MCP servers. You can:

1. **Query design specs** from Figma (requires local server running)
2. **Search GitHub repositories** via Octocode for code patterns and examples
3. **Access Wix Design System** components, props, examples, and icons
4. **Manage Wix sites** via Wix MCP for site creation, API calls, and configuration

Example prompts:
- "Get the Button component properties from Wix Design System"
- "Search GitHub for React authentication patterns using Octocode"
- "List all available icons in the Wix Design System"
- "Create a new Wix site using the Wix MCP server"
- "Get the button component spec from Figma" (requires Figma server running)

---

## Workflow Patterns

### 1. Progressive Context Building

**Pattern:** Start specific, then expand context as needed.

```bash
# ❌ Too broad initially
"Refactor the entire authentication system"

# ✅ Progressive approach
"Show me the current authentication flow in auth.ts"
# Then based on response:
"Now update the login function to use the new JWT strategy"
```

### 2. Skill-First Development

**Pattern:** Leverage skills for domain-specific tasks.

```bash
# When working with forms
@formik "Create a user registration form with validation"

# When optimizing React
@vercel-react-best-practices "Review this component for performance issues"

# When building components
@react-patterns "Implement a data table with sorting and filtering"
```

### 3. Iterative Refinement

**Pattern:** Build → Test → Refine cycle.

```bash
# Initial implementation
"Create a user profile component"

# After review
"Add loading states and error handling"

# After testing
"Optimize for mobile viewport"
```

### 4. Cross-Skill Workflows

**Pattern:** Combine multiple skills for complex tasks.

```bash
# Form + Validation + State
@formik "Create a multi-step form"
@redux-toolkit "Connect the form to Redux state"
@react-vite-best-practices "Optimize the build output"
```

### 5. Verification Loops

**Pattern:** Request verification of changes.

```bash
"Create the component"
# Then:
"Verify this follows our coding standards"
"Check if there are any TypeScript errors"
"Test edge cases for empty data"
```

---

## Best Practices

### DO ✅

#### 1. Be Specific with Intent
```bash
# ✅ Clear intent
"Create a reusable Button component with variants: primary, secondary, danger. Use TypeScript and include hover states."

# ❌ Vague
"Make a button"
```

#### 2. Reference Skills by Name
```bash
# ✅ Explicit skill reference
@react-patterns "Implement this using compound component pattern"

# ❌ Unclear expectations
"Make this component better"
```

#### 3. Provide Context
```bash
# ✅ Context-rich
"We're using Formik 2.x and Yup. Create a registration form with email, password, and password confirmation. Include inline validation."

# ❌ Missing context
"Create a registration form"
```

#### 4. Use Impact-Driven Language
```bash
# ✅ Priority clear
"CRITICAL: Fix the authentication bug preventing login"
"HIGH: Optimize the dashboard query performance"
"MEDIUM: Add dark mode toggle"

# ❌ All tasks seem equal
"Fix bugs and add features"
```

#### 5. Leverage File Context
```bash
# ✅ File-specific
"In src/components/UserProfile.tsx, refactor the data fetching logic to use React Query"

# ❌ Ambiguous
"Refactor the data fetching"
```

#### 6. Ask for Explanations
```bash
# ✅ Learning opportunity
"Implement this pattern and explain why it's better than the alternative"

# ❌ Blind implementation
"Just do it"
```

### DON'T ❌

#### 1. Don't Give Oversized Tasks
```bash
# ❌ Too big
"Build the entire e-commerce platform"

# ✅ Chunked
"Create the product listing component with pagination"
```

#### 2. Don't Skip Validation
```bash
# ❌ No verification
"Update the API endpoint"

# ✅ With verification
"Update the API endpoint and verify it handles error cases"
```

#### 3. Don't Ignore Skills
```bash
# ❌ Generic
"Help me with forms"

# ✅ Skill-aware
@formik "Help me implement async validation for this form"
```

#### 4. Don't Assume Context
```bash
# ❌ Implicit
"Fix the bug"

# ✅ Explicit
"There's a race condition in the useEffect hook in Dashboard.tsx that causes double API calls. Fix it."
```

#### 5. Don't Mix Concerns
```bash
# ❌ Multiple unrelated changes
"Add dark mode, fix the login bug, and optimize images"

# ✅ Focused
"Fix the login bug where users can't submit with Enter key"
```

---

## Common Patterns

### Pattern 1: Component Development

```bash
# 1. Implement with best practices
@react-patterns "Create a Card component using TypeScript"

# 2. Verify against standards
@vercel-composition-patterns "Review this component for composition best practices"

# 4. Optimize
@vercel-react-best-practices "Check for performance optimizations"
```

### Pattern 2: Form Implementation

```bash
# 1. Define schema
@formik "Create a Yup schema for user profile with name, email, bio, avatar"

# 2. Build form
@formik "Implement the form using this schema with useFormik hook"

# 3. Add UX enhancements
@formik "Add loading states, error messages, and success feedback"

# 4. Integration
@redux-toolkit "Connect the form submission to Redux"
```

### Pattern 3: State Management

```bash
# 1. Define slice
@redux-toolkit "Create a user slice with login, logout, and updateProfile actions"

# 2. Add API integration
@redux-toolkit "Add RTK Query endpoints for user data fetching"

# 3. Optimize
@redux-toolkit "Add selective cache invalidation for user updates"

# 4. Connect to UI
@react-patterns "Show me how to use these hooks in the UserProfile component"
```

### Pattern 4: Build Optimization

```bash
# 1. Analyze bundle
@react-vite-best-practices "Analyze the current bundle size"

# 2. Apply code splitting
@react-vite-best-practices "Implement route-based code splitting"

# 3. Optimize assets
@react-vite-best-practices "Set up image optimization and compression"

# 4. Verify improvements
"Show me the before/after bundle analysis"
```

### Pattern 5: Codebase Migration

```bash
# 1. Assess current state
@legacy-to-agents-migration "Analyze the current project structure"

# 2. Create migration plan
@legacy-to-agents-migration "Generate a migration plan to skills architecture"

# 3. Execute step-by-step
@legacy-to-agents-migration "Migrate the authentication module first"

# 4. Verify and iterate
"Test the migrated module and identify any issues"
```

---

## Troubleshooting

### Issue: Skill Not Found

**Problem:** Claude Code doesn't recognize `@skill-name`

**Solutions:**
1. Verify skill directory: `.agent/skills/skill-name/`
2. Check SKILL.md exists with valid frontmatter
3. Restart Claude Code after adding new skills
4. Ensure skill name matches directory name

### Issue: Context Loss in Long Sessions

**Problem:** Claude Code forgets earlier context

**Solutions:**
1. Periodically summarize progress: "Summarize what we've done so far"
2. Re-reference files: "Looking at UserProfile.tsx again..."
3. Use explicit file paths: `src/components/UserProfile.tsx`
4. Start new focused sessions for different tasks

### Issue: Generic Responses

**Problem:** Responses don't leverage skills

**Solutions:**
1. Explicitly call skills: `@skill-name`
2. Provide more context about the domain
3. Reference specific patterns: "using compound component pattern"
4. Ask skill-specific questions

### Issue: MCP Server Not Available

**Problem:** MCP server features not working

**Solutions:**
1. Verify `.vscode/mcp.json` includes the server configuration
2. For Figma MCP: Ensure local server is running on port 3845
3. For NPX-based servers: Check network access and NPM registry availability
4. For Wix MCP: Verify authentication and network access to https://mcp.wix.com/sse
5. Restart VS Code to reload MCP configuration
6. Check VS Code Output panel for MCP connection errors

### Issue: Inconsistent Code Style

**Problem:** Generated code doesn't match project conventions

**Solutions:**
1. Create a `.agent/CONVENTIONS.md` file with project standards
2. Reference it in prompts: "Following our conventions in CONVENTIONS.md"
3. Include in skill descriptions
4. Provide examples of expected style

---

## Advanced Tips

### 1. Create Custom Skills

For project-specific patterns:

```bash
# Create skill directory
mkdir -p .agent/skills/my-custom-skill

# Add SKILL.md
# Add AGENTS.md
# Add rules/ if needed
```

### 2. Chain Multiple Skills

```bash
# Complex workflows
@react-patterns "Implement Button component" | @vercel-react-best-practices "Optimize"
```

### 3. Use MCP for Context

```bash
# Pull external context
@octocode "Search for similar authentication implementations in our repos"
```

### 4. Document Decisions

```bash
# Ask Claude to document
"Document the rationale for using this pattern in comments"
"Add ADR for this architectural decision"
```

### 5. Progressive Enhancement

```bash
# Start simple, then enhance
"Create basic version"
"Add TypeScript types"
"Add error handling"
"Add loading states"
"Add accessibility features"
```

---

## Project-Specific Guidelines

### Technology Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Form Management:** Formik + Yup
- **Styling:** CSS Modules / Tailwind (check project)

### Code Organization

```
src/
├── components/       # Reusable UI components
├── features/         # Feature-based modules
├── hooks/            # Custom React hooks
├── store/            # Redux store and slices
├── utils/            # Utility functions
└── types/            # TypeScript type definitions
```

### Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Hooks:** camelCase with 'use' prefix (`useAuth.ts`)
- **Utils:** camelCase (`formatDate.ts`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)

### Import Order

1. React and hooks
2. Third-party libraries
3. Internal imports (components, hooks, utils)
4. Types
5. Styles

---

## Skill Reference Quick Guide

### Available Skills

| Skill | Use When | Key Patterns |
|-------|----------|--------------|
| `@formik-skill` | Building forms | Validation, field management, submission |
| `@react-patterns` | React components | Hooks, composition, Server Components |
| `@redux-toolkit-skill` | State management | Slices, RTK Query, cache invalidation |
| `@vercel-react-best-practices` | Performance | Optimization, memoization, lazy loading |
| `@vercel-composition-patterns` | Component design | Compound components, render props |
| `@react-vite-best-practices` | Build optimization | Code splitting, asset optimization |
| `@react-useeffect` | Side effects | Effect patterns, cleanup, dependencies |
| `@web-design-guidelines` | UI/UX | Design system, accessibility, responsive |
| `@legacy-to-agents-migration` | Codebase migration | Refactoring, skill extraction |

---

## Version History

**v1.0.0** - February 2026
- Initial CLAUDE.md creation
- MCP server configuration documented
- 9 skills integrated
- Best practices from Claude Code creator
- Workflow patterns established

---

## Additional Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Skills Directory](./skills/)
- [MCP Server Documentation](https://github.com/anthropics/mcp)
- [Project README](./README.md)

---

*For questions or improvements to this guide, update this file following the same pattern structure.*
