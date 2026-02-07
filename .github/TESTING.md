# Testing GitHub Copilot Chat Integration

This document provides instructions for testing the GitHub Copilot Chat compatibility.

## Prerequisites

1. **VS Code** with GitHub Copilot Chat extension installed
2. **GitHub Copilot** subscription active
3. **Repository** cloned locally

## Testing Checklist

### 1. Basic Context Understanding

Open GitHub Copilot Chat and ask:

```
Q: "What is this repository about?"
Expected: Copilot should describe it as a React/Astro app with skills system

Q: "What tech stack does this project use?"
Expected: Mentions Astro 5.8.0, React 18.3.1, Redux Toolkit, Formik, TypeScript

Q: "How do I start the development server?"
Expected: Mentions `bun run dev` command
```

### 2. Skills Discovery

```
Q: "What skills are available in this project?"
Expected: Lists 9 skills with descriptions

Q: "Tell me about the formik skill"
Expected: Describes form management with Formik + Yup

Q: "What does the redux-toolkit-skill do?"
Expected: Describes state management and RTK Query
```

### 3. Skills Usage

```
Q: "@formik-skill Create a login form"
Expected: Generates a form using Formik with email/password fields

Q: "@redux-toolkit-skill Add an API endpoint for users"
Expected: Generates RTK Query slice with user endpoints

Q: "@react-patterns Show me how to use custom hooks"
Expected: Provides React hooks examples following patterns
```

### 4. Coding Standards

```
Q: "What are the TypeScript standards for this project?"
Expected: Mentions strict mode, no `any` type, types in src/types/

Q: "How should I name my components?"
Expected: Mentions PascalCase for components

Q: "What styling approach should I use?"
Expected: Mentions Wix Design System tokens, no hardcoded values
```

### 5. MCP Servers

```
Q: "What MCP servers are configured?"
Expected: Lists Figma, Wix MCP, Wix Design System, Octocode

Q: "How do I use the Wix Design System MCP?"
Expected: Explains npx-based usage, component queries

Q: "What can Octocode do?"
Expected: Describes GitHub code search capabilities
```

### 6. Workflow Patterns

```
Q: "How do I build a form in this project?"
Expected: Describes workflow using @formik-skill → validation → Redux

Q: "What's the recommended way to fetch data?"
Expected: Mentions RTK Query, no manual useEffect

Q: "How do I optimize component performance?"
Expected: References react-vite-best-practices and vercel-react-best-practices
```

### 7. Project Structure

```
Q: "Where should I put React components?"
Expected: Suggests src/components/ directory

Q: "Where are the skills located?"
Expected: Points to .agents/skills/ directory

Q: "What documentation should I read first?"
Expected: Suggests copilot-instructions.md or README.md
```

### 8. File-Specific Context

```
Q: "Show me the package.json dependencies"
Expected: Lists or describes dependencies from package.json

Q: "What's in the AGENTS.md file?"
Expected: Describes AI personas, MCP servers, workflows

Q: "What skills are documented?"
Expected: References the 9 skills in .agents/skills/
```

## Expected Behavior

### ✅ Good Signs
- Copilot understands project structure
- References specific files and directories correctly
- Knows about all 9 skills
- Follows coding standards in suggestions
- Uses Wix Design System in examples
- Mentions MCP servers appropriately

### ❌ Issues to Watch For
- Generic responses without project context
- Doesn't know about skills
- Suggests wrong technology (e.g., npm instead of bun)
- Recommends hardcoded styles instead of design tokens
- Suggests manual data fetching instead of RTK Query

## Advanced Testing

### Multi-Step Workflows

```
Q: "I need to create a user registration feature. Guide me through it."
Expected flow:
1. Suggests using @formik-skill for form
2. Mentions @redux-toolkit-skill for state
3. References validation with Yup
4. Suggests RTK Query for API calls
5. Recommends testing approach
```

### Complex Queries

```
Q: "How would I implement optimistic updates for a user profile update?"
Expected: 
- References @redux-toolkit-skill
- Explains RTK Query optimistic updates
- Provides code example following project patterns
```

### Refactoring

```
Q: "@legacy-to-agents-migration I have a large component. Help refactor it."
Expected:
- Suggests breaking into smaller components
- Recommends extracting custom hooks
- Follows skills architecture
- Maintains existing functionality
```

## Troubleshooting

### If Copilot Doesn't See Context

1. **Check File Location**
   ```bash
   ls -la .github/copilot-instructions.md
   ```

2. **Reload VS Code**
   - Command Palette: "Developer: Reload Window"
   - Reopen Copilot Chat

3. **Verify Extension**
   - Ensure GitHub Copilot Chat extension is enabled
   - Check subscription status

4. **Check .copilotignore**
   - Ensure it's not excluding too much
   - Verify .github/ is not ignored

### If Skills Don't Work

1. **Verify Skill Structure**
   ```bash
   # Run validation script
   bash /tmp/validate_copilot_structure.sh
   ```

2. **Check YAML Frontmatter**
   ```bash
   # Check each skill has frontmatter
   for skill in .agents/skills/*/SKILL.md; do
     echo "Checking $skill"
     head -5 "$skill"
   done
   ```

3. **Try Direct Reference**
   ```
   Instead of: "help with forms"
   Try: "@formik-skill help with forms"
   ```

## Success Metrics

After testing, you should observe:

1. ✅ **Context Awareness**: 90%+ of questions answered with project context
2. ✅ **Skill Discovery**: Copilot knows about all 9 skills
3. ✅ **Skill Usage**: `@skill-name` references work correctly
4. ✅ **Standards Compliance**: Generated code follows project patterns
5. ✅ **Documentation**: Copilot references correct files

## Logging Issues

If you find issues, document:

1. **What you asked**: Exact question or prompt
2. **Expected response**: What should happen
3. **Actual response**: What Copilot said
4. **Context**: Which file you were in, if any

Example:
```
Asked: "What skills are available?"
Expected: List of 9 skills with descriptions
Actual: Generic response about skills in general
Context: Opened in root directory
```

## Next Steps

After successful testing:

1. ✅ **Train Team**: Share testing results with team
2. ✅ **Create Examples**: Add successful prompts to documentation
3. ✅ **Iterate**: Update documentation based on common questions
4. ✅ **Expand**: Add more skills as needed

## Resources

- **Main Guide**: `.github/copilot-instructions.md`
- **Quick Reference**: `.github/copilot/instructions.md`
- **Skills Catalog**: `.github/copilot/skills-index.md`
- **Patterns**: `.github/copilot/workspace-patterns.md`

---

**Last Updated**: February 7, 2026  
**Status**: Ready for Testing  
**Version**: 1.0
