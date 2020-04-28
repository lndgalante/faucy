const queryString = require('query-string');
const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');

// Constants - Environment variables
const { BROWSERLESS_API_TOKEN, TWO_CAPTCHA_API_TOKEN, NODE_ENV } = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';

// Puppeteer - Plugins
puppeteer.use(RecaptchaPlugin({ provider: { id: '2captcha', token: TWO_CAPTCHA_API_TOKEN }, visualFeedback: true }));

function getBrowser() {
  const browserlessQuery = queryString.stringify({ token: BROWSERLESS_API_TOKEN, '--proxy-server': undefined });
  const browserWSEndpoint = `wss://chrome.browserless.io?${browserlessQuery}`;

  return !IS_PRODUCTION ? puppeteer.connect({ browserWSEndpoint }) : puppeteer.launch({ headless: false });
}

module.exports = { getBrowser };
