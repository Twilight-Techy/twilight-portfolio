const { chromium } = require("playwright")
const path=require("path"); const fs=require("fs")
const OUT=path.join(process.cwd(),"public","images","projects")
const shoot=async(p,n)=>{const f=path.join(OUT,n+".png");await p.screenshot({path:f});console.log(`  saved ${n}.png (${Math.round(fs.statSync(f).size/1024)} KB)`)}
const settle=async(p,ms=3000)=>{try{await p.waitForLoadState("networkidle",{timeout:25000})}catch{};await p.waitForTimeout(ms)}

;(async()=>{
  const b=await chromium.launch()
  for(const [label,email,out] of [["patient","dayo@test.com","kliniq-patient"],["doctor","emeka@test.com","kliniq-clinician"]]){
    const p=await (await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2})).newPage()
    console.log("== "+label)
    try{
      await p.goto("https://kliniq-ui.vercel.app/auth",{waitUntil:"domcontentloaded",timeout:60000})
      await settle(p,3000)
      await p.fill('#email',email)
      await p.fill('#password','Test1234!')
      await p.click('button:has-text("Sign In")')
      await p.waitForTimeout(12000)
      await settle(p,4000)
      console.log("  landed:", p.url().replace("https://kliniq-ui.vercel.app",""))
      await shoot(p,out)
    }catch(e){console.log("  !!",e.message.split("\n")[0])}
  }
  await b.close(); console.log("Done.")
})()
