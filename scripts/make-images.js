/**
 * Generates cover images for projects without a live deployment, and for the
 * blog posts. Each card shows something real from the work rather than stock
 * photography.
 *
 * Usage:  node scripts/make-images.js
 * Output: public/images/projects/*.png  and  public/images/blog/*.png
 */
const { chromium } = require("playwright")
const path = require("path")
const fs = require("fs")

const W = 1200
const H = 630

const shell = (accent, body) => `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{
    width:${W}px;height:${H}px;overflow:hidden;
    background:#0a0d11;
    color:#e8ecf1;
    font-family:Inter,system-ui,sans-serif;
    position:relative;
  }
  /* faint grid, so the ground is not a flat block */
  body::before{
    content:"";position:absolute;inset:0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,.028) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,.028) 1px, transparent 1px);
    background-size:48px 48px;
  }
  body::after{
    content:"";position:absolute;inset:0;
    background:radial-gradient(900px 420px at 78% 8%, ${accent}22, transparent 70%);
  }
  .wrap{position:relative;z-index:1;height:100%;padding:56px 64px;display:flex;flex-direction:column}
  .eyebrow{
    font-family:"JetBrains Mono",monospace;font-size:14px;letter-spacing:.22em;
    text-transform:uppercase;color:${accent};margin-bottom:20px;
  }
  h1{font-size:52px;line-height:1.1;font-weight:700;letter-spacing:-.02em;max-width:17ch}
  h1 em{font-style:normal;color:${accent}}
  .spacer{flex:1}
  .foot{
    font-family:"JetBrains Mono",monospace;font-size:15px;color:#7d8894;
    display:flex;gap:10px;flex-wrap:wrap;align-items:center;
  }
  .foot span{color:#3c454e}
  .code{
    background:#070a0d;border:1px solid #1c242c;border-radius:10px;
    font-family:"JetBrains Mono",monospace;font-size:16px;line-height:1.65;
    padding:20px 24px;color:#aeb9c4;white-space:pre;overflow:hidden;
  }
  .code .k{color:${accent}}
  .code .s{color:#c3a86a}
  .code .c{color:#5a646f}
  .flow{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
  .chip{
    border:1px solid #232c35;background:#0e141a;border-radius:9px;
    padding:14px 18px;font-family:"JetBrains Mono",monospace;font-size:15px;color:#cdd6df;
  }
  .chip b{display:block;color:${accent};font-size:12px;letter-spacing:.14em;margin-bottom:6px;font-weight:500}
  .arrow{color:#3c454e;font-size:20px}
  .trace{
    border-left:3px solid ${accent};padding:6px 0 6px 20px;white-space:pre;
    font-family:"JetBrains Mono",monospace;font-size:17px;line-height:1.9;color:#9fabb6;
  }
  .ask{margin-top:18px;font-size:22px;color:#e8ecf1}
  .ask b{color:${accent};font-weight:600}
  .box{
    border:1px dashed #2c353f;border-radius:12px;padding:18px 20px;
  }
</style></head><body><div class="wrap">${body}</div></body></html>`

