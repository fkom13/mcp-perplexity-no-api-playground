#!/usr/bin/env node

const { McpServer, StdioServerTransport } = require('@modelcontextprotocol/sdk');
const puppeteer = require('puppeteer');

const transport = new StdioServerTransport();
const server = new McpServer({
  transport,
  tools: [
    {
      name: 'perplexity_playground_query',
      description: 'Interroge Perplexity Playground via Puppeteer (prompt et modèle)',
      parameters: [
        {
          name: 'prompt',
          type: 'string',
          required: true,
          description: 'Le prompt/question à soumettre au LLM.'
        },
        {
          name: 'model',
          type: 'string',
          required: false,
          description: 'Le modèle à utiliser (par défaut : sonar-pro).'
        }
      ],
      responses: [
        {
          name: 'result',
          type: 'string',
          description: 'Réponse textuelle complète du LLM.'
        }
      ],
      exec: async ({ prompt, model }) => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const usedModel = model || 'sonar-pro';
        await page.goto('https://www.perplexity.ai/playground');
        await page.type('textarea[placeholder="Enter a prompt..."]', prompt);
        await page.select('select', usedModel);
        await page.click('button[type="submit"]');
        await page.waitForSelector('#result-output', { timeout: 30000 });
        const resultText = await page.$eval('#result-output', el => el.innerText);
        await browser.close();
        return { result: resultText };
      }
    }
  ]
});
server.start();
