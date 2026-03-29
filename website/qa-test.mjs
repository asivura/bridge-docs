import { chromium } from 'playwright';
import { readFileSync } from 'fs';

const BASE = 'http://localhost:4321/bridge-docs';
const SCREENSHOT_DIR = 'qa-screenshots';

const pages = [
  { path: '/', name: 'index', label: 'Landing' },
  { path: '/our-system', name: 'our-system', label: 'Our System' },
  { path: '/sayc', name: 'sayc', label: 'SAYC' },
  { path: '/comparison', name: 'comparison', label: 'Comparison' },
  { path: '/differences', name: 'differences', label: 'Differences' },
];

const results = [];

function log(msg) {
  console.log(msg);
}

function pass(page, check) {
  results.push({ page, check, status: 'PASS' });
  log(`  ✓ ${check}`);
}

function fail(page, check, detail) {
  results.push({ page, check, status: 'FAIL', detail });
  log(`  ✗ ${check}: ${detail}`);
}

async function run() {
  const browser = await chromium.launch();

  // ── Desktop viewport tests ──
  log('\n=== DESKTOP VIEWPORT (1280x800) ===\n');
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const desktopPage = await desktopCtx.newPage();

  const consoleErrors = [];
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  for (const pg of pages) {
    const url = `${BASE}${pg.path}`;
    log(`[${pg.label}] ${url}`);

    const resp = await desktopPage.goto(url, { waitUntil: 'networkidle' });

    // 1. HTTP status
    if (resp.status() === 200) {
      pass(pg.label, 'HTTP 200');
    } else {
      fail(pg.label, 'HTTP status', `Got ${resp.status()}`);
    }

    // 2. Page not blank
    const bodyText = await desktopPage.textContent('body');
    if (bodyText && bodyText.trim().length > 50) {
      pass(pg.label, 'Page has content');
    } else {
      fail(pg.label, 'Page has content', 'Body text too short or empty');
    }

    // 3. Heading present
    const h1 = await desktopPage.$('h1');
    if (h1) {
      const h1Text = await h1.textContent();
      pass(pg.label, `H1 present: "${h1Text.trim().substring(0, 60)}"`);
    } else {
      fail(pg.label, 'H1 present', 'No h1 found');
    }

    // 4. Navigation links
    const navLinks = await desktopPage.$$('nav a, header a');
    if (navLinks.length >= 3) {
      pass(pg.label, `Navigation links: ${navLinks.length} found`);
    } else {
      fail(pg.label, 'Navigation links', `Only ${navLinks.length} nav links found`);
    }

    // 5. Tables on system pages
    if (['Our System', 'SAYC', 'Comparison'].includes(pg.label)) {
      const tables = await desktopPage.$$('table');
      if (tables.length > 0) {
        pass(pg.label, `Tables rendered: ${tables.length} table(s)`);
      } else {
        fail(pg.label, 'Tables rendered', 'No <table> elements found');
      }
    }

    // 6. No broken images
    const images = await desktopPage.$$('img');
    let brokenImages = 0;
    for (const img of images) {
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      if (naturalWidth === 0) brokenImages++;
    }
    if (images.length === 0) {
      pass(pg.label, 'No images to check');
    } else if (brokenImages === 0) {
      pass(pg.label, `All ${images.length} images loaded`);
    } else {
      fail(pg.label, 'Broken images', `${brokenImages} of ${images.length} broken`);
    }

    // Screenshot
    await desktopPage.screenshot({
      path: `${SCREENSHOT_DIR}/${pg.name}-desktop.png`,
      fullPage: true,
    });
    log(`  📸 ${SCREENSHOT_DIR}/${pg.name}-desktop.png`);
  }

  // ── Content spot-checks ──
  log('\n=== CONTENT SPOT-CHECKS ===\n');

  // Our System: 1♣ with 12-19 HCP
  await desktopPage.goto(`${BASE}/our-system`, { waitUntil: 'networkidle' });
  const ourSystemText = await desktopPage.textContent('body');
  if (ourSystemText.includes('1♣') && ourSystemText.includes('12')) {
    pass('Our System', 'Content: 1♣ with 12+ HCP found');
  } else {
    fail('Our System', 'Content: 1♣ with 12-19 HCP', 'Expected text not found');
  }

  // SAYC: 2♦ with weak two (5-11)
  await desktopPage.goto(`${BASE}/sayc`, { waitUntil: 'networkidle' });
  const saycText = await desktopPage.textContent('body');
  if (saycText.includes('2♦') && (saycText.includes('5-11') || saycText.includes('Weak'))) {
    pass('SAYC', 'Content: 2♦ weak two found');
  } else {
    fail('SAYC', 'Content: 2♦ weak two', 'Expected text not found');
  }

  // Comparison: DiffBadge elements
  await desktopPage.goto(`${BASE}/comparison`, { waitUntil: 'networkidle' });
  // Check for badge-like elements (could be spans with specific classes or data attributes)
  const badges = await desktopPage.$$('[class*="badge"], [class*="Badge"], [class*="diff"], [class*="Diff"], span.inline-flex');
  if (badges.length > 0) {
    pass('Comparison', `DiffBadge elements: ${badges.length} found`);
  } else {
    // Also check for any colored indicator elements
    const indicators = await desktopPage.$$('span[class*="bg-"], span[class*="text-"]');
    if (indicators.length > 5) {
      pass('Comparison', `Diff indicators: ${indicators.length} colored spans found`);
    } else {
      fail('Comparison', 'DiffBadge elements', 'No badge/diff indicator elements found');
    }
  }

  // Differences: key difference cards
  await desktopPage.goto(`${BASE}/differences`, { waitUntil: 'networkidle' });
  const cards = await desktopPage.$$('[class*="card"], [class*="Card"], section, article');
  const differencesText = await desktopPage.textContent('body');
  if (cards.length > 0 && differencesText.includes('SAYC')) {
    pass('Differences', `Difference cards: ${cards.length} card-like elements`);
  } else {
    fail('Differences', 'Difference cards', 'No card elements found');
  }

  await desktopCtx.close();

  // ── Mobile viewport tests ──
  log('\n=== MOBILE VIEWPORT (375x667) ===\n');
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const mobilePage = await mobileCtx.newPage();

  for (const pg of pages) {
    const url = `${BASE}${pg.path}`;
    log(`[${pg.label}] Mobile`);

    await mobilePage.goto(url, { waitUntil: 'networkidle' });

    // Check page loads
    const mobileBody = await mobilePage.textContent('body');
    if (mobileBody && mobileBody.trim().length > 50) {
      pass(`${pg.label} (mobile)`, 'Page loads with content');
    } else {
      fail(`${pg.label} (mobile)`, 'Page loads', 'Empty or minimal content');
    }

    // Check for horizontal overflow (page wider than viewport)
    const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    if (scrollWidth <= 390) { // small tolerance
      pass(`${pg.label} (mobile)`, 'No horizontal overflow');
    } else {
      fail(`${pg.label} (mobile)`, 'Horizontal overflow', `scrollWidth=${scrollWidth} > 375`);
    }

    // For table pages, check tables have scroll wrapper or are responsive
    if (['Our System', 'SAYC', 'Comparison'].includes(pg.label)) {
      const tables = await mobilePage.$$('table');
      if (tables.length > 0) {
        pass(`${pg.label} (mobile)`, `Tables present: ${tables.length}`);
        // Check if tables or their wrappers have overflow-x
        const hasScrollWrapper = await mobilePage.evaluate(() => {
          const tables = document.querySelectorAll('table');
          for (const t of tables) {
            const parent = t.parentElement;
            if (parent) {
              const style = window.getComputedStyle(parent);
              if (style.overflowX === 'auto' || style.overflowX === 'scroll') return true;
            }
          }
          return false;
        });
        if (hasScrollWrapper) {
          pass(`${pg.label} (mobile)`, 'Tables have scroll wrapper');
        } else {
          // Not necessarily a fail - tables might just be narrow enough
          log(`  ⚠ Tables may not have explicit scroll wrapper`);
        }
      }
    }

    await mobilePage.screenshot({
      path: `${SCREENSHOT_DIR}/${pg.name}-mobile.png`,
      fullPage: true,
    });
    log(`  📸 ${SCREENSHOT_DIR}/${pg.name}-mobile.png`);
  }

  await mobileCtx.close();

  // ── Navigation link verification ──
  log('\n=== NAVIGATION LINK CHECK ===\n');
  const navCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const navPage = await navCtx.newPage();
  await navPage.goto(`${BASE}/`, { waitUntil: 'networkidle' });

  const allNavLinks = await navPage.$$eval('nav a, header a', links =>
    links.map(a => ({ href: a.getAttribute('href'), text: a.textContent.trim() }))
  );
  log(`Navigation links found: ${JSON.stringify(allNavLinks, null, 2)}`);

  const expectedPaths = ['/bridge-docs/our-system', '/bridge-docs/sayc', '/bridge-docs/comparison', '/bridge-docs/differences'];
  for (const expected of expectedPaths) {
    const found = allNavLinks.some(l => l.href && l.href.includes(expected.replace('/bridge-docs', '')));
    if (found) {
      pass('Navigation', `Link to ${expected} exists`);
    } else {
      fail('Navigation', `Link to ${expected}`, 'Not found in nav');
    }
  }

  // Click-test each nav link
  for (const link of allNavLinks) {
    if (link.href && link.href.startsWith('/')) {
      const resp = await navPage.goto(`http://localhost:4321${link.href}`, { waitUntil: 'networkidle' });
      if (resp.status() === 200) {
        pass('Navigation', `${link.text} → ${link.href} (200 OK)`);
      } else {
        fail('Navigation', `${link.text} → ${link.href}`, `Status ${resp.status()}`);
      }
    }
  }

  await navCtx.close();

  // ── Console errors ──
  log('\n=== CONSOLE ERRORS ===\n');
  if (consoleErrors.length === 0) {
    pass('Console', 'No console errors');
  } else {
    for (const err of consoleErrors) {
      fail('Console', 'Console error', err);
    }
  }

  // ── Summary ──
  log('\n========== QA SUMMARY ==========\n');
  const passes = results.filter(r => r.status === 'PASS').length;
  const fails = results.filter(r => r.status === 'FAIL').length;
  log(`Total checks: ${results.length}`);
  log(`PASS: ${passes}`);
  log(`FAIL: ${fails}`);

  if (fails > 0) {
    log('\nFailed checks:');
    for (const r of results.filter(r => r.status === 'FAIL')) {
      log(`  ✗ [${r.page}] ${r.check}: ${r.detail}`);
    }
  }

  log(`\nScreenshots saved to ${SCREENSHOT_DIR}/`);

  await browser.close();

  // Exit with error code if failures
  process.exit(fails > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('QA script failed:', err);
  process.exit(2);
});
