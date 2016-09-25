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
      publicPath: '/'
    },

    module: {
      rules: [
        // { test: /\.js$/,
        //   enforce: 'pre',
        //   loader: 'eslint',
        //   options: {
        //     configFile: path.resolve('./.eslintrc'),
        //     emitWarning: env === modes.DEVELOPMENT,
        //   },
        //   exclude: /node_modules/ },
        {
          test: /\.(jpg|png)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file',
            }
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel',
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'css',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss',
            },
          ],
        },
      ],
    },

    resolve: {
      modules: [
        'node_modules',
      ],
    },

    devtool: env === modes.DEVELOPMENT ? 'eval-source-map' : 'hidden-source-map',

    plugins: (() => {
      const plugins = [
        new ExtractTextPlugin('style.css'),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: (() => {
              const postcssActions = [nesting, autoprefixer];

              if (env === modes.PRODUCTION) {
                postcssActions.push(stylelint);
              }
              return postcssActions;
            })(),
          }
        }),
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

    devServer: {
      historyApiFallback: true,
    },
  };
}
