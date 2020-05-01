// Utils
const { getBrowser } = require('../../utils/puppeteer');
const { txHashRegex, createSuccessMessage } = require('../../utils/strings');

// Constants
const { RINKEBY_FAUCET_URL, PROXY_USERNAME, PROXY_PASSWORD } = process.env;

async function getRinkebyEth({ address }) {
  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'button';
  const INPUT_ADDRESS_SELECTOR = 'input';
  const FAUCET_ERROR_OUTPUT_SELECTOR = 'body';
  const FAUCET_MESSAGE_SELECTOR = 'p:last-of-type';

  // Launch a new browser
  const browser = await getBrowser('rinkeby');
  const page = await browser.newPage();

  // Authenticate proxy
  await page.authenticate({ username: PROXY_USERNAME, password: PROXY_PASSWORD });

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

    // Close browser
    browser.close();

    return {
      statusCode: 401,
      body: { message: errorMessage },
    };
  }

  // Get text message
  const textMessage = await page.evaluate(
    (selector) => document.querySelector(selector).textContent,
    FAUCET_MESSAGE_SELECTOR,
  );

  // Get transaction hash
  const [txHash] = textMessage.match(txHashRegex) || [];

  // Close browser
  browser.close();

  return {
    statusCode: 200,
    body: { txHash, message: createSuccessMessage('0.001') },
  };
}

module.exports = { getRinkebyEth };
