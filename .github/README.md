# GitHub Configuration

This directory contains GitHub-specific configuration files, including GitHub Copilot Chat instructions.

## Structure

```
.github/
├── README.md                      # This file
├── copilot-instructions.md        # Main Copilot instructions (comprehensive)
└── copilot/                       # Copilot-specific configuration
    ├── instructions.md            # Quick reference for Copilot
    ├── skills-index.md            # Complete skills catalog
    └── workspace-patterns.md      # Coding patterns and conventions
```

## Files Overview

### copilot-instructions.md
**Primary Copilot guide** - Comprehensive documentation for GitHub Copilot Chat including:
- Repository overview and quick start
- Skills system guide
- MCP servers configuration
- Common workflows
- Coding standards
- Development commands
- Troubleshooting

### copilot/instructions.md
**Quick reference** - Condensed guide for Copilot with:
- Context files reference
- Skills quick reference
- MCP servers list
- Common commands
- Workflow pattern

### copilot/skills-index.md
**Skills catalog** - Complete index of all available skills:
- 9 skills with detailed descriptions
- Usage examples
- File structure
- YAML frontmatter format
- Quick reference table

### copilot/workspace-patterns.md
**Coding conventions** - Project-specific patterns and standards:
- Technology stack
- File organization
- Naming conventions
- TypeScript standards
- Component patterns
- State management
- Form management
- Styling standards
- Performance patterns
- DO's and DON'Ts

## How GitHub Copilot Uses These Files

1. **Primary Entry Point**: `copilot-instructions.md`
   - Copilot reads this first for comprehensive context

2. **Quick Reference**: `copilot/instructions.md`
   - Used for quick lookups and common patterns

3. **Detailed Guides**: Other files in `copilot/`
   - Referenced for specific domains (skills, patterns)

## For Developers

### Where to Find Information

| Need | File |
|------|------|
| General Copilot guide | `copilot-instructions.md` |
| Quick reference | `copilot/instructions.md` |
| Skills documentation | `copilot/skills-index.md` |
| Coding conventions | `copilot/workspace-patterns.md` |
| AI workflows | `../AGENTS.md` (root) |
| Technical standards | `../CLAUDE.md` (root) |

### Skills System

All skills are located in `.agents/skills/`:
- Each skill has `SKILL.md` with YAML frontmatter
- Optional `AGENTS.md` for AI-optimized instructions
- Optional subdirectories: `rules/`, `examples/`, `scripts/`

Reference skills in Copilot with `@skill-name`:
```
@formik-skill "Create a registration form"
@redux-toolkit-skill "Add RTK Query endpoint"
```

### MCP Servers

Configured in `.vscode/mcp.json`:
1. **Figma MCP** (local) - Design tokens and specs
2. **Wix MCP** (remote) - Site management and APIs
3. **Wix Design System MCP** (npx) - Components and icons
4. **Octocode** (npx) - GitHub code search

## Maintenance

### Adding New Documentation
1. Add file to `.github/copilot/` directory
2. Update this README with description
3. Reference in `copilot-instructions.md`

### Updating Skills
1. Edit skill in `.agents/skills/skill-name/`
2. Update `copilot/skills-index.md` if needed
3. Test skill reference with `@skill-name`

### Modifying Patterns
1. Update `copilot/workspace-patterns.md`
2. Ensure consistency with `CLAUDE.md`
3. Document in git commit

## Related Documentation

- **Root Documentation**
  - `AGENTS.md` - AI personas, MCP servers, workflows
  - `CLAUDE.md` - Technical standards and project memory
  - `README.md` - Project overview

- **Skills Directory**
  - `.agents/README.md` - Skills system overview
  - `.agents/skills/*/SKILL.md` - Individual skill documentation

- **Configuration**
  - `.vscode/mcp.json` - MCP server configuration
  - `package.json` - Dependencies and scripts
  - `tsconfig.json` - TypeScript configuration

## Questions?

For questions about:
- **GitHub Copilot usage**: See `copilot-instructions.md`
- **Skills**: See `copilot/skills-index.md` or `.agents/skills/`
- **Coding standards**: See `copilot/workspace-patterns.md` or `CLAUDE.md`
- **Workflows**: See `AGENTS.md`
