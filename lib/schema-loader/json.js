"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
exports.jsonSchemaLoader = function (options) {
    try {
        var schemaPath = path_1.resolve(options.schemaFile);
        var introspection = require(schemaPath);
        var schema = introspection.__schema ||
            introspection.data.__schema;
        return Promise.resolve(schema);
    }
    catch (err) {
        return Promise.reject(err);
    }
};
