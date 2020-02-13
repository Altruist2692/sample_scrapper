const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.gopopup.com/en/search/Europe/');
  const data = [];

  await scrollToBottom(page);
  await page.waitFor(10000);
  await page.waitFor(() => !document.querySelector('body.loading'));

  const listing = await page.evaluate(() => Array.from(document.querySelectorAll('div.search-results .search-box'), (element) => element.href));
  console.log(listing)

  await page.close();
  return data;
};

async function scrollToBottom(page) {
  const distance = 100; // should be less than or equal to window.innerHeight
  const delay = 5000;
  await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
  await page.waitFor(delay);
}
