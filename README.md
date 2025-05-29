# MCP Perplexity No API Playground

## Correctif important pour la compatibilité MCP

- Le script `index.js` garantit de n'afficher sur stdout QUE le JSON des tools pour la commande `list_tools`, sans aucune écriture sur stderr (ni log, ni warning) :
  - En cas d'erreur de lecture ou de JSON invalide, renvoie `{ tools: [] }` et exit 0 (jamais de code d'erreur pour list_tools)
  - Le shebang `#!/usr/bin/env node` permet l'exécution directe si les droits système sont corrects
  - Pour installation : faire `npm install` dans le dossier avant toute commande (`puppeteer` et `yargs` obligatoires)
- Un problème "Connection closed" côté MCP signifie souvent que le script n'a pas démarré (non exécutable, Node manquant, ou dépendances non installées)
- Vérifier que la commande MCP pointe bien vers `./index.js list_tools` ou `npx node ./index.js list_tools` dans le dossier, et que le script est exécutable :
    chmod +x index.js

## Dépendances
- Node.js >= 18
- puppeteer
- yargs

---

Si MCP veut exécuter le binaire directement, il doit (dans le Docker/VM cible) :

- node -v >=18
- chmod +x index.js
- npm ci

Sinon, la commande tombera silencieusement ou retournera 'Connection closed'.
Si malgré tout MCP refuse de répondre sur `list_tools`, vérifier les logs du serveur pour voir le détail du crash (npm, Node ou droits).