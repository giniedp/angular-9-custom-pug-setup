"use strict"

const config = require("./config")

module.exports = require(config.isTest ? "./build-test.js" : "./build-app.js")
