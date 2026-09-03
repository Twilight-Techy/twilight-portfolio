const { chromium } = require("playwright")
const path = require("path"); const fs = require("fs")
const OUT = path.join(process.cwd(),"public","images","projects")
const V = {width:1440,height:900}
const shoot = async (p,n)=>{const f=path.join(OUT,n+".png");await p.screenshot({path:f});console.log(`  saved ${n}.png (${Math.round(fs.statSync(f).size/1024)} KB)`)}
const settle = async (p,ms=3000)=>{try{await p.waitForLoadState("networkidle",{timeout:20000})}catch{};await p.waitForTimeout(ms)}

;(async()=>{
  const b = await chromium.launch()

  // Crisp: switch the map to its 3D globe view
  {
    const p = await (await b.newContext({viewport:V,deviceScaleFactor:2})).newPage()
    console.log("== Crisp 3D")
    try{
      await p.goto("https://crisp-hazel.vercel.app/map",{waitUntil:"domcontentloaded"})
      await settle(p,5000)
      await p.click('button:has-text("2D (MapLibre)")')
      await p.waitForTimeout(1200)
      const opts = await p.$$eval('[role=option], li, button', e=>e.map(x=>x.innerText.trim()).filter(t=>/3D|Cesium/i.test(t)))
      console.log("  options:", JSON.stringify(opts.slice(0,4)))
      if (opts.length){
        await p.click(`text=${opts[0]}`)
        await p.waitForTimeout(12000)   // Cesium tile load
        await shoot(p,"crisp-map-3d")
      }
    }catch(e){console.log("  !!",e.message.split("\n")[0])}
  }

  // Kliniq: patient triage session
  for (const [who,email,name] of [["patient","dayo@test.com","kliniq-patient"],["clinician","emeka@test.com","kliniq-clinician"]]) {
    const p = await (await b.newContext({viewport:V,deviceScaleFactor:2})).newPage()
    console.log(`== Kliniq ${who}`)
    try{
      await p.goto("https://kliniq-ui.vercel.app/auth",{waitUntil:"domcontentloaded"})
      await settle(p,3000)
      await p.fill('input[type="email"]', email)
      await p.fill('input[type="password"]', "Test1234!")
      await p.click('button[type="submit"]')
      await p.waitForTimeout(15000)     // Render free tier cold start
      await settle(p,4000)
      console.log("  landed:", p.url().replace("https://kliniq-ui.vercel.app",""))
      await shoot(p,name)
    }catch(e){console.log("  !!",e.message.split("\n")[0])}
  }

  await b.close(); console.log("\nDone.")
})()
