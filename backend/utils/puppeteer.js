const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');

// Constants - Environment variables
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const TWO_CAPTCHA_API_TOKEN = process.env.TWO_CAPTCHA_API_TOKEN;
const BROWSERLESS_API_TOKEN = process.env.BROWSERLESS_API_TOKEN;

// Puppeteer - Plugins
puppeteer.use(RecaptchaPlugin({ provider: { id: '2captcha', token: TWO_CAPTCHA_API_TOKEN }, visualFeedback: true }));

function getBrowser() {
  const browserWSEndpoint = `wss://chrome.browserless.io?token=${BROWSERLESS_API_TOKEN}`;
  return !IS_PRODUCTION ? puppeteer.connect({ browserWSEndpoint }) : puppeteer.launch({ headless: false });
}

module.exports = { getBrowser };
