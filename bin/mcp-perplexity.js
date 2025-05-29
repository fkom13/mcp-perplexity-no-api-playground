#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Tool MCP minimaliste pour débug/conformité MCP
const server = new McpServer({
    name: "MCP Perplexity",
    version: "1.0.0"
});

server.tool(
    "perplexity_playground_query",
    "Interroge Perplexity Playground via Puppeteer (prompt et modèle)",
    {
        prompt: {
            type: "string",
            required: true,
            description: "Le prompt/question à soumettre au LLM."
        },
        model: {
            type: "string",
            required: false,
            description: "Le modèle à utiliser (par défaut : sonar-pro)."
        }
    },
    async ({ prompt, model }) => {
        // Dummy response temporaire pour valider le MCP
        return {
            result: `Prompt reçu: ${prompt} | Model: ${model || "sonar-pro"}`
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);
