const express = require('express');
const { wretch } = require('../../utils/fetch');
const { getBrowser } = require('../../utils/puppeteer');
const { NETWORKS } = require('../../utils/networks');
const { 
  RINKEBY_FAUCET_URL, 
  GOERLI_FAUCET_URL, 
  KOVAN_FAUCET_URL, 
  ROPSTEN_FAUCET_URL, 
  PROXY_USERNAME, 
  PROXY_PASSWORD
} = process.env;

const healthRouter = express.Router();

healthRouter.get('/check', (req, res) => {
  res.status(200).json({ statusCode: 200, body: { message: 'The service is running' } });
});

healthRouter.get('/goerli', async (req, res) => {
  try {
    await wretch(GOERLI_FAUCET_URL).get().res();
    res.json({ statusCode: 200, body: { message: 'Goerli is running' } });
  } catch (error) {
    res.json({ statusCode: 503, body: { message: 'Goerli is down' } });
  }
});

healthRouter.get('/kovan', async (req, res) => {
  const browser = await getBrowser(NETWORKS.kovan);
  try {
     // Launch a new browser
    const page = await browser.newPage();

    // Authenticate proxy
    await page.authenticate({ username: PROXY_USERNAME, password: PROXY_PASSWORD });
    
    // Set the status code to an error
    let statusCode = 503;
    
    page.on('response', function(response) { 
      // Check for the url after cloudflare redirects  
      if(response.url().includes(KOVAN_FAUCET_URL + '/?')) {
        // Update the satatus code
        statusCode = response.status();
      }
    });
   
    // Go to Faucet url
    await page.goto(KOVAN_FAUCET_URL);
    
    // Wait for Cloudfare redirect
    await page.waitFor(5500);
    
    // Close browser
    browser.close();
    message = statusCode === 200? 'Kovan is running' : 'Kovan is down';  
    res.json({ statusCode: statusCode, body: { message: message } });

  } catch (error) {
    // Close browser
    browser.close();
    
    res.json({ statusCode: 503, body: { message: 'Kovan is down' } });
  }
});

healthRouter.get('/rinkeby', async (req, res) => {
  try {
    await wretch(RINKEBY_FAUCET_URL).get().res();
    res.json({ statusCode: 200, body: { message: 'Rinkeby is running' } });
  } catch (error) {
    res.json({ statusCode: 503, body: { message: 'Rinkeby is down' } });
  }
});

healthRouter.get('/ropsten', async (req, res) => {
  try {
    await wretch(ROPSTEN_FAUCET_URL).get().res();
    res.json({ statusCode: 200, body: { message: 'Ropsten is running' } });
  } catch (error) {
    res.json({ statusCode: 503, body: { message: 'Ropsten is down' } });
  }
});
module.exports = { healthRouter };
