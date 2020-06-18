// Utils
const { NETWORKS } = require('../../../utils/networks');
const { getBrowser } = require('../../../utils/puppeteer');
const { getTxHash, createSuccessMessage, createGreylistMessage } = require('../../../utils/strings');

// Constants - Environment variables
const { RINKEBY_FAUCET_URL, PROXY_USERNAME, PROXY_PASSWORD } = process.env;

async function getRinkebyEth({ address }) {
  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'input[value="Claim"]';
  const INPUT_ADDRESS_SELECTOR = 'input[name=address]';
  const AMOUNT_SELECTOR = 'input[name=amount]';
  const ACCEPT_TERMS_SELECTOR = 'input[name=verify]';
  const SELECT_FORM_SELECTOR = 'select[name=interested]';
  const FAUCET_LOG_SELECTOR = '#log';

  // Constants - Input values
  const ETHER_AMOUNT = '0.2';

  // Launch a new browser
  const browser = await getBrowser(NETWORKS.rinkeby);
  const page = await browser.newPage();

  // Authenticate proxy
  await page.authenticate({ username: PROXY_USERNAME, password: PROXY_PASSWORD });

  // Go to Faucet url
  await page.goto(RINKEBY_FAUCET_URL);

  // Type user address
  await page.focus(INPUT_ADDRESS_SELECTOR);
  await page.keyboard.type(address);

  // Type amount
  await page.focus(AMOUNT_SELECTOR);
  await page.keyboard.type(ETHER_AMOUNT);

  // Select option
  await page.select(SELECT_FORM_SELECTOR, 'OTHER');

  // Check terms and conditions
  await page.evaluate((selector) => document.querySelector(selector).click(), ACCEPT_TERMS_SELECTOR);

  // Solve reCAPTCHAs
  await page.solveRecaptchas();

  // Check terms and conditions
  await page.click(BUTTON_SEND_SELECTOR);

  // Wait for the page to reload
  await page.waitFor(2000);

  // Wait for the log message while the page reloads
  await page.waitForSelector(FAUCET_LOG_SELECTOR);

  // Get text message
  const textMessage = await page.evaluate(
    (selector) => document.querySelector(selector).textContent.trim(),
    FAUCET_LOG_SELECTOR,
  );

  // Close browser
  browser.close();

  // Check for errors
  if (textMessage.includes('Error')) {
    return {
      statusCode: 401,
      body: { message: createGreylistMessage('less than 24 hours') },
    };
  }

  // Get transaction hash
  const txHash = getTxHash(textMessage);

  return {
    statusCode: 200,
    body: { txHash, message: createSuccessMessage(ETHER_AMOUNT) },
  };
}

module.exports = { getRinkebyEth };
