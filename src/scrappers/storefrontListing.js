const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.thestorefront.com/search?address=New%20York%20City,%20New%20York,%20Vereinigte%20Staaten&zoom=13&latitude=40.74037753703984&longitude=-73.96954494794022&lat_g=40.691343625520894&lat_l=40.78941144855879&lng_g=-74.02734252889763&lng_l=-73.91174736698281&s=score%20DESC&country=United%20States&city=New%20York&page=1');
  const data = [];
  await page.waitFor(5000)
  const listing = await page.$$eval('div.listing-image-header', elements => elements.map((element) => {
      return element.click()
  }))

  const urls = []
  let pages = await browser.pages();
  for (var i = 3; i < pages.length; i++) {
    urls.push(await pages[i].evaluate(() => { return window.location.toString() }));
    await pages[i].close()
  }
  console.log(urls)
  await page.close();
  return data;
};
