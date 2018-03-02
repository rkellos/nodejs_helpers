"use strict";
const logger = require("../../lib/helpers/logger.js");

function BaseModel(data) {
  if (!data) {
    logger.error("[FAIL]", "%s :: ArgumentNull: model data", __function);
    throw new Error("Data is null creating model");
  }

  return {
    id: data.id,
    emailAddress: data.email_address ? data.email_address.toLowerCase().trim() : data.email_address //varchar 255 PK, NOT NULL
  };
}

module.exports = BaseModel;
