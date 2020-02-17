"use strict";

const path = require("path");
const webpackMerge = require("webpack-merge");
const config = require("./config");

const base = require("./base.js");

module.exports = [
  webpackMerge(base, {
    devtool: "source-map",
    entry: {
      tests: [
        config.frontend.entry.polyfills,
        config.frontend.entry.test,
      ]
    },
    optimization: {
      occurrenceOrder: true,
      splitChunks: false
    },
    output: {
      path: config.frontend.outDir,
      publicPath: "/",
      filename: "[name].js",
      sourceMapFilename: "[file].map",
      chunkFilename: path.join("tests", "[id].js")
    }
  })
];
