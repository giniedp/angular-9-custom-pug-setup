"use strict";

const path = require("path");
const webpack = require("webpack");
const config = require("./config");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: [/node_modules/]
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".mjs", ".js", ".scss"],
    symlinks: true,
    modules: ["src", "node_modules"],
    alias: {},
    mainFields: ["es2015", "browser", "module", "main"]
  },
  resolveLoader: {
    symlinks: true,
    modules: ["webpack/loaders", "node_modules"]
  },
  module: {
    rules: [
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true }
      },
      {
        test: /\.(html)$/,
        use: ["raw-loader"]
      },
      {
        test: /\.(pug)$/,
        use: [{ loader: "apply-loader" }, { loader: "pug-loader" }]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                path.join(process.cwd(), "src"),
                path.join(process.cwd(), "node_modules")
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // so that file hashes don't change unexpectedly
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // Always replace the context for the System.import in angular/core to prevent warnings.
    // https://github.com/angular/angular/issues/11580
    // With VE the correct context is added in @ngtools/webpack, but Ivy doesn't need it at all.
    new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)/)
  ],
  stats: {
    // Add built modules information
    modules: false
  }
};
