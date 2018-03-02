const utils = require("util");

Object.defineProperty(global, "__stack", {
  get: function() {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) {
      return stack;
    };
    var err = new Error();
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, "__line", {
  get: function() {
    return __stack[1].getLineNumber();
  }
});

Object.defineProperty(global, "__function", {
  get: function() {
    return __stack[1].getFunctionName();
  }
});

Object.defineProperty(global, "__type", {
  get: function() {
    return __stack[1].getTypeName();
  }
});

Object.defineProperty(global, "__method", {
  get: function() {
    return __stack[1].getMethodName();
  }
});

Object.defineProperty(global, "__file", {
  get: function() {
    return __stack[1].getFileName();
  }
});

Object.defineProperty(global, "__current", {
  get: function() {
    var lineNumber = __stack[1].getLineNumber() || "?";
    var typeName = __stack[1].getTypeName() || "";
    var separator = typeName ? "." : "";
    var methodName = __stack[1].getMethodName() || "";
    var functionName = __stack[1].getFunctionName() || "";
    return utils.format("(%s) %s%s%s ::", lineNumber, typeName, separator, methodName || functionName);
  }
});
