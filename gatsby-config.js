const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Snake and ladders starter`,
    description: `Just a react redux snake and ladder.`,
    author: `@jafar-rezaei`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        native: path.join(__dirname, 'src/native'),
        reducers: path.join(__dirname, 'src/reducers'),
        sagas: path.join(__dirname, 'src/sagas'),
        selectors: path.join(__dirname, 'src/selectors'),
        store: path.join(__dirname, 'src/store'),
        web: path.join(__dirname, 'src/web'),
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.join(__dirname, 'src/web/pages'),
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('node-sass'),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `components-plugin-offline`,
  ],
};
