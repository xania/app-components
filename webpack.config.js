const fspath = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  return {
    target: "web",
    entry: ["./src/main.tsx"],
    mode: "development",
    devServer: {
      compress: false,
      historyApiFallback: true,
      proxy: {
        "/api": "http://localhost:7071",
        changeOrigin: true,
      },
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: "all",
    //     name: false,
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["autoprefixer"]],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                // Prefer Dart Sass
                implementation: require("sass"),
                sassOptions: {
                  includePaths: ["./node_modules"],
                },
              },
            },
          ],
        },
        {
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
    },
    output: {
      filename: "[name]-[chunkhash:8].js",
      path: fspath.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: "[name].[chunkhash:8].css",
        chunkFilename: "[id].css",
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: fspath.resolve(__dirname, "./index.webpack.html"),
        inject: true,
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "assets" }],
      }),
    ],
  };
};
