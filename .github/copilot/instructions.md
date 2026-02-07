# Copilot Workspace Instructions

## Context Files
This repository uses the following context files:
- **AGENTS.md** (root) - Primary AI personas and skill dispatcher
- **CLAUDE.md** (root) - Technical standards and project memory
- **.github/copilot-instructions.md** - Comprehensive Copilot guide

## Quick Reference

### Skills System
Reference skills with `@skill-name`:
- `@formik-skill` - Forms with Formik + Yup validation
- `@react-patterns` - React patterns and best practices
- `@redux-toolkit-skill` - State management and RTK Query
- `@react-useeffect` - useEffect patterns and alternatives
- `@web-design-guidelines` - UI/UX and accessibility
- `@react-vite-best-practices` - Vite optimization
- `@vercel-react-best-practices` - Performance patterns
- `@vercel-composition-patterns` - Component composition
- `@legacy-to-agents-migration` - Legacy code refactoring

All skills located in `.agents/skills/` with:
- `SKILL.md` - Documentation with YAML frontmatter
- `AGENTS.md` - AI-optimized instructions (optional)
- `rules/` - Detailed guidelines (optional)

### MCP Servers (`.vscode/mcp.json`)
1. **Figma** (local:3845) - Design tokens, specs
2. **Wix MCP** (remote) - Site management, APIs
3. **Wix Design System** (npx) - Components, icons
4. **Octocode** (npx) - GitHub code search

### Coding Standards
- TypeScript strict mode, no `any`
- Use Wix Design System tokens only
- RTK Query for data fetching (no manual useEffect)
- PascalCase components, camelCase hooks/utils

### Common Commands
```bash
bun run dev      # Start development
bun run build    # Production build
bun run wix      # Wix CLI
```

## Workflow Pattern
1. Check relevant skill: `@skill-name`
2. Review AGENTS.md for workflows
3. Apply CLAUDE.md standards
4. Use MCP servers for context
5. Make minimal, focused changes
6. Test incrementally

For complete documentation, see `.github/copilot-instructions.md`
