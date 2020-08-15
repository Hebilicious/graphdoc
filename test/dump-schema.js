"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var graphql_1 = require("graphql");
var schema_1 = require("./schema");
fs_1.writeFileSync(__dirname + "/starwars.graphql", graphql_1.printSchema(schema_1.StarWarsSchema));