const cards = [
  // ---------- projects ----------
  {
    dir: "projects",
    name: "ev-range-estimation",
    accent: "#4ea1ff",
    body: `
      <div class="eyebrow">Edge AI</div>
      <h1>An LSTM that fits in <em>120 KB</em></h1>
      <div class="spacer"></div>
      <div class="code"><span class="c"># the representative dataset is what makes INT8 usable</span>
converter.optimizations = [tf.lite.<span class="k">Optimize</span>.DEFAULT]
converter.representative_dataset = representative_data_gen
converter.target_spec.supported_ops = [<span class="k">TFLITE_BUILTINS_INT8</span>]</div>
      <div class="spacer"></div>
      <div class="foot">TensorFlow <span>·</span> KerasTuner <span>·</span> TFLite Micro <span>·</span> ESP32</div>`,
  },
  {
    dir: "projects",
    name: "attention-malaria-tb-screening",
    accent: "#4ad6a8",
    body: `
      <div class="eyebrow">Deep Learning</div>
      <h1>Attention, five ways, <em>one shared builder</em></h1>
      <div class="spacer"></div>
      <div class="flow">
        <div class="chip"><b>INPUT</b>224 × 224 × 3</div>
        <div class="arrow">→</div>
        <div class="chip"><b>CHANNEL ATTN</b>avg + max, ratio 8</div>
        <div class="arrow">→</div>
        <div class="chip"><b>SPATIAL ATTN</b>7 × 7 conv</div>
        <div class="arrow">→</div>
        <div class="chip"><b>HEAD</b>2 classes</div>
      </div>
      <div class="spacer"></div>
      <div class="foot">ResNet50 <span>·</span> VGG16 <span>·</span> MobileNetV2 <span>·</span> DenseNet121 <span>·</span> Custom CNN</div>`,
  },
  {
    dir: "projects",
    name: "skyla",
    accent: "#b08cff",
    body: `
      <div class="eyebrow">In development</div>
      <h1>Agents with a <em>boundary</em></h1>
      <div class="spacer"></div>
      <div class="flow">
        <div class="chip"><b>AGENT</b>reminders</div>
        <div class="chip"><b>AGENT</b>monitoring</div>
        <div class="chip"><b>AGENT</b>workflows</div>
      </div>
      <div style="margin:18px 0 16px;font-family:'JetBrains Mono',monospace;font-size:15px;color:#5a646f">
        ─────────  sandboxed execution  ─────────
      </div>
      <div class="chip" style="align-self:flex-start"><b>CORE BACKEND</b>no direct filesystem access</div>
      <div class="spacer"></div>
      <div class="foot">Long-running tasks <span>·</span> Tool calling <span>·</span> Persistent context</div>`,
  },

  // ---------- blog ----------
  {
    dir: "blog",
    name: "tool-calling-on-a-model-that-cannot-do-it",
    accent: "#5ec8d8",
    body: `
      <div class="eyebrow">AI Systems</div>
      <h1>Giving a model tools it <em>doesn't support</em></h1>
      <div class="spacer"></div>
      <div class="code">&lt;<span class="k">TOOL_CALL</span>&gt;
{ <span class="s">"tool"</span>: <span class="s">"create_triage"</span>,
  <span class="s">"parameters"</span>: { <span class="s">"urgency_level"</span>: <span class="s">"high"</span> } }
&lt;/<span class="k">TOOL_CALL</span>&gt;</div>
      <div class="spacer"></div>
      <div class="foot">N-ATLaS <span>·</span> vLLM <span>·</span> Modal <span>·</span> FastAPI</div>`,
  },
  {
    dir: "blog",
    name: "fitting-an-lstm-into-120kb",
    accent: "#4ea1ff",
    body: `
      <div class="eyebrow">Edge AI</div>
      <h1>Fitting an LSTM into <em>120 KB</em></h1>
      <div class="spacer"></div>
      <div class="flow">
        <div class="chip"><b>WINDOW</b>60 s × 10 features</div>
        <div class="arrow">→</div>
        <div class="chip"><b>QUANTIZE</b>float32 → int8</div>
        <div class="arrow">→</div>
        <div class="chip"><b>ARENA</b>120 KB on an ESP32</div>
      </div>
      <div class="spacer"></div>
      <div class="foot">The memory budget is the whole engineering problem</div>`,
  },
  {
    dir: "blog",
    name: "why-my-agent-asks-before-it-acts",
    accent: "#7aa2ff",
    body: `
      <div class="eyebrow">AI Agents</div>
      <h1>Why my agent <em>asks</em> before it acts</h1>
      <div class="spacer"></div>
      <div class="trace">• I observed the temperature is 28°C in the Studio.
• The threshold for cooling is set to 26°C.
• Therefore, I suggest turning on the fan.</div>
      <div class="ask">→ <b>"Want me to switch on the Studio fan?"</b></div>
      <div class="spacer"></div>
      <div class="foot">Nothing physical happens until the user says yes</div>`,
  },
]

;(async () => {
  const browser = await chromium.launch()
  const page = await (await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
  })).newPage()

  for (const card of cards) {
    const out = path.join(process.cwd(), "public", "images", card.dir)
    fs.mkdirSync(out, { recursive: true })

    await page.setContent(shell(card.accent, card.body), { waitUntil: "load" })
    try {
      await page.evaluate(() => document.fonts.ready)
    } catch {}
    await page.waitForTimeout(700)

    const file = path.join(out, `${card.name}.png`)
    await page.screenshot({ path: file })
    console.log(`  ${card.dir}/${card.name}.png (${Math.round(fs.statSync(file).size / 1024)} KB)`)
  }

  await browser.close()
  console.log("\nDone.")
})()
