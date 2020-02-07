const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.thestorefront.com/spaces/united-states/new-york/new-york/28331-boutique-in-trendy-nolita',
  );

  await Promise.all([
    page.waitForSelector('.title'),
  ]);

  const data = {}

  const title = await page.$eval('h1.title', element => element.textContent);
  data["title"] = title

  const pricingValue = await page.$eval('span.pricing-value', element => element.textContent);
  data["pricingValue"] = pricingValue

  const location = await page.$eval('h2.location', element => element.textContent);
  data["location"] = location

  const infoTitle= await page.evaluate(() => Array.from(document.querySelectorAll('div.listing-details-panel .listing-information .title'), element => element.textContent));
  const infoValue = await page.evaluate(() => Array.from(document.querySelectorAll('div.listing-details-panel .listing-information .information'), element => element.textContent));
  const info = {}
  for (var i = 0; i < infoTitle.length; i++) {
    info[infoTitle[i]] = infoValue[i]
  }
  data["info"] = info

  const description = await page.$eval('div.listing-description', element => element.textContent);
  data["description"] = description

  const spaceUsage= await page.evaluate(() => Array.from(document.querySelectorAll('.listing-details-panel.project_types .parent-project-type'), element => element.textContent));
  data["spaceUsage"] = spaceUsage

  const amenities = await page.evaluate(() => Array.from(document.querySelectorAll('.listing-information .listing-features'), element => element.textContent));
  data["amenities"] = amenities

  const lastUpdatedAt = await page.$eval('span.last-updated-date', element => element.textContent);
  data["lastUpdatedAt"] = lastUpdatedAt

  const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('div.sf-carousel.ng-isolate-scope .image'), (element) => { return getComputedStyle(element).backgroundImage.replace('url\(', '').replace(/\"/g, '').replace('\)', '') }));
  data["imgs"] = imgs

  console.log(data)
  // Sample database connection and retrival. Same way can do rest of the operations
  (async () => {
      let connection, statement, rows;
      connection = new Database('database-js-postgres://postgres:root@localhost:5432/popup_dev');

      try {
          statement = await connection.prepareStatement("SELECT * FROM scrapped_listings");
          rows = await statement.query();
          console.log(rows);
      } catch (error) {
          console.log(error);
      } finally {
          await connection.close();
      }
  })();

  await page.close();
  return 'done';
  //To setup AWS Lambda schedule - https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html
};
