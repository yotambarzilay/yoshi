const { editorUrl, viewerUrl } = require('./dev/sites');

module.exports = {
  projectType: 'app',
  startUrl: [editorUrl, viewerUrl],
  externals: {
    react: {
      amd: 'react',
      umd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React',
    },
    'react-dom': {
      amd: 'reactDOM',
      umd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: 'ReactDOM',
    },
  },
  servers: {
    cdn: {
      ssl: true,
    },
  },
  exports: '[name]',
  umdNamedDefine: false,
  enhancedTpaStyle: true,
};
