"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = require("../lib/utility");
var NavigationDirectives = /** @class */ (function (_super) {
    __extends(NavigationDirectives, _super);
    function NavigationDirectives() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationDirectives.prototype.getTypes = function (buildForType) {
        var _this = this;
        return this.document.directives.map(function (directive) {
            return new utility_1.NavigationItem(directive.name, _this.url(directive), directive.name === buildForType);
        });
    };
    NavigationDirectives.prototype.getNavigations = function (buildForType) {
        var types = this.getTypes(buildForType);
        if (types.length === 0) {
            return [];
        }
        return [new utility_1.NavigationSection("Directives", types)];
    };
    return NavigationDirectives;
}(utility_1.Plugin));
exports.default = NavigationDirectives;
