const puppeteer = require('puppeteer');

// Constants - Environment variables
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BROWSERLESS_API_TOKEN = process.env.BROWSERLESS_API_TOKEN;

function getBrowser() {
  const browserWSEndpoint = `wss://chrome.browserless.io?token=${BROWSERLESS_API_TOKEN}`;
  return IS_PRODUCTION ? puppeteer.connect({ browserWSEndpoint }) : puppeteer.launch({ headless: false });
}

module.exports = { getBrowser };
