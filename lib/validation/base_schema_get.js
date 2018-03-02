"use strict";

const BaseSchemaGET = {
  properties: {
    id: {},
    emailAddress: { type: "string", maxLength: 255, format: "email" }
  },
  required: ["emailAddress"]
};

module.exports = BaseSchemaGET;
