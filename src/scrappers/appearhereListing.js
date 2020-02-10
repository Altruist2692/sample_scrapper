const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.appearhere.co.uk/spaces/search?search_id=ic2ulothh97&page=1&type=space&q=&space_types[]=retail&search_source=search%20results',
  );

  const data = [];

  const scrollable_section = '.Search__resultsContainer___1ei9g';
  await page.waitForSelector('.Bloom__track_hw');

  await page.evaluate(selector => {
    const scrollableSection = document.querySelector(selector);
    scrollableSection.scrollTop = scrollableSection.offsetHeight;
  }, scrollable_section);

  const listing = await page.evaluate(() => Array.from(document.querySelectorAll('a.Bloom__bodyLink_m3'), (element) => element.href));
  console.log(listing)
  await page.close();
  return data;
};
