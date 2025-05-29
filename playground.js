const puppeteer = require('puppeteer');

async function playgroundMain(prompt, model = "sonar-pro") {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://playground.perplexity.ai/');

  // Sélection du modèle
  await page.waitForSelector('select');
  await page.select('select', model);

  // Remplir le prompt
  await page.waitForSelector('textarea');
  await page.type('textarea', prompt);

  // Envoyer le prompt (Enter)
  await page.keyboard.press('Enter');

  // Attendre que la réponse s'affiche
  await page.waitForSelector('.prose', {timeout: 30000});

  // Récupérer la réponse LLM (texte)
  const result = await page.evaluate(() => {
    const prose = document.querySelector('.prose');
    return prose ? prose.innerText : null;
  });

  await browser.close();

  return { model, prompt, result };
}

module.exports = playgroundMain;
