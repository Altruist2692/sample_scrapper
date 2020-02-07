const setup = require('../starter-kit/setup');
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
  await page.goto('https://www.gopopup.com/en/berlin-berliner-innenstadt/pop-up/xdzph/',
  );

  await Promise.all([
    page.waitForSelector('.place-header-bar-left'),
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
  const title = await page.$eval('div.place-header-bar-left h1', (element) => element.textContent);
  console.log(title);

  const pricingValue = await page.$eval('div.place-header-bar-right span.preu', (element) => element.textContent);
  console.log('Pricing Value: ' + pricingValue);


  const description = await page.$eval('div#espacio', (element) => element.textContent);
  console.log('description: ' + description);

  // const amenities = await page.evaluate(() => Array.from(document.querySelectorAll(''), element => element));
  const searchValue = await page.$$eval('p.title_apartat', (els) => els.length);
  console.log(searchValue);
  // await page.evaluate(() => {debugger;});
  // for (var i = 0; i < amenities.length; i++) {
  //   console.log(amenities[i].textContent)
  // }
  // const amenities = await page.evaluate(() => Array.from(document.querySelectorAll('.listing-information .listing-features'), element => element.textContent));
  // console.log('' + amenities)
  // const location = await page.$eval('h2.location', element => element.textContent);
  // console.log('Location' + location)


  // const infoTitle= await page.evaluate(() => Array.from(document.querySelectorAll('div.listing-details-panel .listing-information .title'), element => element.textContent));
  // const infoValue = await page.evaluate(() => Array.from(document.querySelectorAll('div.listing-details-panel .listing-information .information'), element => element.textContent));
  // const info = {}
  // for (var i = 0; i < infoTitle.length; i++) {
  //   info[infoTitle[i]] = infoValue[i]
  // }
  // console.log(info)
  //
  //
  // const spaceUsage= await page.evaluate(() => Array.from(document.querySelectorAll('.listing-details-panel.project_types .parent-project-type'), element => element.textContent));
  // console.log('spaceUsage: ' + spaceUsage)
  //
  //
  // const lastUpdatedAt = await page.$eval('span.last-updated-date', element => element.textContent);
  // console.log('lastUpdatedAt: ' + lastUpdatedAt)
  //
  // const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('div.sf-carousel.ng-isolate-scope .image'), (element) => { return getComputedStyle(element).backgroundImage.replace('url\(', '').replace(/\"/g, '').replace('\)', '') }));
  // console.log(imgs)
  //
  // // Sample database connection and retrival. Same way can do rest of the operations
  // (async () => {
  //     let connection, statement, rows;
  //     connection = new Database('database-js-postgres://postgres:root@localhost:5432/popup_dev');
  //
  //     try {
  //         statement = await connection.prepareStatement("SELECT * FROM scrapped_listings");
  //         rows = await statement.query();
  //         console.log(rows);
  //     } catch (error) {
  //         console.log(error);
  //     } finally {
  //         await connection.close();
  //     }
  // })();

  await page.close();
  return 'done';
  // To setup AWS Lambda schedule - https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html
};
