// Cattura screenshot fullpage dei 3 siti clienti e salva come JPG in public/images/projects/.
// Uso: node scripts/capture-previews.mjs
//
// Dismissa cookie banner comuni prima di catturare. 1440px wide, height = pagina intera.

import { chromium } from "playwright"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, "..", "public", "images", "projects")

const SITES = [
  {
    slug: "siciliaclassica",
    url: "https://siciliaclassica.it",
    // Iubenda / Cookiebot / custom: clicca il primo bottone "Accetta" trovato
    cookieSelectors: [
      'button:has-text("Accetta tutti")',
      'button:has-text("Accetta")',
      'button:has-text("Accept all")',
      'button:has-text("Accept")',
      '#iubenda-cs-banner button[class*="accept"]',
      '.iubenda-cs-accept-btn',
    ],
  },
  {
    slug: "south-unconventional",
    url: "https://www.southunconventional.com",
    cookieSelectors: [
      'button:has-text("Accept")',
      'button:has-text("Accetta")',
      'button:has-text("Allow all")',
      'button[aria-label*="accept" i]',
    ],
  },
  {
    slug: "sicilery",
    url: "https://www.sicilery.com/it/about-us",
    cookieSelectors: [
      'button:has-text("Accetta")',
      'button:has-text("Accept")',
      'button:has-text("Consenti tutti")',
      '.cky-btn-accept',
      '#cookieyes button',
    ],
  },
]

async function dismissCookies(page, selectors) {
  // Prova i selettori espliciti
  for (const sel of selectors) {
    try {
      const el = await page.waitForSelector(sel, { timeout: 1000, state: "visible" })
      if (el) {
        await el.click()
        await page.waitForTimeout(600)
        return "explicit"
      }
    } catch { /* selector non trovato, prova il successivo */ }
  }
  // Fallback generico: cerca qualsiasi bottone/link con testo di accetta cookie
  const dismissed = await page.evaluate(() => {
    const patterns = /^\s*(accetta|accept|ok|consenti|allow|agree|got it|accetto|ho capito)/i
    const hideKeywords = /cookie|consent|privacy|gdpr/i
    const clickables = Array.from(document.querySelectorAll("button, a, [role='button']"))
    for (const el of clickables) {
      const text = (el.textContent || "").trim()
      if (!text || text.length > 40) continue
      if (!patterns.test(text)) continue
      // Ancestor deve avere parola "cookie" nel testo/classi/id
      let ancestor = el
      let match = false
      for (let i = 0; i < 6 && ancestor; i++) {
        const hay = `${ancestor.className} ${ancestor.id} ${ancestor.textContent?.slice(0, 300) ?? ""}`
        if (hideKeywords.test(hay)) { match = true; break }
        ancestor = ancestor.parentElement
      }
      if (match) { el.click(); return true }
    }
    return false
  })
  if (dismissed) {
    await page.waitForTimeout(600)
    return "fallback"
  }
  // Ultima spiaggia: nascondi overlay/banner via CSS selezionando fixed/sticky con "cookie"
  await page.addStyleTag({
    content: `
      [class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i],
      [class*="gdpr" i],[id*="gdpr" i],[class*="privacy-banner" i],
      .iubenda-cs-container,.cky-consent-container,#cookiebot {
        display: none !important; visibility: hidden !important; opacity: 0 !important;
      }
    `,
  })
  await page.waitForTimeout(400)
  return "css-hide"
}

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36",
    locale: "it-IT",
  })

  for (const site of SITES) {
    console.log(`\n→ ${site.slug}: ${site.url}`)
    const page = await context.newPage()
    try {
      // load è piu' affidabile di networkidle — molti siti tengono connessioni aperte
      await page.goto(site.url, { waitUntil: "load", timeout: 45000 })
      await page.waitForTimeout(2500)

      const dismissed = await dismissCookies(page, site.cookieSelectors)
      console.log(`  cookie dismissed: ${dismissed}`)

      // Wait for fonts/images to settle
      await page.waitForTimeout(2500)
      // Scroll to bottom and back to top to trigger lazy-load
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          const step = window.innerHeight / 2
          let y = 0
          const max = document.documentElement.scrollHeight
          const timer = setInterval(() => {
            y += step
            window.scrollTo(0, y)
            if (y >= max) {
              clearInterval(timer)
              window.scrollTo(0, 0)
              setTimeout(resolve, 800)
            }
          }, 120)
        })
      })
      await page.waitForTimeout(1500)

      const outPath = path.join(OUT_DIR, `${site.slug}-preview.jpg`)
      await page.screenshot({
        path: outPath,
        fullPage: true,
        type: "jpeg",
        quality: 82,
      })
      console.log(`  ✓ salvato: ${outPath}`)
    } catch (err) {
      console.error(`  ✗ errore su ${site.slug}:`, err.message)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log("\nDone.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
