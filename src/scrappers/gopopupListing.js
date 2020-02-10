const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.gopopup.com/en/search/barcelona/#location=barcelona&sw_lat=40.728602&sw_lng=0.619022&ne_lat=42.120709&ne_lng=3.718082&searchbymap=1&keywords=&area_max=&area_min=&capacity_max=&capacity_min=&application=0&page=0&orderby=&tipusespai=&facility=&checkin=&checkout=&checkin_hour=0&checkout_hour=0');
  const data = [];
  await page.evaluate(() => {debugger;});
  const listing = await page.evaluate(() => Array.from(document.querySelectorAll('div.search-results .search-box'), (element) => element.href));
  console.log(listing)
  await page.close();
  return data;
};
