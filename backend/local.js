// Dotenv
require('dotenv').config();

// Express - App
const { app } = require('./app');

// Constants
const PORT = process.env.PORT || 8080;

// Express - Listen
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
