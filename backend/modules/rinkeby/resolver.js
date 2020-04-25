// Utils
const { getBrowser } = require('../../utils/puppeteer');
const { addressRegex, createSuccessMessage } = require('../../utils/strings');

// Constants
const { RINKEBY_FAUCET_URL } = process.env;

async function getRinkebyEth({ address }) {
  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'button';
  const INPUT_ADDRESS_SELECTOR = 'input';
  const FAUCET_ERROR_OUTPUT_SELECTOR = 'body';
  const FAUCET_MESSAGE_SELECTOR = 'p:last-of-type';
  const FAUCET_SUCCESS_OUTPUT_SELECTOR = 'h3:nth-of-type(2)';

  // Launch a new browser
  const browser = getBrowser();
  const page = await browser.newPage();

  // Go to Faucet url
  await page.goto(RINKEBY_FAUCET_URL);

  // Type user address
  await page.focus(INPUT_ADDRESS_SELECTOR);
  await page.keyboard.type(address);

  // Trigger eth request
  await page.click(BUTTON_SEND_SELECTOR);

  // Wait for redirect
  await page.waitFor(6000);

  // Handle error case
  try {
    await page.waitForSelector(FAUCET_MESSAGE_SELECTOR, { timeout: 2000 });
  } catch {
    const errorMessage = await page.evaluate(
      (selector) => document.querySelector(selector).textContent,
      FAUCET_ERROR_OUTPUT_SELECTOR,
    );

    return {
      statusCode: 401,
      body: { message: errorMessage },
    };
  }

  // Get success message
  const successMessage = await page.evaluate(
    (selector) => document.querySelector(selector).textContent,
    FAUCET_SUCCESS_OUTPUT_SELECTOR,
  );

  // Get text message
  const textMessage = await page.evaluate(
    (selector) => document.querySelector(selector).textContent,
    FAUCET_MESSAGE_SELECTOR,
  );

  // Get transaction hash
  const [txHash] = textMessage.match(addressRegex) || [];

  return {
    statusCode: 200,
    body: { txHash, message: createSuccessMessage('0.001') },
  };
}

module.exports = { getRinkebyEth };
