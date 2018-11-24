const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const postcssBrowserReporter = require('postcss-browser-reporter')
const postcssReporter = require('postcss-reporter')

module.exports = {
  siteMetadata: {},
  plugins: [
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          postcssImport(),
          postcssPresetEnv({
            features: {
              'nesting-rules': true,
              'custom-properties': {
                importFrom: 'src/styles/vars.css',
              },
            },
          }),
          postcssBrowserReporter(),
          postcssReporter(),
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'uploads',
        path: `${__dirname}/static/uploads`,
      },
    },
    'gatsby-plugin-netlify-cms-paths',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-smartypants'],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /logo-rmittkd/,
        },
      },
    },
    'gatsby-plugin-nprogress',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        htmlTitle: 'Content Manager - RMIT ITF Taekwon-Do',
      },
    },
  ],
}
