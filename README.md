# llm.energy ⚡

> Extract documentation for AI agents from any site with llms.txt support

## What It Does

llm.energy fetches documentation from websites that support the llms.txt standard and organizes it into downloadable markdown files optimized for AI assistants.

1. User enters a documentation URL
2. The app fetches `/llms-full.txt` or `/llms.txt` from the site
3. Content is parsed and organized into individual sections
4. Results are presented with:
   - MCP server configuration
   - REST API endpoint
   - Multiple download formats (Markdown, JSON, YAML)

## Features

- 🔍 Auto-detection of llms.txt or llms-full.txt
- 📄 Split content into organized markdown sections
- 📦 MCP Server for programmatic access
- 🔌 REST API endpoint with caching
- 📥 Individual files or ZIP download
- 🤖 Agent-ready output with AGENT-GUIDE.md
- 📚 Site directory with known llms.txt sites
- ⚡ Batch processing for multiple URLs
- 🛡️ Rate limiting for API protection
- 📊 Export to JSON, YAML, or Markdown

## Tech Stack

- Next.js 14
- Tailwind CSS
- Framer Motion
- TSParticles
- Lucide Icons
- Vitest (testing)

## Running Locally

```bash
cd llms-forge
pnpm install
pnpm dev
```

Open http://localhost:3001

## Development

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Type check
pnpm typecheck

# Lint
pnpm lint

# Build
pnpm build
```

## MCP Server

Install the MCP server for programmatic access:

```json
{
  "mcpServers": {
    "llm-energy": {
      "command": "npx",
      "args": ["-y", "@llm-energy/mcp-server"]
    }
  }
}
```

## API Endpoints

### Extract Documentation
```bash
POST /api/extract
Content-Type: application/json

{ "url": "https://docs.example.com" }
```

### Validate URL
```bash
POST /api/validate
Content-Type: application/json

{ "url": "https://docs.example.com" }
```

### Batch Processing
```bash
POST /api/batch
Content-Type: application/json

{ "urls": ["https://docs.a.com", "https://docs.b.com"] }
```

## Project Structure

```
llms-forge/
├── src/
│   ├── app/           # Next.js pages and API routes
│   ├── components/    # React components
│   ├── lib/           # Utilities (cache, rate-limiter, parser)
│   ├── types/         # TypeScript types
│   └── __tests__/     # Unit tests
├── packages/
│   └── core/          # Shared parser, types, generators
├── mcp-server/        # MCP server package
└── docs-site/         # Documentation (MkDocs)
```

## Links

- Website: https://llm.energy
- Docs: https://llm.energy/docs
- GitHub: https://github.com/nirholas/lyra-tool-discovery

---

*Built by [nich](https://x.com/nichxbt)*

