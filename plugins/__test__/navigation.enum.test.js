"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var navigation_enum_1 = __importDefault(require("../navigation.enum"));
var empty_schema_json_1 = __importDefault(require("./empty.schema.json"));
var projectPackage_json_1 = __importDefault(require("./projectPackage.json"));
describe("pĺugins/navigation.directive#NavigationDirectives", function () {
    var plugin = new navigation_enum_1.default(empty_schema_json_1.default.data.__schema, projectPackage_json_1.default, {});
    test("plugin return navigation", function () {
        var navigations = plugin.getNavigations("Query");
        expect(navigations).toBeInstanceOf(Array);
        expect(navigations).toEqual([
            {
                title: "Enums",
                items: [
                    {
                        text: "__DirectiveLocation",
                        href: "/directivelocation.spec.html",
                        isActive: false
                    },
                    { text: "__TypeKind", href: "/typekind.spec.html", isActive: false }
                ]
            }
        ]);
    });
});
