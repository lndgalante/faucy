// Utils
const { NETWORKS } = require('../../utils/networks');
const { getBrowser } = require('../../utils/puppeteer');
const { txHashRegex, getKovanHours, createSuccessMessage, createGreylistMessage } = require('../../utils/strings');

// Constants - Environment variables
const { KOVAN_FAUCET_URL, PROXY_USERNAME, PROXY_PASSWORD } = process.env;

async function getKovanEth({ address }) {
  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'button';
  const INPUT_ADDRESS_SELECTOR = 'input';
  const FAUCET_OUTPUT_SELECTOR = '#faucetOutput';
  const ETHERSCAN_LINK_SELECTOR = '#faucetOutput a:last-of-type';

  // Launch a new browser
  const browser = await getBrowser(NETWORKS.kovan);
  const page = await browser.newPage();

  // Authenticate proxy
  await page.authenticate({ username: PROXY_USERNAME, password: PROXY_PASSWORD });

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

  // Get anchor link
  const anchorLink = await page.evaluate((selector) => {
    const anchor = document.querySelector(selector);
    return anchor ? anchor.getAttribute('href') : '';
  }, ETHERSCAN_LINK_SELECTOR);

  // Close browser
  browser.close();

  // Get txHash
  const [txHash] = anchorLink.match(txHashRegex) || [];

  // Get status code
  const [statusCode] = description.match(/\d+/g) || [];

  // Parse message
  if (statusCode === '200') {
    const message = createSuccessMessage('0.1');

    return {
      statusCode,
      body: { description, message, txHash },
    };
  }

  const hours = getKovanHours(rawMessage);
  return {
    statusCode: 401,
    body: { message: createGreylistMessage(`${hours} hours`) },
  };
}

module.exports = { getKovanEth };
