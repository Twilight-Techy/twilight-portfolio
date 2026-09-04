/**
 * Captures Ruby Smart Notes screenshots using an email + password login.
 *
 * Ruby authenticates through Neon Auth, so set a password for your account in
 * the Neon console (Auth > Users) or via the app's own password flow first.
 *
 * Then run with the credentials in the environment. They are read here and
 * never written to disk or committed:
 *
 *   RUBY_EMAIL=you@example.com RUBY_PASSWORD='...' node scripts/capture-ruby.js
 *
 * On Windows PowerShell:
 *   $env:RUBY_EMAIL="you@example.com"; $env:RUBY_PASSWORD="..."; node scripts/capture-ruby.js
 *
 * Output: public/images/projects/ruby-*.png
 */
const { chromium } = require("playwright")
const path = require("path")
const fs = require("fs")

const EMAIL = process.env.RUBY_EMAIL
const PASSWORD = process.env.RUBY_PASSWORD
const BASE = "https://ruby-puce.vercel.app"
const OUT = path.join(process.cwd(), "public", "images", "projects")

if (!EMAIL || !PASSWORD) {
  console.error(
    "RUBY_EMAIL and RUBY_PASSWORD must be set.\n" +
      "Set a password for the account in Neon Auth first, then pass both as\n" +
      "environment variables. Nothing is stored by this script.",
  )
  process.exit(1)
}

const shoot = async (page, name) => {
  fs.mkdirSync(OUT, { recursive: true })
  const file = path.join(OUT, `${name}.png`)
  await page.screenshot({ path: file })
  console.log(`  saved ${name}.png (${Math.round(fs.statSync(file).size / 1024)} KB)`)
}

const settle = async (page, ms = 3500) => {
  try {
    await page.waitForLoadState("networkidle", { timeout: 25000 })
  } catch {}
  await page.waitForTimeout(ms)
}

;(async () => {
  const browser = await chromium.launch()
  const page = await (await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })).newPage()

  try {
    await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded", timeout: 60000 })
    await settle(page)

    await page.fill('input[type="email"]', EMAIL)
    await page.fill('input[type="password"]', PASSWORD)
    await page.click('button:has-text("Sign In")')
    await page.waitForTimeout(10000)
    await settle(page)

    if (page.url().includes("/login")) {
      console.error("  still on /login - the credentials were rejected.")
      await browser.close()
      process.exit(1)
    }
    console.log(`  signed in, landed on ${page.url().replace(BASE, "")}`)

    // 1. the dashboard
    await page.goto(BASE, { waitUntil: "domcontentloaded" })
    await settle(page)
    await shoot(page, "ruby-dashboard")

    // 2. a note workspace: summary, key concepts and the original side by side
    const noteHref = await page.$$eval('a[href^="/notes/"]', (as) => {
      const real = as.map((a) => a.getAttribute("href")).filter((h) => h && h !== "/notes/new")
      return real[0] || null
    })
    if (noteHref) {
      await page.goto(BASE + noteHref, { waitUntil: "domcontentloaded" })
      await settle(page, 6000)
      await shoot(page, "ruby-note")
    } else {
      console.log("  no note links found on the dashboard")
    }

    // 3. quizzes, if the route exists
    await page.goto(`${BASE}/quizzes`, { waitUntil: "domcontentloaded" })
    await settle(page)
    if (!(await page.innerText("body")).includes("could not be found")) {
      await shoot(page, "ruby-quizzes")
    }
  } catch (e) {
    console.error("  failed:", e.message.split("\n")[0])
  }

  await browser.close()
  console.log("Done.")
})()
