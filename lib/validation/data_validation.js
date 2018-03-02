"use strict";
const AJV = require("ajv");
const ajv = new AJV({ allErrors: true, useDefaults: true });

function dataValidation(data, schema) {
  var _data = data;
  var _schema = schema;

  if (!_data || !_schema) {
    throw new Error("missing data or schema parameter.");
  }
  var _validate = ajv.compile(_schema);

  var valid = _validate(_data);
  if (!valid) {
    var errors = ajv.errorsText(_validate.errors);
    return errors;
  } else {
    return null;
  }
}

module.exports = dataValidation;
