const setup = require('./starter-kit/setup');
const Database = require('database-js').Connection;

exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  try {
    const result = await exports.run(browser);
    callback(null, result);
  } catch (e) {
    callback(e);
  }
};

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.thestorefront.com/spaces/united-states/new-york/new-york/28331-boutique-in-trendy-nolita',
  );

  await Promise.all([
    page.waitForSelector('.title'),
  ]);

/* screenshot
  await page.screenshot({path: '/tmp/screenshot.png'});
  const aws = require('aws-sdk');
  const s3 = new aws.S3({apiVersion: '2006-03-01'});
  const fs = require('fs');
  const screenshot = await new Promise((resolve, reject) => {
    fs.readFile('/tmp/screenshot.png', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
  await s3.putObject({
    Bucket: '<bucket name>',
    Key: 'screenshot.png',
    Body: screenshot,
  }).promise();
*/
  const title = await page.$eval('h1.title', element => element.textContent);
  console.log(title)

  const pricingValue = await page.$eval('span.pricing-value', element => element.textContent);
  console.log('Pricing Value: ' + pricingValue)

  const location = await page.$eval('h2.location', element => element.textContent);
  console.log('Location' + location)

  const infoTitle= await page.evaluate(() => Array.from(document.querySelectorAll('div.listing-details-panel .listing-information .title'), element => element.textContent));
  const infoValue = await page.evaluate(() => Array.from(document.querySelectorAll('div.listing-details-panel .listing-information .information'), element => element.textContent));
  const info = {}
  for (var i = 0; i < infoTitle.length; i++) {
    info[infoTitle[i]] = infoValue[i]
  }
  console.log(info)

  const description = await page.$eval('div.listing-description', element => element.textContent);
  console.log('description: ' + description)

  const spaceUsage= await page.evaluate(() => Array.from(document.querySelectorAll('.listing-details-panel.project_types .parent-project-type'), element => element.textContent));
  console.log('spaceUsage: ' + spaceUsage)

  const amenities = await page.evaluate(() => Array.from(document.querySelectorAll('.listing-information .listing-features'), element => element.textContent));
  console.log('' + amenities)

  const lastUpdatedAt = await page.$eval('span.last-updated-date', element => element.textContent);
  console.log('lastUpdatedAt: ' + lastUpdatedAt)

  const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('div.sf-carousel.ng-isolate-scope .image'), (element) => { return getComputedStyle(element).backgroundImage.replace('url\(', '').replace(/\"/g, '').replace('\)', '') }));
  console.log(imgs)

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
};
