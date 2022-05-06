 const { override, fixBabelImports, addLessLoader,adjustStyleLoaders } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
   style: true,
  }),
  addLessLoader({
    lessOptions:{
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
    },
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),
);