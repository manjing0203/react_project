const { override, fixBabelImports, addLessLoader,adjustStyleLoaders,addDecoratorsLegacy } = require('customize-cra');

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
  //解决postcss-loader报错问题
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),
  addDecoratorsLegacy()
);