#!/usr/bin/env node
import { main as playgroundMain } from './playground.js';
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";

const args = yargs(hideBin(process.argv))
  .option('prompt', {
    alias: 'p',
    type: 'string',
    description: 'Prompt à envoyer (sinon lecture sur stdin)'
  })
  .option('model', {
    alias: 'm',
    type: 'string',
    description: 'Modèle à utiliser (par défaut sonar-pro)',
    default: 'sonar-pro'
  })
  .help().argv;

(async () => {
  let prompt = args.prompt;
  if (!prompt) {
    prompt = await new Promise(resolve => {
      let data = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => data += chunk);
      process.stdin.on('end', () => resolve(data.trim()));
    });
  }
  const model = args.model;
  const result = await playgroundMain(prompt, model);
  process.stdout.write(JSON.stringify(result) + '\n');
})();

// Toolschema exporté pour MCP stdio
if (process.argv.includes('--toolschema')) {
  const schema = JSON.parse(fs.readFileSync('.mcp.json', 'utf8'));
  process.stdout.write(JSON.stringify(schema, null, 2) + '\n');
}