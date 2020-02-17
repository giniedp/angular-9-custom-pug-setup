"use strict";

const webpackBase = require("./base-common");
const webpackMerge = require("webpack-merge");
const { AngularCompilerPlugin, NgToolsLoader } = require("@ngtools/webpack");
const config = require("./config");

module.exports = webpackMerge.strategy({
  "module.rules": "prepend",
  plugins: "prepend"
})(webpackBase, {
  module: {
    rules: [
      {
        test: !config.isAot
          ? /\.tsx?$/
          : /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: NgToolsLoader
      }
    ]
  },
  plugins: [createAngularCompiler()]
});

function createAngularCompiler() {
  return new AngularCompilerPlugin({
    platform: 0, // browser
    mainPath: config.isTest
      ? config.frontend.entry.test
      : config.frontend.entry.main,
    tsConfigPath: config.isTest
      ? config.frontend.tsconfigTestFile
      : config.frontend.tsconfigAppFile,

    skipCodeGeneration: !config.isAot,
    sourceMap: true,
    forkTypeChecker: true,
    directTemplateLoading: false,

    nameLazyFiles: true,
    emitClassMetadata: true,
    emitNgModuleScope: true,
    // https://angular.io/guide/angular-compiler-options
    compilerOptions: {
      fullTemplateTypeCheck: true,
      strictInjectionParameters: true,
      strictTemplates: false,
      enableIvy: config.isIvy
    }
  });
}
