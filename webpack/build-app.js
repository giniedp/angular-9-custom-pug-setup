"use strict";

const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const base = require("./base.js");

const config = require("./config");

module.exports = [
  webpackMerge(base, {
    devtool: "source-map",
    entry: {
      main: [
        config.frontend.entry.polyfills,
        config.frontend.entry.main,
      ]
    },
    output: {
      futureEmitAssets: true,
      path: config.frontend.outDir,
      publicPath: "/",
      filename: "[name].js",
      sourceMapFilename: "[file].map",
      chunkFilename: path.join("chunks", "[id].js")
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(config.frontend.srcDir, "index.html")
      }),
      new CompressionPlugin({
        threshold: 64 * 1024,
        minRatio: 0.7
      })
    ]
  })
];
