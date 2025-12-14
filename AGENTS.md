# Agent Guidelines

## Commands
- Build: `pnpm build`
- Lint: `pnpm lint` (fix with `pnpm fix-lint`)
- Format: `pnpm format:check` (fix with `pnpm format:write`)
- Dev: `pnpm dev`
- No test framework configured

## Code Style
- Use `~/` path alias for src imports
- Prefer type imports: `import { type Component }`
- Use inline type imports with `type` prefix
- Unused args prefixed with `_` ignored by linting
- Use `cn()` utility for Tailwind class merging
- Follow Radix UI patterns for components
- Use cva for component variants
- Use Zod for schema validation
- Use React Query for data fetching
- Use Sentry for error tracking with spans for performance
- Use Geist font, Lucide icons, Tailwind CSS
- Component files use PascalCase, kebab-case for directories