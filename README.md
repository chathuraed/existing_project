# existing_project

A modern React/Astro application built with TypeScript, featuring Redux Toolkit, Formik forms, and Wix Design System integration.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## 📚 Documentation

### For Developers
- **[AGENTS.md](./AGENTS.md)** - AI personas, MCP servers, and workflow patterns
- **[CLAUDE.md](./CLAUDE.md)** - Technical standards and project memory
- **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** - GitHub Copilot Chat guide

### For AI/Copilot
- **[GitHub Copilot Instructions](./.github/copilot-instructions.md)** - Primary Copilot guide
- **[Skills Index](./.github/copilot/skills-index.md)** - Complete skills catalog
- **[Workspace Patterns](./.github/copilot/workspace-patterns.md)** - Coding conventions

## 🧰 Skills System

This repository uses a skills-based architecture located in `.agents/skills/`:

| Skill | Purpose |
|-------|---------|
| **@formik-skill** | Form management with Formik + Yup |
| **@redux-toolkit-skill** | State management and RTK Query |
| **@react-patterns** | React 18 patterns and hooks |
| **@react-useeffect** | useEffect best practices |
| **@react-vite-best-practices** | Vite optimization |
| **@vercel-react-best-practices** | Performance patterns |
| **@vercel-composition-patterns** | Component composition |
| **@web-design-guidelines** | UI/UX and accessibility |
| **@legacy-to-agents-migration** | Legacy code refactoring |

See [Skills Index](./.github/copilot/skills-index.md) for detailed documentation.

## 🔌 MCP Servers

Configured in `.vscode/mcp.json`:
- **Figma MCP** (local) - Design tokens and component specs
- **Wix MCP** (remote) - Site management and REST APIs  
- **Wix Design System MCP** (npx) - Components, props, icons
- **Octocode** (npx) - GitHub code search

## 🛠 Tech Stack

- **Framework**: Astro 5.8.0 + React 18.3.1
- **Language**: TypeScript 5.8.3
- **State**: Redux Toolkit 2.11.2
- **Forms**: Formik 2.4.9 + Yup 1.7.1
- **UI**: Wix Design System 1.0.0
- **Styling**: Tailwind CSS 4.1.18

## 📝 Development Commands

```bash
bun run dev          # Start Wix development environment
bun run build        # Production build
bun run preview      # Preview production build
bun run wix          # Wix CLI commands
bun run generate     # Generate Wix components
bun run release      # Release to Wix platform
```

## 🎯 Project Structure

```
.
├── .agents/                    # Skills and agent configurations
│   ├── README.md
│   └── skills/                 # Custom skills library
├── .github/                    # GitHub and Copilot configurations
│   ├── copilot/               # Copilot-specific configs
│   │   ├── instructions.md
│   │   ├── skills-index.md
│   │   └── workspace-patterns.md
│   ├── copilot-instructions.md
│   └── README.md
├── .vscode/
│   └── mcp.json               # MCP server configuration
├── src/                        # Source code (application code here)
├── AGENTS.md                   # AI personas and workflows
├── CLAUDE.md                   # Technical standards
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 📖 Getting Started

1. **Read the documentation**
   - Start with [copilot-instructions.md](./.github/copilot-instructions.md)
   - Review [AGENTS.md](./AGENTS.md) for AI workflows
   - Check [CLAUDE.md](./CLAUDE.md) for technical standards

2. **Set up your environment**
   - Install dependencies: `bun install`
   - Configure MCP servers in VS Code
   - Start dev server: `bun run dev`

3. **Use the skills system**
   - Browse available skills in `.agents/skills/`
   - Reference skills with `@skill-name` in Copilot prompts
   - Follow patterns in [workspace-patterns.md](./.github/copilot/workspace-patterns.md)

## 🤝 Contributing

Please follow:
- Coding conventions in [workspace-patterns.md](./.github/copilot/workspace-patterns.md)
- Technical standards in [CLAUDE.md](./CLAUDE.md)
- Skills architecture in `.agents/skills/`

## 📄 License

MIT