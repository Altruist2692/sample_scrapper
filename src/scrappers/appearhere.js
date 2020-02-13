const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

// [
//   'https://www.appearhere.co.uk/spaces/columbia-road-shoreditch-the-little-black-boutique',
//   'https://www.appearhere.co.uk/spaces/white-boxed-covent-garden-shop-neal-street',
//   'https://www.appearhere.co.uk/spaces/peter-street-soho-the-corner-boutique-4311d4a1-f3d9-4797-9a1f-7cf347ebfcc5',
//   'https://www.appearhere.co.uk/spaces/the-black-white-soho-shop-greek-street-a5fa79bb-3a3e-47e8-a7c6-018628d525e4',
//   'https://www.appearhere.co.uk/spaces/the-oracle-reading-the-black-white-shop',
//   'https://www.appearhere.co.uk/spaces/oracle-shopping-centre-reading-the-corner-boutique',
//   'https://www.appearhere.co.uk/spaces/calvert-avenue-shoreditch-the-avenue-boutique',
//   'https://www.appearhere.co.uk/spaces/bullring-birmingham-the-beauty-boutique',
//   'https://www.appearhere.co.uk/spaces/davies-street-mayfair-the-mess-hall',
//   'https://www.appearhere.co.uk/spaces/bullring-shopping-centre-birmingham-the-red-grey-shop',
//   'https://www.appearhere.co.uk/spaces/the-arcade-bournemouth-the-grab-go-kiosk-space',
//   'https://www.appearhere.co.uk/spaces/the-arcade-bournemouth-the-food-beverage-kiosk-space',
//   'https://www.appearhere.co.uk/spaces/the-arcade-bournemouth-the-black-fashion-boutique',
//   'https://www.appearhere.co.uk/spaces/the-arcade-bournemouth-the-blue-boutique',
//   'https://www.appearhere.co.uk/spaces/upper-street-islington-the-brick-wall-boutique',
//   'https://www.appearhere.co.uk/spaces/city-road-hoxton-the-marble-cafe',
//   'https://www.appearhere.co.uk/spaces/lambs-conduit-bloomsbury-the-white-boutique',
//   'https://www.appearhere.co.uk/spaces/mini-soho-store-greek-street',
//   'https://www.appearhere.co.uk/spaces/brushfield-street-spitalfields-the-traditional-spitalfields-shop',
//   'https://www.appearhere.co.uk/spaces/stoke-newington-white-box-space',
//   'https://www.appearhere.co.uk/spaces/shoreditch-high-street-the-ace-corner-shop',
//   'https://www.appearhere.co.uk/spaces/rose-street-covent-garden-the-double-level-shop',
//   'https://www.appearhere.co.uk/spaces/shoreditch-industrial-event-space',
//   'https://www.appearhere.co.uk/spaces/murray-grove-old-street-shop',
//   'https://www.appearhere.co.uk/spaces/curtain-road-f-b-space-shoreditch',
//   'https://www.appearhere.co.uk/spaces/hoxton-street-shoreditch-the-old-deli',
//   'https://www.appearhere.co.uk/spaces/brewer-street-shop-soho',
//   'https://www.appearhere.co.uk/spaces/brent-cross-london-the-glass-space',
//   'https://www.appearhere.co.uk/spaces/high-street-wimbledon-wimbledon-the-white-shop',
//   'https://www.appearhere.co.uk/spaces/berwick-street-soho-corner-boutique'
// ]
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

  const totl = await page.evaluate(() => Array.from(document.querySelectorAll('div.slick-slide'), (element) => element.dataset.index));
  // console.log("totl" + totl)
  console.log((totl.length+1) + "<<<<<<<<")
  for (var i = 0; i < totl.length+1; i++) {
    await page.click('.slick-next')
    await page.waitFor(1000)
  }
  // await page.click()
  const imgs = await page.$$eval('div.slick-track img', options => options.map((option) => {
    a = []
    a.push(option.src)
    return a
  }))

  const filteredimg = imgs.filter((item, index) => imgs.indexOf(item) === index);
  // const imgs = await page.evaluate(() => Array.from(document.querySelectorAll(''), (element) => element.src));
  console.log("imgs " + filteredimg);
  console.log("imgs length" + filteredimg.length)
  await page.close();
  return data;
  // To setup AWS Lambda schedule - https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html
};
