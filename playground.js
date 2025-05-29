import puppeteer from 'puppeteer';

export async function main(prompt, model="sonar-pro") {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://playground.perplexity.ai/');

  // Sélection du modèle
  await page.waitForSelector('select');
  await page.select('select', model);

  // Remplir le prompt
  await page.waitForSelector('textarea');
  await page.type('textarea', prompt);

  // Envoyer le prompt (souvent Enter)
  await page.keyboard.press('Enter');

  // Attendre que la réponse s’affiche
  await page.waitForSelector('.prose', {timeout: 30000});

  // Récupérer la réponse LLM (HTML et text)
  const result = await page.evaluate(() => {
    const prose = document.querySelector('.prose');
    return prose ? prose.innerText : null;
  });

  await browser.close();

  return { model, prompt, result };
}
