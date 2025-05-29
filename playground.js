import puppeteer from 'puppeteer';

export async function askPlayground(prompt, model = 'sonar-pro') {
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.goto('https://playground.perplexity.ai/', { waitUntil: 'networkidle2' });
    await page.waitForSelector('select');
    await page.select('select', model);
    await page.waitForSelector('textarea[placeholder="Ask anything..."]');
    await page.type('textarea[placeholder="Ask anything..."]', prompt);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.prose', { timeout: 180000 });
    const output = await page.$eval('.prose', el => el.innerText);
    await browser.close();
    return output.trim();
  } catch (e) {
    await browser.close();
    return 'Error: ' + e.message;
  }
}