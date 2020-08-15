"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var navigation_interface_1 = __importDefault(require("../navigation.interface"));
var empty_schema_json_1 = __importDefault(require("./empty.schema.json"));
var projectPackage_json_1 = __importDefault(require("./projectPackage.json"));
describe("pĺugins/navigation.interface#NavigationInterfaces", function () {
    var plugin = new navigation_interface_1.default(empty_schema_json_1.default.data.__schema, projectPackage_json_1.default, {});
    test("plugin return navigation", function () {
        var nav = plugin.getNavigations("Query");
        expect(nav).toBeInstanceOf(Array);
        expect(nav).toEqual([]);
    });
});
