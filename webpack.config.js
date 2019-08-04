const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const nodeExternals = require('webpack-node-externals');

const moduleName = "antd-form-pro";

const webpackConfig = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    filename: `${moduleName}.js`,
    library: moduleName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('awesome-typescript-loader'),
            options: {
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: true
                })]
              }),
            },
          },
          // Optional
          {
            loader: require.resolve('react-docgen-typescript-loader'),
          },
        ],
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        options: {
          presets: ['@babel/react'],
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ['@babel/plugin-proposal-class-properties'],
            ['import', {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true
            }]
          ]
        },
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
        include: [
          path.resolve(__dirname, './src'),
          /[\\/]node_modules[\\/].*antd/
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
        include: [
          path.resolve(__dirname, './src'),
        ]
      },
    ]
  },
  externals: [nodeExternals()],
};

module.exports = webpackConfig;
