const webpack = require('webpack');
const path = require('path');
const glob = require('glob');


module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    );

    config.module.rules.push({
        /**
         * Image handler + compresses images
         */
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            // name: production ? '[name]-[sha512:hash:base64:7].[ext]' : '[name].[ext]',
            name: '[name].[ext]',
            limit: 1000
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 4
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            }
          }
        }]
      },
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
    ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader']
      }
    ,
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  }
}
