module.exports = {
  siteMetadata: {
    author: `@faucy`,
    title: `Faucy`,
    description: `Get fake eth easily!`,
  },
  plugins: [
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
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`,
      },
    },
  ],
}
