const fspath = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  return {
    target: "web",
    entry: ["./src/main.tsx"],
    mode: "production",
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
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                esModule: true,
                name: "[path][name]-[hash].css",
              },
            },
            { loader: "extract-loader" },
            // { loader: "style-loader" },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                publicPath: "./",
                // esModule: true,
                // hmr: true,
              },
            },
            {
              loader: "css-loader",
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
    ],
  };
};
