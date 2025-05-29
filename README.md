# mcp-perplexity-no-api-playground

MCP server (compatible stdio & npx remote execution) for Perplexity Playground automation via Puppeteer. No official API required.

## Features
- Full stdio tool MCP server
- Prompt input + optional model selection ([sonar-pro] default, r1-1776, sonar, sonar-reasoning-pro, sonar-reasoning)
- Uses Puppeteer to submit prompts & fetch answers directly in https://playground.perplexity.ai/
- Output/reply is captured and returned as tool result

## Usage
```bash
npx github:Fkom13/mcp-perplexity-no-api-playground@main --prompt "Your question?" --model sonar-pro
```

## Files
- `index.js`: MCP server logic
- `playground.js`: Puppeteer automation (model/prompt/response)
- `.mcp.json`: MCP tools schema & description
