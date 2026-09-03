const { chromium } = require("playwright")
const path=require("path"); const fs=require("fs")
const OUT=path.join(process.cwd(),"public","images","projects")
const V={width:1440,height:900}
const shoot=async(p,n)=>{const f=path.join(OUT,n+".png");await p.screenshot({path:f});console.log(`  saved ${n}.png (${Math.round(fs.statSync(f).size/1024)} KB)`)}
const settle=async(p,ms=3000)=>{try{await p.waitForLoadState("networkidle",{timeout:20000})}catch{};await p.waitForTimeout(ms)}

;(async()=>{
  const b=await chromium.launch({headless:false,args:["--use-gl=angle","--use-angle=d3d11","--ignore-gpu-blocklist","--enable-webgl"]})

  // Crisp 3D globe (needs real WebGL)
  {
    const p=await (await b.newContext({viewport:V,deviceScaleFactor:2})).newPage()
    console.log("== Crisp 3D")
    try{
      await p.goto("https://crisp-hazel.vercel.app/map",{waitUntil:"domcontentloaded"})
      await settle(p,6000)
      await p.click('button:has-text("2D (MapLibre)")'); await p.waitForTimeout(1200)
      await p.click('text=3D (Cesium)')
      await p.waitForTimeout(20000)
      await shoot(p,"crisp-map-3d")
    }catch(e){console.log("  !!",e.message.split("\n")[0])}
  }

  // Kliniq authenticated views
  for(const [label,email,out] of [["patient","dayo@test.com","kliniq-patient"],["doctor","emeka@test.com","kliniq-clinician"]]){
    const p=await (await b.newContext({viewport:V,deviceScaleFactor:2})).newPage()
    console.log("== Kliniq "+label)
    try{
      await p.goto("https://kliniq-ui.vercel.app/auth",{waitUntil:"domcontentloaded"})
      await settle(p,3500)
      await p.fill('#email',email)
      await p.fill('#password',"Test1234!")
      await p.click('button:has-text("Sign In")')
      await p.waitForTimeout(20000)   // Render cold start
      await settle(p,5000)
      console.log("  landed:",p.url().replace("https://kliniq-ui.vercel.app",""))
      await shoot(p,out)
    }catch(e){console.log("  !!",e.message.split("\n")[0])}
  }
  await b.close(); console.log("\nDone.")
})()
