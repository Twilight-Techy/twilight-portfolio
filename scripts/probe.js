const { chromium } = require("playwright")
;(async () => {
  const b = await chromium.launch()
  const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage()
  for (const u of ["https://crisp-hazel.vercel.app/login","https://crisp-hazel.vercel.app/admin/login"]) {
    try {
      await p.goto(u, {waitUntil:"domcontentloaded", timeout:30000})
      await p.waitForTimeout(2500)
      const t = await p.innerText("body")
      console.log(`--- ${u} (${p.url()}) ---`)
      console.log(t.slice(0,700))
    } catch(e){ console.log(`--- ${u} FAILED: ${e.message.split("\n")[0]}`) }
  }
  await b.close()
})()
