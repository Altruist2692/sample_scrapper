const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.thestorefront.com/search?address=United%20Kingdom&zoom=20&parent_project_type_id=5&latitude=55.378051&longitude=-3.435973&lat_g=47.5554486&lat_l=61.5471111&lng_g=-18.5319589&lng_l=9.5844157&s=score%20DESC&country=United%20Kingdom&city=New%20York&page=1');
  const data = [];
  await page.waitFor(5000)
  const listing = await page.$$eval('div.listing-image-header', elements => elements.map((element) => {
      return element.click()
  }))

  const urls = []
  let pages = await browser.pages();
  for (var i = 2; i < pages.length; i++) {
    urls.push(await pages[i].evaluate(() => { return window.location.toString() }));
    await pages[i].close()
  }
  console.log(urls)
  await page.close();
  return data;
};
