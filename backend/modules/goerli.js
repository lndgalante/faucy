const capitalize = require('lodash.capitalize');

// Utils - Puppeteer
const { getBrowser } = require('../utils/puppeteer');

async function getGoerliEth({ address }) {
  // Constants - Urls
  const GOERLI_FAUCET_URL = 'https://goerli-faucet.slock.it';

  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'button';
  const INPUT_ADDRESS_SELECTOR = 'input';
  const MODAL_SELECTOR = '.swal2-modal.swal2-show';
  const STATUS_SELECTOR = '.swal2-title';
  const MESSAGE_SELECTOR = '.swal2-content';

  // Launch a new browser
  const browser = await getBrowser();
  const page = await browser.newPage();

  // Go to Faucet url
  await page.goto(GOERLI_FAUCET_URL);

  // Type user address
  await page.focus(INPUT_ADDRESS_SELECTOR);
  await page.keyboard.type(address);

  // Trigger eth request
  await page.click(BUTTON_SEND_SELECTOR);

  // Get status message
  await page.waitForSelector(MODAL_SELECTOR);
  const status = await page.evaluate((selector) => document.querySelector(selector).textContent, STATUS_SELECTOR);
  const message = await page.evaluate((selector) => document.querySelector(selector).textContent, MESSAGE_SELECTOR);

  // Close browser
  await browser.close();

  // Check for errors in status message
  const hasError = status.toLowerCase().includes('error');

  return {
    message,
    statusCode: hasError ? 403 : 200,
  };
}

module.exports = { getGoerliEth };
