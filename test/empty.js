"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-implicit-dependencies
var express_1 = __importDefault(require("express"));
// tslint:disable-next-line:no-implicit-dependencies
var express_graphql_1 = __importDefault(require("express-graphql"));
var graphql_1 = require("graphql");
var package_json_1 = __importDefault(require("../package.json"));
var app = express_1.default();
exports.EmptySchema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        description: "Root query",
        fields: {
            version: {
                type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                resolve: function () { return package_json_1.default.version; }
            }
        }
    })
});
app.use("/graphql", express_graphql_1.default({
    schema: exports.EmptySchema,
    graphiql: true
}));
app.listen(4000);
