"use strict";
const Constant = require("../helpers/constants.js");
const winston = require("winston");
const CloudWatchTransport = require("winston-aws-cloudwatch");

//const SnsTransport = require("winston-sns-sumo-logic");
//const NewRelicErrorTransport = require('newrelic-winston');
//const FirehoseTransport = require('winston-firehose');

const utils = require("util");

var Logger = function() {
  winston.colorize = true;
  var logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        json: false,
        colorize: true,
        level: Constant.ENV.LOG_LEVEL || "verbose",
        humanReadableUnhandledException: true,
        timestamp: function() {
          return new Date().toISOString();
        },
        formatter: function(item) {
          var msg = item.message ? item.message : "";
          var meta = item.meta && Object.keys(item.meta).length ? "\n" + JSON.stringify(item.meta) : "";
          return utils.format("%s: [%s] %s %j", winston.config.colorize(item.level, item.level.toUpperCase()), this.timestamp(), winston.config.colorize(item.level, "-"), msg, winston.config.colorize("debug", meta));
        }
      })
    ]
  });
  //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

  //winston.add(winston.transports.Redis, options)

  return logger;
};

module.exports = new Logger();
