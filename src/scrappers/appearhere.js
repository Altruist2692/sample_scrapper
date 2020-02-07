const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.appearhere.co.uk/spaces/columbia-road-shoreditch-the-little-black-boutique',
  );

  await Promise.all([
    page.waitForSelector('h1.Header__name___3exMn'),
  ]);

  const data = {};

  const title = await page.$eval('h1.Header__name___3exMn', (element) => element.textContent);
  data['title'] = title;

  const pricingValue = await page.$eval('div.BookingPanelHeader__price___3gdRD', (element) => element.textContent);
  data['pricingValue'] = pricingValue;


  const location = await page.$eval('span.Header__address___EW0NE', (element) => element.textContent);
  data['location'] = location;

  const spaceSize = await page.$eval('[data-testid="space-floor-size"]', (element) => element.textContent);
  data['spaceSize'] = spaceSize;

  const allAmenities = await page.evaluate(() => Array.from(document.querySelectorAll('div.Amenity__root___znqlt div'), (element) => element.textContent));
  const unavailAmenities = await page.evaluate(() => Array.from(document.querySelectorAll('div.Amenity__root___znqlt.Amenity__unavailable___3SoKL'), (element) => element.textContent));
  const actualAmenities = allAmenities.filter((n) => !unavailAmenities.includes(n));
  data['actualAmenities'] = actualAmenities;

  const description = await page.$eval('[data-testid="space-description"]', (element) => element.textContent);
  data['description'] = description;

  const spaceOpeningHours = await page.$eval('[data-testid="space-opening-hours"]', (element) => element.textContent);
  data['spaceOpeningHours'] = spaceOpeningHours;

  const otherRules = await page.$eval('[data-testid="space-home-truths"]', (element) => element.textContent);
  data['otherRules'] = otherRules;

  const spaceRules = await page.$eval('[data-testid="space-rules"]', (element) => element.textContent);
  data['spaceRules'] = spaceRules;

  const floorPlan = await page.$eval('a.Header__floorplan___2-I_c', (element) => element.href);
  data['floorPlan'] = floorPlan;

  const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('.slick-track img'), (element) => element.src));
  data['imgs'] = imgs;
  console.log(data);
  await page.close();
  return data;
  // To setup AWS Lambda schedule - https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html
};
