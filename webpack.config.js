const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
    // questions: "./src/Questions/index.js",
    // results: "./src/Results/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "questionnaire.min.js",
    library: "questionnaire",
    // filename: "[name].min.js",
    // library: "[name]",
    libraryTarget: "var"
  },
  externals: {
    "chart.js": "Chart",
    jquery: "jQuery",
    moment: "Moment"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
        ]
      }
      // {
      //   test: /\.json$/,
      //   type: "javascript/auto",
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "data/[name].[ext]"
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "questionnaire.min.css"
      // filename: "[name].min.css"
      // filename: "main.min.css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  devServer: {
    port: 8080,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
};
