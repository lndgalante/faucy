// Utils
const { getBrowser } = require('../../../utils/puppeteer');
const { getTxHash, createSuccessMessage, createGreylistMessage } = require('../../../utils/strings');

// Constants
const { ROPSTEN_FAUCET_URL } = process.env;

async function getRopstenEth({ address }) {
  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'button#receive';
  const INPUT_ADDRESS_SELECTOR = 'input#faucet-address';
  const RESPONSE_MESSAGE_SELECTOR = 'div#faucet-result';

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
  await page.waitForSelector(RESPONSE_MESSAGE_SELECTOR, { visible: true });
  const statusMessage = await page.evaluate(
    (selector) => document.querySelector(selector).textContent,
    RESPONSE_MESSAGE_SELECTOR,
  );

  // Close browser
  await browser.close();

  // Check for errors in status message
  const hasError = statusMessage.includes('limit');

  if (hasError) {
    const greylistPeriod = statusMessage.split('- ')[1].split('left ')[0].trimEnd();

    return {
      statusCode: 403,
      body: { message: createGreylistMessage(greylistPeriod) },
    };
  }
  // Get transaction hash
  const txHash = getTxHash(statusMessage);

  return {
    statusCode: 200,
    body: { txHash, message: createSuccessMessage(1) },
  };
}

module.exports = { getRopstenEth };
