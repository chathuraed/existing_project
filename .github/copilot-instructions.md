# GitHub Copilot Instructions

Welcome to the **existing_project** repository! This document provides instructions and context for GitHub Copilot Chat to help you work effectively with this codebase.

## 📋 Repository Overview

This is a modern React/Astro application built with TypeScript, featuring:
- **Framework**: Astro 5.8.0 + React 18.3.1
- **State Management**: Redux Toolkit 2.11
- **Forms**: Formik 2.4 + Yup 1.7
- **UI**: Wix Design System
- **Build Tool**: Vite (via Astro)

## 🎯 Quick Start

### Essential Documentation
- **AGENTS.md** (root) - AI personas, MCP servers, and skill dispatcher
- **CLAUDE.md** (root) - Project memory, technical standards, and best practices
- **.agents/skills/** - Custom skills library with domain expertise

### MCP Servers
This project uses 4 MCP servers configured in `.vscode/mcp.json`:
1. **Figma MCP** - Design tokens and component specs (local server required)
2. **Wix MCP** - Site management and REST APIs
3. **Wix Design System MCP** - Component library, props, icons
4. **Octocode** - GitHub repository search and analysis

## 🛠 Skills System

### Available Skills

Located in `.agents/skills/`, each skill provides domain-specific expertise:

| Skill | Directory | Purpose |
|-------|-----------|---------|
| **Formik** | `formik-skill/` | Form management with validation (Formik + Yup) |
| **React Patterns** | `react-patterns/` | React 18 patterns, hooks, composition |
| **React useEffect** | `react-useeffect/` | useEffect best practices and patterns |
| **Redux Toolkit** | `redux-toolkit-skill/` | State management and RTK Query |
| **React + Vite** | `react-vite-best-practices/` | Vite configuration and optimization |
| **Vercel React** | `vercel-react-best-practices/` | Performance and deployment patterns |
| **Composition Patterns** | `vercel-composition-patterns/` | Component composition strategies |
| **Web Design** | `web-design-guidelines/` | UI/UX and accessibility guidelines |
| **Legacy Migration** | `legacy-to-agents-migration/` | Refactoring to skills architecture |

### Using Skills

Reference skills in your prompts:
```
@formik-skill "Create a registration form with validation"
@redux-toolkit-skill "Add RTK Query endpoint for users"
@react-patterns "Implement compound component pattern"
```

## 📁 Project Structure

```
/
├── .agents/
│   ├── README.md
│   └── skills/           # Custom skills directory
│       ├── formik-skill/
│       ├── react-patterns/
│       ├── redux-toolkit-skill/
│       └── ...
├── .github/
│   ├── copilot-instructions.md    # This file
│   └── copilot/                   # Copilot-specific config
├── .vscode/
│   └── mcp.json                   # MCP server configuration
├── AGENTS.md                      # AI personas and workflows
├── CLAUDE.md                      # Technical standards and patterns
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🎨 Coding Standards

### Technology Stack
- **Language**: TypeScript (strict mode)
- **Styling**: Wix Design System tokens (no hardcoded values)
- **State**: RTK Query for data fetching (no manual useEffect fetches)
- **Types**: Strict TypeScript, no `any`, interfaces in `src/types/`

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useAuth.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Import Order
1. React and hooks
2. Third-party libraries
3. Internal imports (components, hooks, utils)
4. Types
5. Styles

## 🔄 Common Workflows

### 1. Building Forms
```
@formik-skill "Create form with Yup validation"
→ @redux-toolkit-skill "Connect form to Redux"
→ Test and verify
```

### 2. Component Development
```
@react-patterns "Implement component with hooks"
→ @web-design-guidelines "Verify accessibility"
→ @vercel-react-best-practices "Optimize performance"
```

### 3. State Management
```
@redux-toolkit-skill "Create slice with RTK Query"
→ @react-useeffect "Review effect usage"
→ Test API integration
```

### 4. Performance Optimization
```
@react-vite-best-practices "Analyze bundle size"
→ @vercel-react-best-practices "Implement code splitting"
→ Measure improvements
```

## 🚀 Development Commands

```bash
# Development
bun run dev          # Start dev server (Wix dev environment)

# Build
bun run build        # Build for production

# Wix CLI
bun run wix          # Wix CLI commands
bun run generate     # Generate Wix components
bun run release      # Release to Wix
```

## 📚 Key Resources

### Internal Documentation
- **AGENTS.md** - Agent roles, MCP workflows, skill reference
- **CLAUDE.md** - Project memory, coding standards, troubleshooting
- **.agents/README.md** - Skills system overview

### Skill Documentation
Each skill directory contains:
- `SKILL.md` - Human-readable documentation with YAML frontmatter
- `AGENTS.md` - AI-optimized instructions (if available)
- `rules/` - Specific rule files (optional)
- `examples/` - Reference implementations (optional)
- `scripts/` - Helper utilities (optional)

### External Resources
- [Wix CLI Documentation](https://dev.wix.com/docs/wix-cli)
- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)

## 💡 Best Practices

### DO ✅
- Reference skills explicitly (`@skill-name`)
- Use MCP servers for design specs and code search
- Follow TypeScript strict mode
- Use Wix Design System components and tokens
- Leverage RTK Query for data fetching
- Write focused, incremental changes

### DON'T ❌
- Hardcode colors, spacing, or design values
- Use `any` type in TypeScript
- Manually manage data fetching with useEffect
- Create generic solutions without skill context
- Skip validation and testing
- Make broad, unfocused changes

## 🔍 Troubleshooting

### Skill Not Found
- Verify skill exists in `.agents/skills/`
- Check SKILL.md has valid YAML frontmatter
- Ensure skill name matches directory name

### MCP Server Issues
- Check `.vscode/mcp.json` configuration
- For Figma: Ensure local server running on port 3845
- For NPX servers: Verify network access
- Restart VS Code to reload MCP configuration

### Type Errors
- Run `bun run dev` to check TypeScript errors
- Check `tsconfig.json` for compiler options
- Verify imports from `src/types/`

## 🎯 Getting Started Checklist

When working on a new task:
- [ ] Read relevant skill documentation
- [ ] Check AGENTS.md for workflow patterns
- [ ] Review CLAUDE.md for technical standards
- [ ] Use MCP servers for context (Wix Design System, Octocode)
- [ ] Reference appropriate skills in prompts
- [ ] Test changes incrementally
- [ ] Follow existing code patterns

## 📝 Notes

- This repository follows the `.agents/skills/` convention
- All skills use YAML frontmatter in SKILL.md
- MCP servers provide external context (design, GitHub, Wix)
- Focus on minimal, surgical changes
- Leverage domain expertise from skills

---

**For detailed technical information**, see:
- **CLAUDE.md** - Technical standards, patterns, and memory
- **AGENTS.md** - AI personas, workflows, and MCP integration
- **.agents/README.md** - Skills system documentation

**Need help?** Ask Copilot to reference the appropriate skill or documentation file.
