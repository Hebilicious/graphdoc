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
var NavigationSchema = /** @class */ (function (_super) {
    __extends(NavigationSchema, _super);
    function NavigationSchema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationSchema.prototype.getNavigations = function (buildFrom) {
        var section = new utility_1.NavigationSection("Schema", []);
        // Query
        if (this.document.queryType) {
            section.items.push(new utility_1.NavigationItem(this.document.queryType.name, this.url(this.document.queryType), buildFrom === this.document.queryType.name));
        }
        // Mutation
        if (this.document.mutationType) {
            section.items.push(new utility_1.NavigationItem(this.document.mutationType.name, this.url(this.document.mutationType), buildFrom === this.document.mutationType.name));
        }
        // Subscription
        if (this.document.subscriptionType) {
            section.items.push(new utility_1.NavigationItem(this.document.subscriptionType.name, this.url(this.document.subscriptionType), buildFrom === this.document.subscriptionType.name));
        }
        return [section];
    };
    return NavigationSchema;
}(utility_1.Plugin));
exports.default = NavigationSchema;
