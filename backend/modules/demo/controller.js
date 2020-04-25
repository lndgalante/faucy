// Utils
const { getBrowser } = require('../../utils/puppeteer');

// Controller
const demoController = async (req, res) => {
  console.log('hola');

  // Launch a new browser
  const browser = getBrowser();
  const page = await browser.newPage();

  // Go to Faucet url
  await page.goto('https://05904081.ngrok.io');

  browser.close();

  console.log('chau');
};

module.exports = { demoController };
