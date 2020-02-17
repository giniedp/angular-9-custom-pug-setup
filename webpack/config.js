"use strict"

function hasFlag(name) {
  const argv = require("yargs").argv
  return argv[name] != null && argv[name] !== "false"
}

const path = require("path")
const cwd = process.cwd()

const config = {
  cwd: cwd,
  tmpDir: path.join(cwd, "tmp"),
  isAot: hasFlag("aot"),
  isIvy: hasFlag("ivy"),
  isTest: hasFlag("test"),
  useCache: hasFlag("cache"),
  frontend: {
    srcDir: path.join(cwd, "src"),
    outDir: path.join(cwd, "dist", "my-app"),
    tsconfigFile: path.join(cwd, "tsconfig.json"),
    tsconfigAppFile: path.join(cwd, "tsconfig.app.json"),
    tsconfigTestFile: path.join(cwd, "tsconfig.spec.json"),
    entry: {
      test: path.join(cwd, "src/test.ts"),
      main: path.join(cwd, "src/main.ts"),
      polyfills: path.join(cwd, "src/polyfills.ts"),
    },
  }
}

module.exports = config
