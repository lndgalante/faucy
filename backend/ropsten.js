const querystring = require('querystring');
const chromium = require('chrome-aws-lambda');
const { isAddress } = require('ethereum-address');

// Constants
const ROPSTEN_FAUCET_URL = 'https://faucet.ropsten.be/';
const INPUT_ADDRESS_SELECTOR = 'input';
const BUTTON_SEND_SELECTOR = 'button';
const RESPONSE_MESSAGE_SELECTOR = '.message-body';

async function getRopstenEth({ address }) {
  // Launch a new browser
  const executablePath = await chromium.executablePath;
  const browser = await chromium.puppeteer.launch({
    executablePath,
    args: chromium.args,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });
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

  // Close browser
  await browser.close();

  // Check for errors in status message
  const hasError = statusMessage.includes('greylist');

  return {
    statusCode: hasError ? 403 : 200,
    body: JSON.stringify({ message: statusMessage }),
  };
}

exports.handler = async (event) => {
  // Allow only POST method
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Get address from event body encoded as a queryString
  const { address } = querystring.parse(event.body);

  // Check address
  if (!address) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Address not defined' }) };
  }

  // Validate address
  if (!isAddress(address)) {
    return { statusCode: 422, body: JSON.stringify({ message: 'Invalid address' }) };
  }

  // Trigger eth request
  const result = await getRopstenEth({ address });

  return result;
};
