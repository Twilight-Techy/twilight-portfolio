/**
 * Captures screenshots of the live deployments for the portfolio.
 *
 * Usage:  node scripts/capture.js
 * Output: public/images/projects/*.png
 *
 * The logins used here are demo/seed accounts on Ibrahim's own deployments:
 *  - Crisp's admin credentials are printed on its own /admin/login page
 *  - Kliniq's seed users come from kliniq-api/scripts/seed_test_data.py
 * No real user's credentials appear in this file.
 */
const { chromium } = require("playwright")
const path = require("path")
const fs = require("fs")

const OUT = path.join(process.cwd(), "public", "images", "projects")
fs.mkdirSync(OUT, { recursive: true })

const VIEWPORT = { width: 1440, height: 900 }

async function shoot(page, name) {
  const file = path.join(OUT, `${name}.png`)
  await page.screenshot({ path: file })
  console.log(`  saved ${name}.png (${Math.round(fs.statSync(file).size / 1024)} KB)`)
}

async function settle(page, ms = 3000) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 20000 })
  } catch {}
  await page.waitForTimeout(ms)
}

async function capture(browser, label, fn) {
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  console.log(`\n== ${label}`)
  try {
    await fn(page)
  } catch (e) {
    console.log(`  !! ${label}: ${e.message.split("\n")[0]}`)
  }
  await ctx.close()
}

;(async () => {
  const browser = await chromium.launch()

  // ---------------- Crisp: the 3D globe is the distinctive view ----------------
  await capture(browser, "Crisp map", async (page) => {
    await page.goto("https://crisp-hazel.vercel.app/", { waitUntil: "domcontentloaded" })
    await settle(page)
    await shoot(page, "crisp-landing")

    for (const route of ["/map", "/crime-map", "/dashboard/map"]) {
      await page.goto(`https://crisp-hazel.vercel.app${route}`, { waitUntil: "domcontentloaded" })
      await page.waitForTimeout(2000)
      const text = await page.innerText("body")
      if (!text.includes("could not be found")) {
        console.log(`  map route: ${route}`)
        await settle(page, 8000) // Cesium needs time to load tiles
        await shoot(page, "crisp-map")
        break
      }
    }
  })

  // ---------------- Crisp: admin dashboard ----------------
  await capture(browser, "Crisp admin", async (page) => {
    await page.goto("https://crisp-hazel.vercel.app/admin/login", { waitUntil: "domcontentloaded" })
    await settle(page)
    await page.fill('input[type="email"]', "admin@crisp.com")
    await page.fill('input[type="password"]', "admin123")
    await page.click('button:has-text("Sign In")')
    await page.waitForTimeout(6000)
    await settle(page)
    console.log(`  landed on: ${page.url()}`)
    await shoot(page, "crisp-admin")
  })

  // ---------------- Kliniq: landing, then a patient triage session ----------------
  await capture(browser, "Kliniq", async (page) => {
    await page.goto("https://kliniq-ui.vercel.app/", { waitUntil: "domcontentloaded" })
    await settle(page)
    await shoot(page, "kliniq-landing")

    await page.goto("https://kliniq-ui.vercel.app/login", { waitUntil: "domcontentloaded" })
    await settle(page)
    const body = await page.innerText("body")
    if (body.includes("could not be found")) {
      console.log("  no /login route; skipping authenticated view")
      return
    }
    await page.fill('input[type="email"]', "dayo@test.com")
    await page.fill('input[type="password"]', "Test1234!")
    await page.click('button[type="submit"]')
    await page.waitForTimeout(9000) // Render cold start
    await settle(page)
    console.log(`  landed on: ${page.url()}`)
    await shoot(page, "kliniq-dashboard")
  })

  await browser.close()
  console.log("\nDone.")
})()
