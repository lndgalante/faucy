// Utils
const { wretch } = require('../../utils/fetch');
const { getBrowser } = require('../../utils/puppeteer');
const { createSuccessMessage } = require('../../utils/strings');

// Constants
const { GOERLI_FAUCET_URL, PROXY_USERNAME, PROXY_PASSWORD } = process.env;

async function getGoerliEth({ address }) {
  // Launch a new browser
  const browser = await getBrowser();
  const page = await browser.newPage();

  // Authenticate proxy
  await page.authenticate({ username: PROXY_USERNAME, password: PROXY_PASSWORD });

  // Go to Faucet url
  await page.goto(GOERLI_FAUCET_URL);

  // Solve reCAPTCHAs
  const { solutions } = await page.solveRecaptchas();
  const [{ text: recaptchaSolution }] = solutions;

  // Trigger ethers request
  const { success } = await wretch(GOERLI_FAUCET_URL)
    .post({ receiver: address, 'g-recaptcha-response': recaptchaSolution })
    .json();
  const { code: statusCode, title, message: extraMessage, txHash } = success;

  // Close browser
  browser.close();

  return {
    statusCode,
    body: {
      title,
      txHash,
      extraMessage,
      message: createSuccessMessage('0.05'),
    },
  };
}

module.exports = { getGoerliEth };
