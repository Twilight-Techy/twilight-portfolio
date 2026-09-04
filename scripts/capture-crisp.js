const { chromium } = require("playwright")
const path=require("path"); const fs=require("fs")
const OUT=path.join(process.cwd(),"public","images","projects")
const shoot=async(p,n)=>{const f=path.join(OUT,n+".png");await p.screenshot({path:f});console.log(`  saved ${n}.png (${Math.round(fs.statSync(f).size/1024)} KB)`)}
;(async()=>{
  const b=await chromium.launch({headless:false,args:["--use-gl=angle","--use-angle=d3d11","--ignore-gpu-blocklist"]})
  const p=await (await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2})).newPage()

  await p.goto("https://crisp-hazel.vercel.app/map",{waitUntil:"domcontentloaded",timeout:60000})
  await p.waitForTimeout(25000)
  await shoot(p,"crisp-map")

  try{
    await p.click('button:has-text("2D (MapLibre)")'); await p.waitForTimeout(1200)
    await p.click('text=3D (Cesium)')
    await p.waitForTimeout(30000)
    await shoot(p,"crisp-map-3d")
  }catch(e){console.log("  3D:",e.message.split("\n")[0])}

  await b.close(); console.log("Done.")
})()
