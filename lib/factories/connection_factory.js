"use strict";
const Constant = require("../helpers/constants.js");
const mysql = require("mysql");
const redis = require("redis");

function ConnectionFactory() {
  var _self = this;

  _self.createMySqlPool = function() {
    var _connectionPool = mysql.createPool({
      host: Constant.ENV.RDS_HOST,
      user: Constant.ENV.RDS_USER,
      password: Constant.ENV.RDS_PASSWORD,
      database: Constant.ENV.RDS_DATABASE,
      waitForConnections: true,
      multipleStatements: true,
      connectionLimit: 50,
      connectTimeout: 2000,
      acquireTimeout: 3000,
      timezone: "Z",
      supportBigNumbers: true
    });
    return _connectionPool;
  };

  _self.createRedisConnection = function() {
    var redisConfig;
    if (Constant.ENV.REDIS_ENDPOINT) {
      redisConfig = {
        host: Constant.ENV.REDIS_ENDPOINT,
        port: Constant.ENV.REDIS_PORT,
        expiration: Constant.ENV.REDIS_EXPIRATION
      };
    }

    var Connections = {};

    function newConnection() {
      var redisClient = redis.createClient(redisConfig.port, redisConfig.host);
      return redisClient;
    }

    var redisConnection = function(type) {
      type = type || "DEFAULT";

      if (!Connections[type] || !Connections[type].connected) {
        Connections[type] = newConnection();
      }
      return Connections[type];
    };

    var cbTokenConnection = function() {
      return redisConnection("access_token");
    };

    return {
      redisConnection: redisConnection(),
      cbTokenConnection: cbTokenConnection()
    };
  };
}

module.exports = ConnectionFactory;
