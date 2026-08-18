const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://socialstream.ninja/index.html?session=PsGCudEbvR');
  
  // Wait a bit
  await page.waitForTimeout(2000);
  
  // The featured chat is usually inside some container
  const html = await page.content();
  console.log("HTML length:", html.length);
  
  // Let's inject a fake featured message to see the DOM structure
  // SSN usually exposes functions like `showChatMessage` or `sendDataP2P`
  // We can just dump the innerHTML of body
  const bodyHtml = await page.evaluate(() => document.body.innerHTML);
  console.log(bodyHtml.slice(0, 1000));
  
  await browser.close();
})();
