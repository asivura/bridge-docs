import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

const BASE_URL = 'http://localhost:4321/bridge-docs';
const pages = [
  { url: `${BASE_URL}/print/our-system/`, output: 'public/downloads/our-system-convention-card.pdf' },
  { url: `${BASE_URL}/print/sayc/`, output: 'public/downloads/sayc-convention-card.pdf' },
  { url: `${BASE_URL}/print/transition-guide/`, output: 'public/downloads/transition-guide.pdf' },
];

async function generatePDFs() {
  const browser = await chromium.launch();
  for (const { url, output } of pages) {
    mkdirSync(dirname(output), { recursive: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.pdf({
      path: output,
      format: 'A4',
      margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
      printBackground: true,
    });
    console.log(`Generated: ${output}`);
  }
  await browser.close();
}

generatePDFs();
