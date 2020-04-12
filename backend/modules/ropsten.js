const capitalize = require('lodash.capitalize');

// Utils - Puppeteer
const { getBrowser } = require('../utils/puppeteer');

async function getRopstenEth({ address }) {
  // Constants - Urls
  const ROPSTEN_FAUCET_URL = 'https://faucet.ropsten.be';

  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'button';
  const INPUT_ADDRESS_SELECTOR = 'input';
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
