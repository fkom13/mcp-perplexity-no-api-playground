#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs');
const playgroundMain = require('./playground'); // Assure-toi que ce fichier existe !

let mcpSchema;
try {
    mcpSchema = JSON.parse(fs.readFileSync('./.mcp.json', 'utf-8'));
} catch (e) {
    mcpSchema = {tools: []};
}

const argv = yargs
    .command('list_tools', 'Liste les tools disponibles')
    .command('execute_tool', 'Exécute un tool', {
        tool: { type: 'string', demandOption: true, describe: 'Tool à exécuter' },
        params: { type: 'string', describe: 'Paramètres JSON pour le tool' }
    })
    .help(false)
    .argv;

if (argv._[0] === 'list_tools') {
    // Bloquer toute sortie parasite sur stderr pour cette commande
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
    try {
        process.stdout.write(JSON.stringify(mcpSchema, null, 2));
        process.exit(0);
    } catch (e) {
        process.stdout.write(JSON.stringify({ tools: [] }));
        process.exit(0);
    }
}

if (argv._[0] === 'execute_tool') {
    let params = {};
    try {
        if (argv.params) params = JSON.parse(argv.params);
    } catch (e) {
        process.stderr.write('{"error":"Paramètres JSON invalides"}\n');
        process.exit(1);
    }
    if (argv.tool === 'perplexity_playground_query') {
        if (!params.prompt) {
            process.stderr.write('{"error":"Paramètre prompt obligatoire"}\n');
            process.exit(1);
        }
        playgroundMain(params.prompt, params.model || 'sonar-pro').then(out => {
            process.stdout.write(JSON.stringify({ result: out }));
            process.exit(0);
        }).catch(err => {
            process.stderr.write(JSON.stringify({ error: err.message }));
            process.exit(1);
        });
    } else {
        process.stderr.write('{"error":"Tool inconnu"}\n');
        process.exit(1);
    }
    return;
}

process.stderr.write('{"error":"Commande inconnue, utilise list_tools ou execute_tool"}\n');
process.exit(1);
