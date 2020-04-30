const dotenv = require('dotenv');

// Dotenv
dotenv.config();

// Environment
const { NODE_ENV, SENTRY_DSN } = process.env;

module.exports = {
  siteMetadata: {
    title: `Faucy.eth`,
    author: `@xivis`,
    description: `Get ethers from any testnet easily`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-chakra-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sentry`,
      options: {
        dsn: SENTRY_DSN,
        environment: NODE_ENV,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `faucy`,
        start_url: `/`,
        short_name: `starter`,
        display: `minimal-ui`,
        theme_color: `#319795`,
        background_color: `#319795`,
        icon: `src/assets/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: { fonts: [`Inter\:400,500,600`], display: 'swap' },
    },
  ],
};
