const { chromium } = require("playwright")
;(async()=>{
  const b = await chromium.launch({headless:false, args:["--use-gl=angle","--use-angle=d3d11","--ignore-gpu-blocklist","--enable-webgl"]})
  const p = await (await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2})).newPage()

  // Kliniq auth form shape
  await p.goto("https://kliniq-ui.vercel.app/auth",{waitUntil:"domcontentloaded"})
  await p.waitForTimeout(4000)
  const inputs = await p.$$eval("input", els=>els.map(e=>({type:e.type,name:e.name,ph:e.placeholder,id:e.id})))
  const btns = await p.$$eval("button", els=>els.map(e=>e.innerText.trim()).filter(Boolean))
  console.log("kliniq inputs:", JSON.stringify(inputs))
  console.log("kliniq buttons:", JSON.stringify(btns.slice(0,10)))
  await b.close()
})()
