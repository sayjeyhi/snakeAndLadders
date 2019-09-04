/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
	// externals : { 
	// 	canvas: {}
	// },
	output: {
		libraryTarget: 'umd'
	}
  })
  // This will completely replace the webpack config with the modified object.
  //actions.replaceWebpackConfig(config)
}