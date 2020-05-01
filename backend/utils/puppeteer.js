const queryString = require('query-string');
const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');

// Constants - Environment variables
const { BROWSERLESS_API_TOKEN, TWO_CAPTCHA_API_TOKEN, PROXY_SERVER_URL, NODE_ENV } = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';

// Puppeteer - Plugins
puppeteer.use(RecaptchaPlugin({ provider: { id: '2captcha', token: TWO_CAPTCHA_API_TOKEN }, visualFeedback: true }));

function getBrowser(networkName) {
  const networksNeedingProxies = ['kovan', 'rinkeby'];
  const proxyServer = networksNeedingProxies.includes(networkName) ? PROXY_SERVER_URL : undefined;

  const browserlessQuery = queryString.stringify({ token: BROWSERLESS_API_TOKEN, '--proxy-server': proxyServer });
  const browserWSEndpoint = `wss://chrome.browserless.io?${browserlessQuery}`;

  return IS_PRODUCTION
    ? puppeteer.connect({ browserWSEndpoint })
    : puppeteer.launch({ headless: false, args: [proxyServer ? `--proxy-server=${PROXY_SERVER_URL}` : ''] });
}

module.exports = { getBrowser };
