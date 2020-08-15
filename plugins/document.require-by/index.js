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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var striptags_1 = __importDefault(require("striptags"));
var utility_1 = require("../../lib/utility");
var RequireByPlugin = /** @class */ (function (_super) {
    __extends(RequireByPlugin, _super);
    function RequireByPlugin(document, projectPackage, graphdocPackage) {
        var _this = _super.call(this, document, projectPackage, graphdocPackage) || this;
        _this.document = document;
        _this.projectPackage = projectPackage;
        _this.graphdocPackage = graphdocPackage;
        _this.requireBy = new Map();
        if (Array.isArray(document.types)) {
            document.types.forEach(function (type) {
                switch (type.kind) {
                    // Scalars and enums have no dependencies
                    case utility_1.SCALAR:
                    case utility_1.ENUM:
                        return;
                    case utility_1.OBJECT:
                    case utility_1.INTERFACE:
                    case utility_1.UNION:
                    case utility_1.INPUT_OBJECT:
                        _this.getDependencies(type).forEach(function (curr) {
                            var deps = _this.requireBy.get(curr) || [];
                            deps.push(type);
                            _this.requireBy.set(curr, deps);
                        });
                        break;
                }
            });
        }
        return _this;
    }
    RequireByPlugin.prototype.getAssets = function () {
        return [path_1.resolve(__dirname, "require-by.css")];
    };
    RequireByPlugin.prototype.getDependencies = function (type) {
        var deps = [];
        if (Array.isArray(type.interfaces) && type.interfaces.length > 0) {
            type.interfaces.forEach(function (i) { return deps.push(i.name); });
        }
        if (Array.isArray(type.fields) && type.fields.length > 0) {
            type.fields.forEach(function (field) {
                deps.push(utility_1.getTypeOf(field.type).name);
                if (Array.isArray(field.args) && field.args.length > 0) {
                    field.args.forEach(function (arg) {
                        deps.push(utility_1.getTypeOf(arg.type).name);
                    });
                }
            });
        }
        if (Array.isArray(type.inputFields) && type.inputFields.length > 0) {
            type.inputFields.forEach(function (field) {
                deps.push(utility_1.getTypeOf(field.type).name);
            });
        }
        if (type.kind !== utility_1.INTERFACE &&
            Array.isArray(type.possibleTypes) &&
            type.possibleTypes.length > 0) {
            type.possibleTypes.forEach(function (t) {
                deps.push(utility_1.getTypeOf(t).name);
            });
        }
        return deps;
    };
    RequireByPlugin.prototype.getDescription = function (type) {
        return ("<li>" +
            '<a href="' +
            this.url(type) +
            '" title="' +
            type.name +
            " - " +
            striptags_1.default(type.description || "").replace(/"/gi, "&quot;") +
            '">' +
            type.name +
            "<em>" +
            type.description +
            "</em>" +
            "</a>" +
            "<li>");
    };
    RequireByPlugin.prototype.getDocuments = function (buildForType) {
        var _this = this;
        if (!buildForType) {
            return [];
        }
        var requireBy = this.requireBy.get(buildForType);
        if (!Array.isArray(requireBy) || requireBy.length === 0) {
            return [
                {
                    title: "Required by",
                    description: '<div class="require-by anyone">' +
                        "This element is not required by anyone" +
                        "</div>"
                }
            ];
        }
        var used = new Set();
        return [
            {
                title: "Required by",
                description: '<ul class="require-by">' +
                    requireBy
                        .filter(function (t) {
                        return used.has(t.name) ? false : used.add(t.name);
                    })
                        .map(function (t) { return _this.getDescription(t); })
                        .join("") +
                    "</ul>"
            }
        ];
    };
    RequireByPlugin.prototype.getHeaders = function () {
        return [
            '<link type="text/css" rel="stylesheet" href="./assets/require-by.css" />'
        ];
    };
    return RequireByPlugin;
}(utility_1.Plugin));
exports.default = RequireByPlugin;
