# MCP Perplexity Playground

Un MCP qui expose 1 outil MCP, natif, conforme (inspiré/similaire à mcp-selenium d'angiejones)

## Outil exposé

- **perplexity_playground_query**
  - prompt (string, required) -- prompt à envoyer
  - model (string, optionnel, par défaut sonar-pro) -- modèle playground

## Usage

Dans le contexte MCP (ou en local node), pour tester l’interface MCP :

```
npx -y @fkom13/mcp-perplexity-no-api-playground list_tools
```

Retourne :

```json
{
  "tools": [
    {
      "name": "perplexity_playground_query",
      "description": "Interroge Perplexity Playground via Puppeteer (prompt et modèle)",
      "parameters": [
        { "name": "prompt", "type": "string", "required": true, "description": "Le prompt/question à soumettre au LLM." },
        { "name": "model", "type": "string", "required": false, "description": "Le modèle à utiliser (par défaut : sonar-pro)." }
      ],
      "responses": [
        { "name": "result", "type": "string", "description": "Réponse textuelle complète du LLM." }
      ]
    }
  ]
}
```

## Fichier d'entrée MCP (bin/mcp-perplexity.js)
100% MCP SDK, aucune sortie parasite, conforme, inspiré du repo selenium d’angiejones.

## Dépendances
- node >= 18
- puppeteer
- @modelcontextprotocol/sdk

## Publication
- main npm: package.json "bin": mcp-perplexity => bin/mcp-perplexity.js

Une fois installé ou appelé avec npx, fonctionne partout comme un MCP standard, syntaxe compatible orchestrateur modelcontextprotocol.

---

Auteur : fkom13
