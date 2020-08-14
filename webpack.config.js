const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const pathJoin = (subPath) => path.join(__dirname, subPath);

module.exports = {
  entry: pathJoin("src/index.tsx"),
  output: {
    filename: "bundle.js",
    path: pathJoin("dist"),
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: pathJoin("src/index.html"),
    }),
    new CopyPlugin({
      patterns: [{ from: pathJoin("static"), to: pathJoin("dist") }],
    }),
    new Dotenv({
      safe: true,
      systemvars: true,
    }),
  ],
};
