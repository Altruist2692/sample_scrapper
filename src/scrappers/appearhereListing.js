const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;


exports.run = async (browser) => {
  const page = await browser.newPage();
      await page.goto('https://www.appearhere.co.uk/spaces/search?search_id=ic2ulothh97&page=1&type=space&q=&space_types[]=retail&search_source=search%20results',
  );
  const data = [];
  await scrollToBottom(page);
  await page.waitFor(5000);
  const listing = await page.evaluate(() => Array.from(document.querySelectorAll('a.Bloom__bodyLink_m3'), (element) => element.href));
  console.log("Links: " + listing)
  await page.close();
  return data;
};

async function scrollToBottom(page) {
  const distance = 1000; // should be less than or equal to window.innerHeight
  const delay = 1000;
  while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
    await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
    await page.waitFor(delay);
  }
}
