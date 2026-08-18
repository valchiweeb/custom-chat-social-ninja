const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Open the local dashboard or a mock so we don't need a real session
  // But wait, the session ID is real: PsGCudEbvR
  await page.goto('https://socialstream.ninja/index.html?session=PsGCudEbvR');
  
  // Wait a little bit for scripts to load
  await page.waitForTimeout(2000);
  
  // Let's inject a fake featured message by calling the global function!
  // SSN usually exposes something like `highlightMessage(id)` or `showHighlight(msg)`
  // Or we can just read the empty DOM
  const bodyHtml = await page.evaluate(() => {
    // If there is an element with ID 'highlighted-message', let's dump it
    return document.body.innerHTML;
  });
  
  fs.writeFileSync('ssn_dom.html', bodyHtml);
  console.log("Dumped DOM to ssn_dom.html");
  
  await browser.close();
})();
