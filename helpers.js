"use strict";
require("./lib/helpers/stack.js");
const Constant = require("./lib/helpers/constants.js");
const logger = require("./lib/helpers/logger.js");
const ConnectionFactory = require("./lib/factories/connection_factory.js");
const DataValidation = require("./lib/validation/data_validation.js");
const BaseModel = require("./lib/models/base_model.js");
const GETSchema = require("./lib/validation/base_schema_get.js");
const PUTSchema = require("./lib/validation/base_schema_put.js");
const POSTSchema = require("./lib/validation/base_schema_post.js");

function Helpers() {
  var _self = this;

  _self.Constant = Constant;
  _self.logger = logger;
  _self.ConnectionFactory = ConnectionFactory;
  _self.mysqlPool = function() {
    return new ConnectionFactory().createMySqlPool();
  };
  _self.createRedisConnection = function() {
    return new ConnectionFactory().createRedisConnection();
  };
  _self.DataValidation = DataValidation;
  _self.BaseModel = BaseModel;
  _self.GETSchema = GETSchema;
  _self.PUTSchema = PUTSchema;
  _self.POSTSchema = POSTSchema;
}

var helpers = new Helpers();
helpers.ConnectionFactory = ConnectionFactory;
helpers.DataValidation = DataValidation;
helpers.BaseModel = BaseModel;

module.exports = exports = helpers;
