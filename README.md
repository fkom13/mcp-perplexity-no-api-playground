# mcp-perplexity-no-api-playground

Ce dépôt contient un outil MCP qui utilise Puppeteer pour interagir avec le playground Perplexity AI sans API directe. Il permet d'exécuter des requêtes en ligne de commande, en spécifiant un prompt et un modèle optionnel (défaut : sonar-pro).

## Fonctionnalités
- Exécute des requêtes sur https://playground.perplexity.ai/ via Puppeteer.
- Compatible avec les serveurs MCP officiels : peut être lancé via `npx` et renvoie des schémas d'outils en stdio.

## Comment l'utiliser
- Installez les dépendances avec `npm install` ou exécutez directement via `npx`.
- Exemple : `npx mcp-perplexity-no-api-playground --prompt "Votre question ici" --model "sonar-pro"`

## Integration with Automation Tools

### Avec n8n
n8n est un outil d'automatisation de workflows. Pour intégrer cet outil MCP :
1. Ajoutez un nœud "Exécuter une commande" (Execute Command) dans votre workflow n8n.
2. Utilisez la commande suivante :
   ```bash
   npx mcp-perplexity-no-api-playground --prompt "{{ $json.prompt }}" --model "{{ $json.model || 'sonar-pro' }}"
   ```
   - Remplacez `{{ $json.prompt }}` et `{{ $json.model }}` par des variables d'entrée de n8n pour passer dynamiquement le prompt et le modèle.
3. Capturez la sortie pour l'utiliser dans d'autres nœuds de votre workflow. La sortie sera au format MCP, avec les schémas d'outils et les réponses.

### Avec Claude ou d'autres systèmes AI
Pour intégrer dans des workflows avec Claude AI (d'Anthropic) ou des systèmes similaires :
- Définissez une étape qui exécute la commande via `npx`.
- Par exemple, dans un script ou un workflow, appelez :
  ```bash
  npx mcp-perplexity-no-api-playground --prompt "Votre prompt" --model "sonar-pro"
  ```
- La sortie peut être analysée pour extraire les réponses MCP. Assurez-vous que le MCP est configuré dans votre configuration JSON comme ceci :
  ```json
  "mcpServers": {
    "mcp-perplexity-no-api-playground": {
      "command": "npx",
      "args": ["mcp-perplexity-no-api-playground"],
      "env": {}
    }
  }
  ```

Cela rend l'outil facilement utilisable dans des pipelines automatisés comme n8n ou d'autres outils d'intégration.