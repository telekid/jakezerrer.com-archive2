import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import stylelint from 'stylelint';
import nesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';
import template from 'html-webpack-template';

const modes = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod',
};

const getNodeEnv = env => {
  let envName;
  switch (env) {
    case modes.DEVELOPMENT:
      envName = 'development';
      break;
    case modes.PRODUCTION:
    default:
      envName = 'production';
      break;
  }

  return envName;
};

export default function (env) {
  return {
    context: path.resolve('./src'),

    entry: {
      main: './index.js',
    },

    output: {
      filename: '[name].js',
      path: path.resolve('./dist'),
    },

    eslint: {
      configFile: path.resolve('./.eslintrc'),
      emitWarning: env === modes.DEVELOPMENT,
    },

    module: {
      preLoaders: [
        { test: /\.js$/,
          loader: 'eslint-loader?',
          exclude: /node_modules/ },
      ],
      loaders: [
        { test: /\.jpg$/,
          loader: 'file',
          exclude: /node_modules/ },

        { test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/ },

        { test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style',
            loader: ['css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'],
          }),
          exclude: /node_modules/ },
      ],
    },

    postcss: (() => {
      const postcssActions = [nesting, autoprefixer];

      if (env === modes.PRODUCTION) {
        postcssActions.push(stylelint);
      }
      return postcssActions;
    })(),

    resolve: {
      modulesDirectories: ['node_modules'],
    },

    devtool: env === modes.DEVELOPMENT ? 'eval-source-map' : 'hidden-source-map',

    plugins: (() => {
      const plugins = [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
          template,
          inject: false,
          appMountId: 'app',
          title: 'Jake Zerrer',
          mobile: true,
          hash: env === modes.PRODUCTION,
        }),
      ];

      plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(getNodeEnv(env)),
      }));

      if (env === modes.PRODUCTION) {
        plugins.push(new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }));
      }

      return plugins;
    })(),
  };
}
