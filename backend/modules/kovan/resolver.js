// Utils
const { getBrowser } = require('../../utils/puppeteer');
const { parseKovanMessage } = require('../../utils/strings');

async function getKovanEth({ address }) {
  // Constants - Urls
  const KOVAN_FAUCET_URL = 'https://kovan.faucet.enjin.io';

  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'button';
  const INPUT_ADDRESS_SELECTOR = 'input';
  const FAUCET_OUTPUT_SELECTOR = '#faucetOutput';

  // Launch a new browser
  const browser = await getBrowser();
  const page = await browser.newPage();

  // Go to Faucet url
  await page.goto(KOVAN_FAUCET_URL);

  // Wait for Cloudfare redirect
  await page.waitFor(5500);

  // Type user address
  await page.focus(INPUT_ADDRESS_SELECTOR);
  await page.keyboard.type(address);

  // Trigger eth request
  await page.click(BUTTON_SEND_SELECTOR);

  // Wait until message is received
  await page.waitForFunction(`document.querySelector('${FAUCET_OUTPUT_SELECTOR}').textContent.length > 1`);

  // Get output text
  const [description, rawMessage] = await page.evaluate(
    (selector) => document.querySelector(selector).innerText.split('\n').filter(Boolean),
    FAUCET_OUTPUT_SELECTOR,
  );
  // Get status code and parse message
  const [statusCode] = description.match(/\d+/g) || [];
  const message = statusCode === 200 ? 'You will receive 0.1 ethers in your account.' : parseKovanMessage(rawMessage);

  return {
    statusCode,
    body: { description, message },
  };
}

module.exports = { getKovanEth };
