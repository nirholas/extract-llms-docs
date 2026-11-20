# Installation

Set up the llm.energy MCP server for AI assistants.

---

## What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io) (MCP) allows AI assistants to interact with external tools and data sources.

---

## Quick Setup

=== "Build from source (Recommended)"

    The server is not published to npm yet. Build it from the repository:

    ```bash
    git clone https://github.com/nirholas/extract-llms-docs.git
    cd extract-llms-docs/mcp-server
    npm install
    npm run build
    ```

    Then point your client at the built file (use your real absolute path):

    ```json
    {
      "mcpServers": {
        "llm-energy": {
          "command": "node",
          "args": ["/absolute/path/to/extract-llms-docs/mcp-server/dist/index.js"]
        }
      }
    }
    ```

=== "Global Install"

    From the `mcp-server` directory of your clone, after building:

    ```bash
    npm install -g .
    ```

    ```json
    {
      "mcpServers": {
        "llm-energy": {
          "command": "llm-energy-mcp"
        }
      }
    }
    ```

---

## Configuration

=== "Claude Desktop"

    Add to your Claude Desktop config:

    | OS | Path |
    |----|------|
    | macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
    | Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

=== "VS Code / Cursor"

    Add to workspace settings or MCP configuration:

    ```json
    {
      "llm-energy": {
        "command": "node",
        "args": ["/absolute/path/to/extract-llms-docs/mcp-server/dist/index.js"]
      }
    }
    ```

---

## Verify Installation

After configuration, restart your AI client. Ask:

> "What tools does llm-energy provide?"

The assistant should list the available extraction tools.
