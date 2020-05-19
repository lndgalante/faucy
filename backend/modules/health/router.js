const express = require('express');

const healthRouter = express.Router();

healthRouter.get('/check', (req, res) => {
  res.status(200).json({ statusCode: 200, body: { message: 'The service is running' } });
});

module.exports = { healthRouter };
