const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

// [
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/33988-white-box-showroom-in-chelsea',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/17656-spacious-gallery-in-arty-chelsea',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/26705-lower-east-side-gallery-space',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/34183-amazing-retail-and-gallery-space-i',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/32081-beautiful-white-box-in-tribeca',
//   'https://www.thestorefront.com/spaces/united-states/new-york/27512-luminous-soho-loft-showroom',
//   'https://www.thestorefront.com/spaces/united-states/new-york/brooklyn/33620-galleryevent-space-in-bushwick-bro',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/31255-chic-multi-purpose-venue-in-nomad',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/33674-charming-event-venue-in-chelsea',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/17638-lovely-studio-space-in-west-chelse',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35216-modern-loft-in-soho',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/33623-white-box-or-furnished-space-in-th',
//   'https://www.thestorefront.com/listings/ref/35493',
//   'https://www.thestorefront.com/listings/ref/35532',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35315-white-box-showroom-in-nomad',
//   'https://www.thestorefront.com/listings/ref/35467',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/31709-minimalist-pop-up-in-nomad',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35316-boutique-space-on-broome-street',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35284-white-box-spacious-showroom-in-soh',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35455-19th-century-ground-floor-galleryr',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35256-hudson-rooftop-event-sapce',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35252-spacious-industrial-pop-up-space-i',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/34170-vanilla-box-on-greenwich-street',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35241-large-industrial-chic-event-space-',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/29213-amazing-pop-up-space-on-broadway',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35437-prime-and-spacious-tribeca-art-gal',
//   'https://www.thestorefront.com/listings/ref/35441',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/28491-showroom-space-in-soho',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/27911-airy-midtown-loft',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35431-beautiful-large-loft-in-the-heart-',
//   'https://www.thestorefront.com/spaces/united-states/new-york/brooklyn/32393-white-box-studio-in-williamsburg',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/31636-compact-gallery-in-west-village',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35393-white-box-gallery-in-les',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35416-av-equipped-white-blank-space-in-t',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/35414-herald-square-amenity-space',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/34813-gallery-space-in-the-les',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/17694-lovely-pop-up-boutique-in-nolita',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/19758-pop-up-gallery-venue-in-chelsea',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/17609-stunning-pop-up-store-in-soho',
//   'https://www.thestorefront.com/spaces/united-states/new-york/new-york/30175-vintage-tugboat'
// ]

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.thestorefront.com/spaces/united-states/new-york/new-york/28331-boutique-in-trendy-nolita',
  );

  await Promise.all([
    page.waitForSelector('.title'),
  ]);

  const data = {};

  const title = await page.$eval('h1.title', (element) => element.textContent);
  data['title'] = title;

  const pricingValue = await page.$eval('span.pricing-value', (element) => element.textContent);
  data['pricingValue'] = pricingValue;

  const location = await page.$eval('h2.location', (element) => element.textContent);
  data['location'] = location;

  const infoTitle= await page.evaluate(() => Array.from(document.querySelectorAll('div.listing-details-panel .listing-information .title'), (element) => element.textContent));
  const infoValue = await page.evaluate(() => Array.from(document.querySelectorAll('div.listing-details-panel .listing-information .information'), (element) => element.textContent));
  const info = {};
  for (let i = 0; i < infoTitle.length; i++) {
    info[infoTitle[i]] = infoValue[i];
  }
  data['info'] = info;

  const description = await page.$eval('div.listing-description', (element) => element.textContent);
  data['description'] = description;

  const spaceUsage= await page.evaluate(() => Array.from(document.querySelectorAll('.listing-details-panel.project_types .parent-project-type'), (element) => element.textContent));
  data['spaceUsage'] = spaceUsage;

  const amenities = await page.evaluate(() => Array.from(document.querySelectorAll('.listing-information .listing-features'), (element) => element.textContent));
  data['amenities'] = amenities;

  const lastUpdatedAt = await page.$eval('span.last-updated-date', (element) => element.textContent);
  data['lastUpdatedAt'] = lastUpdatedAt;

  const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('div.sf-carousel.ng-isolate-scope .image'), (element) => {
 return getComputedStyle(element).backgroundImage.replace('url\(', '').replace(/\"/g, '').replace('\)', '');
}));
  data['imgs'] = imgs;

  console.log(data)
  // Sample database connection and retrival. Same way can do rest of the operations
  (async () => {
      let connection, statement, rows;
      connection = new Database('database-js-postgres://postgres:root@localhost:5432/popup_dev');

      try {
          statement = await connection.prepareStatement('SELECT * FROM scrapped_listings');
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
  // To setup AWS Lambda schedule - https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html
};
