// Utils
const { getBrowser } = require('../../utils/puppeteer');
const { txHashRegex, createSuccessMessage } = require('../../utils/strings');

// Constants
const { RINKEBY_FAUCET_URL, PROXY_USERNAME, PROXY_PASSWORD } = process.env;

async function getRinkebyEth({ address }) {
  // Constants - DOM Selectors
  const BUTTON_SEND_SELECTOR = 'input[value="Claim"]';
  const INPUT_ADDRESS_SELECTOR = 'input[name=address]';
  const AMOUNT_SELECTOR = 'input[name=amount]';
  const ACCEPT_TERMS_SELECTOR = 'input[name=verify]';
  const SELECT_FORM_SELECTOR = 'select[name=interested]';
  const FAUCET_LOG_SELECTOR = '#log';

  const ETHER_AMOUNT = '0.2'

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

  // Type amount
  await page.focus(AMOUNT_SELECTOR);
  await page.keyboard.type(ETHER_AMOUNT);

  // Select option
  await page.select(SELECT_FORM_SELECTOR, 'OTHER')

  // Check terms and conditions
  await page.evaluate(
    (selector) => document.querySelector(selector).click(),
     ACCEPT_TERMS_SELECTOR
  );

  // Solve reCAPTCHAs
  await page.solveRecaptchas();

  // Check terms and conditions
  await page.click(BUTTON_SEND_SELECTOR);

  // Wait for the page to reload
  await page.waitFor(6000)

  // Wait for the log message while the page reloads
  await page.waitForSelector(FAUCET_LOG_SELECTOR);

  // Get text message
  const textMessage = await page.evaluate(
    (selector) => document.querySelector(selector).textContent,
    FAUCET_LOG_SELECTOR,
  );

  // Try to get a  transaction hash
  const [txHash] = textMessage.match(txHashRegex) || [];

  // Close browser
  browser.close();

  // If the message isn't a tx hash is an error
  if (!txHash) {
    return {
      statusCode: 401,
      body: { message: textMessage },
    };
  }

  return {
    statusCode: 200,
    body: { txHash, message: createSuccessMessage(ETHER_AMOUNT) },
  };
}

module.exports = { getRinkebyEth };
