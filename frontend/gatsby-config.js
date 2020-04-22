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
        theme_color: `#663399`,
        background_color: `#663399`,
        icon: `src/assets/images/favicon.png`,
      },
    },
  ],
};
