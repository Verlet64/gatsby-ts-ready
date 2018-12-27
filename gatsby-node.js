/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const resolvableExtensions = () => [`.ts`, `.tsx`]

const onCreateWebpackConfig = ({ stage, actions }, pluginOptions) => {
  const test = pluginOptions.test || /\.tsx?$/
  const exclude = pluginOptions.exclude || /(node_modules|cache|public)/

  if (stage === 'develop') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: test,
            exclude: exclude,
            use: [
              {
                loader: 'tslint-loader',
                options: {
                  emitErrors: true,
                  formatter: 'verbose',
                },
              },
            ],
          },
        ],
      },
    })
  }
}

exports.resolvableExtensions = resolvableExtensions
exports.onCreateWebpackConfig = onCreateWebpackConfig
