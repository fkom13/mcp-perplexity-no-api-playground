#!/usr/bin/env node
import { askPlayground } from "./playground.js";
import tools from "./.mcp.json" assert { type: "json" };

const args = process.argv.slice(2);
let prompt = "";
let model = "sonar-pro";

for (let i = 0; i < args.length; i++) {
    if ((args[i] === "--prompt" || args[i] === "-p") && args[i + 1]) {
        prompt = args[i + 1];
        i++;
    } else if ((args[i] === "--model" || args[i] === "-m") && args[i + 1]) {
        model = args[i + 1];
        i++;
    }
}

function showTools() {
    process.stdout.write(JSON.stringify(tools));
}

if (args.includes("--tools")) {
    showTools();
    process.exit(0);
}

if (!prompt) {
    process.stdout.write("Missing --prompt parameter\n");
    process.exit(1);
}

(async () => {
    const result = await askPlayground(prompt, model);
    process.stdout.write(
        JSON.stringify({
            tool: "perplexity-playground",
            input: { prompt, model },
            output: { result }
        }) + "\n"
    );
})();
