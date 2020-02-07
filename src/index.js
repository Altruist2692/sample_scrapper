const setup = require('./starter-kit/setup');
const Database = require('database-js').Connection;

const storefront = require('./scrappers/storefront');
const gopopup = require('./scrappers/gopopup');
const appearhere = require('./scrappers/appearhere');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  try {
    const result = await index.run(browser);
    callback(null, result);
  } catch (e) {
    callback(e);
  }
};

exports.run = async (browser) => {
  try {
    const result = await storefront.run(browser);
    return result;
  } catch (e) {
    console.log('EXCEPTION CAUGHT:');
    console.log(e);
  }
};
