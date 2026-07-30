# extract-llms-docs examples

llm.energy - Extract documentation for AI agents from any site with llms.txt support

## Example 1

```text
─────────────────────────────────────────────────────────────────
                                                                 
   📝 Feed docs to AI coding assistants (Cursor, Windsurf)       
   🤖 Build context-aware AI agents with up-to-date docs         
   🔄 Create documentation pipelines for RAG systems            
   📦 Aggregate docs from multiple sources automatically        
   ✏️  Generate llms.txt/install.md for your own projects       
   🚀 Auto-generate install.md from any GitHub repo             
                                                                 
─────────────────────────────────────────────────────────────────
```

## Example 2

```bash
# Generate install.md for any GitHub project
curl -X POST https://llm-energy-lp642k3kpa-uc.a.run.app/api/generate-install \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/anthropics/anthropic-sdk-python", "type": "github"}'
```

## Example 3

```bash
# Clone the repository
git clone https://github.com/nirholas/extract-llms-docs.git
cd extract-llms-docs

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Example 4

```bash
curl -X POST https://llm-energy-lp642k3kpa-uc.a.run.app/api/extract \
  -H "Content-Type: application/json" \
  -d '{"url": "docs.anthropic.com"}'
```

## Example 5

```bash
curl -X POST https://llm-energy-lp642k3kpa-uc.a.run.app/api/validate \
  -H "Content-Type: application/json" \
  -d '{"url": "docs.example.com"}'
```

## Example 6

```bash
curl -X POST https://llm-energy-lp642k3kpa-uc.a.run.app/api/batch \
  -H "Content-Type: application/json" \
  -d '{"urls": ["docs.anthropic.com", "docs.stripe.com"]}'
```

## Example 7

```bash
# Formats: markdown, json, yaml, zip
curl "https://llm-energy-lp642k3kpa-uc.a.run.app/api/download?url=docs.anthropic.com&format=zip"
```

## Example 8

```bash
# Generate from a GitHub repository
curl -X POST https://llm-energy-lp642k3kpa-uc.a.run.app/api/generate-install \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/anthropics/anthropic-sdk-python", "type": "github"}'

# Generate from a documentation URL
curl -X POST https://llm-energy-lp642k3kpa-uc.a.run.app/api/generate-install \
  -H "Content-Type: application/json" \
  -d '{"url": "https://docs.anthropic.com/en/docs/quickstart", "type": "docs"}'

# Analyze only (preview mode)
curl "https://llm-energy-lp642k3kpa-uc.a.run.app/api/generate-install?url=https://github.com/anthropics/anthropic-sdk-python&type=github"
```


Every snippet above is taken from the [repository documentation](https://github.com/nirholas/extract-llms-docs#readme).
