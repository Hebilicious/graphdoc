"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTypes = exports.DocumentSection = exports.NavigationItem = exports.NavigationSection = exports.Plugin = void 0;
var url_1 = __importDefault(require("url"));
var introspection_1 = require("./introspection");
/**
 * Plugin Base implementation
 */
var Plugin = /** @class */ (function () {
    // getNavigations?: (buildForType?: string) => NavigationSectionInterface[] | PromiseLike<NavigationSectionInterface[]>;
    // getDocuments?: (buildForType?: string) => DocumentSectionInterface[] | PromiseLike<DocumentSectionInterface[]>;
    // getHeaders?: (buildForType?: string) => string[] | PromiseLike<string[]>;
    // getAssets?: () => string[] | PromiseLike<string[]>;
    function Plugin(document, projectPackage, graphdocPackage) {
        var _this = this;
        this.document = document;
        this.projectPackage = projectPackage;
        this.graphdocPackage = graphdocPackage;
        this.queryType = null;
        this.mutationType = null;
        this.subscriptionType = null;
        this.typeMap = {};
        this.directiveMap = {};
        this.document.types = this.document.types
            ? this.document.types.sort(sortTypes)
            : [];
        this.document.directives = this.document.directives
            ? this.document.directives.sort(function (a, b) {
                return (a.name || "").localeCompare(b.name || "");
            })
            : [];
        this.document.types.forEach(function (type) {
            _this.typeMap[type.name || ""] = type;
        });
        this.document.directives.forEach(function (directive) {
            _this.directiveMap[directive.name || ""] = directive;
        });
        if (document.queryType) {
            this.queryType = this.typeMap[document.queryType.name || ""];
        }
        if (document.mutationType) {
            this.mutationType = this.typeMap[document.mutationType.name || ""];
        }
        if (document.subscriptionType) {
            this.subscriptionType = this.typeMap[document.subscriptionType.name || ""];
        }
    }
    Plugin.collect = function (collection) {
        var result = [];
        collection.forEach(function (item) {
            if (Array.isArray(item)) {
                result = result.concat(item);
            }
        });
        return result;
    };
    Plugin.collectNavigations = function (plugins, buildForType) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(plugins.map(function (plugin) {
                            return plugin.getNavigations
                                ? plugin.getNavigations(buildForType)
                                : null;
                        }))];
                    case 1:
                        navigationCollection = _a.sent();
                        return [2 /*return*/, Plugin.collect(navigationCollection)];
                }
            });
        });
    };
    Plugin.collectDocuments = function (plugins, buildForType) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(plugins.map(function (plugin) {
                            return plugin.getDocuments
                                ? plugin.getDocuments(buildForType)
                                : null;
                        }))];
                    case 1:
                        navigationCollection = _a.sent();
                        return [2 /*return*/, Plugin.collect(navigationCollection)];
                }
            });
        });
    };
    Plugin.collectHeaders = function (plugins, buildForType) {
        return __awaiter(this, void 0, void 0, function () {
            var headerCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(plugins.map(function (plugin) {
                            return plugin.getHeaders
                                ? plugin.getHeaders(buildForType)
                                : null;
                        }))];
                    case 1:
                        headerCollection = _a.sent();
                        return [2 /*return*/, Plugin.collect(headerCollection)];
                }
            });
        });
    };
    Plugin.collectAssets = function (plugins) {
        return __awaiter(this, void 0, void 0, function () {
            var assetCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(plugins.map(function (plugin) {
                            return plugin.getAssets ? plugin.getAssets() : null;
                        }))];
                    case 1:
                        assetCollection = _a.sent();
                        return [2 /*return*/, Plugin.collect(assetCollection)];
                }
            });
        });
    };
    Plugin.prototype.url = function (type) {
        return url_1.default.resolve(this.projectPackage.graphdoc.baseUrl, introspection_1.getFilenameOf(type));
    };
    return Plugin;
}());
exports.Plugin = Plugin;
/**
 * NavigationSectionInterface short implementation
 */
// tslint:disable-next-line:max-classes-per-file
var NavigationSection = /** @class */ (function () {
    function NavigationSection(title, items) {
        if (items === void 0) { items = []; }
        this.title = title;
        this.items = items;
    }
    return NavigationSection;
}());
exports.NavigationSection = NavigationSection;
/**
 * NavigationItemInterface short implementation
 */
// tslint:disable-next-line:max-classes-per-file
var NavigationItem = /** @class */ (function () {
    function NavigationItem(text, href, isActive) {
        this.text = text;
        this.href = href;
        this.isActive = isActive;
    }
    return NavigationItem;
}());
exports.NavigationItem = NavigationItem;
/**
 * DocumentSectionInterface short implementation
 */
// tslint:disable-next-line:max-classes-per-file
var DocumentSection = /** @class */ (function () {
    function DocumentSection(title, description) {
        this.title = title;
        this.description = description;
    }
    return DocumentSection;
}());
exports.DocumentSection = DocumentSection;
function priorityType(type) {
    var name = type.name || "";
    if (name[0] === "_" && name[1] === "_") {
        return 2;
    }
    else if (name[0] === "_") {
        return 1;
    }
    else {
        return 0;
    }
}
function sortTypes(a, b) {
    var priorityA = priorityType(a);
    var priorityB = priorityType(b);
    if (priorityA === priorityB) {
        return (a.name || "").localeCompare(b.name || "");
    }
    else {
        return priorityA - priorityB;
    }
}
exports.sortTypes = sortTypes;
