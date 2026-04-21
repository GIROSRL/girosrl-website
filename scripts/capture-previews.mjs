// Cattura screenshot fullpage dei 3 siti clienti e salva come JPG in public/images/projects/.
// Uso: node scripts/capture-previews.mjs
//
// Dismissa cookie banner comuni prima di catturare. 1440px wide, height = pagina intera.

import { chromium } from "playwright"
import path from "path"
import fs from "fs/promises"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, "..", "public", "images", "projects")
const CONTENT_DIR = path.join(__dirname, "..", "src", "content")

/**
 * Estrae dati profilo Instagram dall'HTML: og:image (avatar) + og:description
 * (followers/following/posts). Scarica l'avatar e salva stats in TS module.
 */
async function extractInstagramMeta(page, handle) {
  const meta = await page.evaluate(() => {
    const get = (name) =>
      document.querySelector(`meta[property='${name}']`)?.getAttribute("content") ||
      document.querySelector(`meta[name='${name}']`)?.getAttribute("content") ||
      null
    return {
      ogImage: get("og:image"),
      ogDescription: get("og:description"),
      ogTitle: get("og:title"),
    }
  })
  // og:description format: "1,234 Followers, 456 Following, 78 Posts - See Instagram..."
  // oppure IT: "1.234 follower, 456 seguiti, 78 post - Guarda..."
  const desc = meta.ogDescription || ""
  // Estrae numeri in ordine: primo = followers, secondo = following, terzo = posts
  const nums = desc.match(/([\d.,]+\s?[KkMm]?)\s*(follower|following|seguiti|seguaci|post)/gi) || []
  const parse = (s) => {
    const m = s.match(/([\d.,]+\s?[KkMm]?)/)
    return m ? m[1].replace(/\s/g, "") : null
  }
  const followers = nums.find((s) => /follower|seguaci/i.test(s))
  const following = nums.find((s) => /following|seguiti/i.test(s))
  const posts = nums.find((s) => /post/i.test(s))

  return {
    handle,
    displayName: (meta.ogTitle || "")
      .replace(/\s*\([^)]*\)\s*•\s*.*$/i, "") // rimuove "(@handle) • ..."
      .trim(),
    avatarUrl: meta.ogImage,
    followers: followers ? parse(followers) : null,
    following: following ? parse(following) : null,
    posts: posts ? parse(posts) : null,
  }
}

async function downloadAvatar(url, outPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15" },
  })
  if (!res.ok) throw new Error(`avatar fetch ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await fs.writeFile(outPath, buf)
}

const SITES = [
  {
    slug: "helme-instagram",
    url: "https://www.instagram.com/helmestore/",
    // Instagram ha un modal di login che appare dopo ~2-3s; dismissalo
    cookieSelectors: [
      'button:has-text("Only allow essential cookies")',
      'button:has-text("Consenti solo cookie essenziali")',
      'button:has-text("Decline optional cookies")',
      'button:has-text("Rifiuta cookie opzionali")',
      'button[aria-label*="Close" i]',
      'svg[aria-label="Chiudi"]',
      'svg[aria-label="Close"]',
    ],
    waitExtra: 3500,
    // Clip al grid dei post (primi 6 post visibili) invece del fullpage
    clipHeight: 1200,
    clipOffsetY: 400,
  },
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
      await page.waitForTimeout(site.waitExtra ?? 2500)

      const dismissed = await dismissCookies(page, site.cookieSelectors)
      console.log(`  cookie dismissed: ${dismissed}`)

      // Per Instagram: estrai prima meta profilo (avatar + follower + post),
      // poi dismetti il modal login per screenshot del grid.
      if (site.url.includes("instagram.com")) {
        try {
          const handle = site.url.match(/instagram\.com\/([^/?]+)/)?.[1] ?? "helmestore"
          const meta = await extractInstagramMeta(page, handle)
          console.log(`  IG meta:`, meta)

          // Scarica avatar
          if (meta.avatarUrl) {
            const avatarPath = path.join(OUT_DIR, `${handle}-avatar.jpg`)
            await downloadAvatar(meta.avatarUrl, avatarPath)
            console.log(`  ✓ avatar salvato: ${avatarPath}`)
          }

          // Scrivi stats in TS module
          const statsPath = path.join(CONTENT_DIR, "helme-instagram.ts")
          const tsContent = `// AUTO-GENERATO da scripts/capture-previews.mjs — non modificare a mano.
// Per aggiornare: \`node scripts/capture-previews.mjs\`.
// Cattura del ${new Date().toISOString()}.

export const helmeInstagram = {
  handle: ${JSON.stringify(meta.handle)},
  displayName: ${JSON.stringify(meta.displayName || "HELMÈ")},
  avatar: ${JSON.stringify(`/images/projects/${meta.handle}-avatar.jpg`)},
  posts: ${JSON.stringify(meta.posts || "—")},
  followers: ${JSON.stringify(meta.followers || "—")},
  following: ${JSON.stringify(meta.following || "—")},
} as const
`
          await fs.writeFile(statsPath, tsContent, "utf8")
          console.log(`  ✓ stats salvate: ${statsPath}`)
        } catch (err) {
          console.error(`  ✗ errore meta IG:`, err.message)
        }

        await page.keyboard.press("Escape").catch(() => {})
        await page.waitForTimeout(300)
        await page.addStyleTag({
          content: `
            [role="dialog"], [role="presentation"]:has([role="dialog"]),
            div[data-visualcompletion="loading-state"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            html, body {
              overflow: auto !important;
              position: static !important;
              height: auto !important;
            }
          `,
        })
        // Rimuovi anche qualsiasi overlay position: fixed che dima i post (backdrop)
        await page.evaluate(() => {
          const mainRect = document.querySelector("main")?.getBoundingClientRect()
          document.querySelectorAll("*").forEach((el) => {
            const style = getComputedStyle(el)
            if (style.position === "fixed" || style.position === "sticky") {
              // Salva solo la main nav/header, rimuovi il resto (modal, backdrop, popup cookie)
              if (!(mainRect && el.contains(document.querySelector("main")))) {
                ;(el).style.display = "none"
              }
            }
          })
          // Rimuovi eventuale filter/brightness su body/main che potrebbe dimare
          document.body.style.filter = "none"
          const main = document.querySelector("main")
          if (main) main.style.filter = "none"
        })
        await page.waitForTimeout(800)
      }

      // Wait for fonts/images to settle
      await page.waitForTimeout(2500)
      // Scroll un po' per triggerare lazy-load delle immagini della griglia
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

      // Clip option: cattura solo una regione (utile per grid Instagram)
      if (site.clipHeight) {
        const offsetY = site.clipOffsetY ?? 0
        await page.screenshot({
          path: outPath,
          type: "jpeg",
          quality: 82,
          clip: { x: 0, y: offsetY, width: 1440, height: site.clipHeight },
        })
      } else {
        await page.screenshot({
          path: outPath,
          fullPage: true,
          type: "jpeg",
          quality: 82,
        })
      }
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
