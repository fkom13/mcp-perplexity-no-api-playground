# mcp-perplexity-no-api-playground

Serveur MCP sans API utilisant Puppeteer pour interroger le Playground Perplexity.

- Compatible MCP stdio (et invocation npx)
- Utilise Puppeteer pour interagir avec https://playground.perplexity.ai/
- Sélection du modèle optionnelle (sonar-pro par défaut)
- Prend un prompt en entrée stdio ou via argument
- Retour MCP (toolschema + sortie modelisée Perplexity)

## Usage rapide

```sh
npm install
npx . --prompt "Quelle est la capitale de l'Australie ?" --model sonar-pro
```

## Schéma des tools

Cf. `.mcp.json` et code source

## Dépendances
- Node.js >= 18
- puppeteer

## Licence
MIT