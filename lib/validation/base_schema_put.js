"use strict";

const BaseSchemaPUT = {
  properties: {
    id: {},
    email_address: { type: "string", maxLength: 255, format: "email" }
  },
  required: ["email_address"]
};

module.exports = BaseSchemaPUT;
