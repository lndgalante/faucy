const puppeteer = require('puppeteer');
const capitalize = require('lodash.capitalize');

// Constants - Environment variables
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BROWSERLESS_API_TOKEN = process.env.BROWSERLESS_API_TOKEN;

// Puppeteer - Helpers
const getBrowser = () => {
  const browserWSEndpoint = `wss://chrome.browserless.io?token=${BROWSERLESS_API_TOKEN}`;
  return IS_PRODUCTION ? puppeteer.connect({ browserWSEndpoint }) : puppeteer.launch({ headless: false });
};

// Puppeteer - Get eth
async function getRopstenEth({ address }) {
  // Constants - Urls
  const ROPSTEN_FAUCET_URL = 'https://faucet.ropsten.be';

  // Constants - DOM Selectors
  const INPUT_ADDRESS_SELECTOR = 'input';
  const BUTTON_SEND_SELECTOR = 'button';
  const RESPONSE_MESSAGE_SELECTOR = '.message-body';

  // Launch a new browser
  const browser = await getBrowser();
  const page = await browser.newPage();

  // Go to Faucet url
  await page.goto(ROPSTEN_FAUCET_URL);

  // Type user address
  await page.focus(INPUT_ADDRESS_SELECTOR);
  await page.keyboard.type(address);

  // Trigger eth request
  await page.click(BUTTON_SEND_SELECTOR);

  // Get status message
  await page.waitForSelector(RESPONSE_MESSAGE_SELECTOR);
  const statusMessage = await page.evaluate(
    (selector) => document.querySelector(selector).textContent,
    RESPONSE_MESSAGE_SELECTOR,
  );
  const capitalizedMessage = capitalize(statusMessage);

  // Close browser
  await browser.close();

  // Check for errors in status message
  const hasError = statusMessage.includes('greylist');
  const parsedMessage = hasError ? capitalizedMessage.split('gy').join('g. Y') : capitalizedMessage;

  return {
    message: parsedMessage,
    statusCode: hasError ? 403 : 200,
  };
}

module.exports = { getRopstenEth };
