const { chromium } = require("playwright")
;(async () => {
  const b = await chromium.launch()
  const ctx = await b.newContext({viewport:{width:1440,height:900}})
  const p = await ctx.newPage()

  // Crisp: what are the map-mode options?
  await p.goto("https://crisp-hazel.vercel.app/map", {waitUntil:"domcontentloaded"})
  await p.waitForTimeout(4000)
  const selects = await p.$$eval("select, [role=combobox], button", els =>
    els.map(e => (e.innerText||e.getAttribute('aria-label')||'').trim()).filter(t=>/2D|3D|MapLibre|Cesium/i.test(t)))
  console.log("crisp map controls:", JSON.stringify(selects.slice(0,6)))

  // Kliniq: find the auth route
  for (const r of ["/login","/signin","/auth/login","/auth","/dashboard","/patient"]) {
    try {
      await p.goto("https://kliniq-ui.vercel.app"+r, {waitUntil:"domcontentloaded", timeout:25000})
      await p.waitForTimeout(1800)
      const t = (await p.innerText("body")).replace(/\s+/g,' ').slice(0,120)
      console.log(`kliniq ${r} -> ${p.url().replace('https://kliniq-ui.vercel.app','')} :: ${t}`)
    } catch(e){ console.log(`kliniq ${r} FAILED`) }
  }
  await b.close()
})()
