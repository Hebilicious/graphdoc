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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.GraphQLDocumentGenerator = void 0;
var command_1 = require("@2fd/command");
var bluebird_1 = __importDefault(require("bluebird"));
var fs_1 = __importDefault(require("fs"));
var glob_1 = __importDefault(require("glob"));
var mustache_1 = require("mustache");
var path_1 = __importDefault(require("path"));
var schema_loader_1 = require("./schema-loader");
var utility_1 = require("./utility");
var fs_2 = require("./utility/fs");
// tslint:disable-next-line:no-var-requires
var graphdocPackageJSON = require(path_1.default.resolve(__dirname, "../package.json"));
var GraphQLDocumentGenerator = /** @class */ (function (_super) {
    __extends(GraphQLDocumentGenerator, _super);
    function GraphQLDocumentGenerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = graphdocPackageJSON.description + " v" + graphdocPackageJSON.version;
        _this.params = new command_1.NoParams();
        _this.flags = [
            new command_1.ValueFlag("configFile", ["-c", "--config"], "Configuration file [./package.json].", String, "./package.json"),
            new command_1.ValueFlag("endpoint", ["-e", "--endpoint"], 'Graphql http endpoint ["https://domain.com/graphql"].'),
            new command_1.ListValueFlag("headers", ["-x", "--header"], 'HTTP header for request (use with --endpoint). ["Authorization: Token cb8795e7"].'),
            new command_1.ListValueFlag("queries", ["-q", "--query"], 'HTTP querystring for request (use with --endpoint) ["token=cb8795e7"].'),
            new command_1.ValueFlag("schemaFile", ["-s", "--schema", "--schema-file"], 'Graphql Schema file ["./schema.json"].'),
            new command_1.ListValueFlag("plugins", ["-p", "--plugin"], "Use plugins [default=graphdoc/plugins/default]."),
            new command_1.ValueFlag("template", ["-t", "--template"], "Use template [default=graphdoc/template/slds]."),
            new command_1.ValueFlag("output", ["-o", "--output"], "Output directory."),
            new command_1.ValueFlag("data", ["-d", "--data"], "Inject custom data.", JSON.parse, {}),
            new command_1.ValueFlag("baseUrl", ["-b", "--base-url"], "Base url for templates."),
            new command_1.BooleanFlag("force", ["-f", "--force"], "Delete outputDirectory if exists."),
            new command_1.BooleanFlag("verbose", ["-v", "--verbose"], "Output more information."),
            new command_1.BooleanFlag("version", ["-V", "--version"], "Show graphdoc version.")
        ];
        return _this;
    }
    GraphQLDocumentGenerator.prototype.action = function (input, out) {
        return __awaiter(this, void 0, void 0, function () {
            var output, projectPackageJSON_1, schema, plugins_1, assets, partials_1, renderTypes, files, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        output = new utility_1.Output(out, input.flags);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        if (input.flags.version) {
                            return [2 /*return*/, output.out.log("graphdoc v%s", graphdocPackageJSON.version)];
                        }
                        return [4 /*yield*/, this.getProjectPackage(input)];
                    case 2:
                        projectPackageJSON_1 = _a.sent();
                        return [4 /*yield*/, this.getSchema(projectPackageJSON_1)];
                    case 3:
                        schema = _a.sent();
                        plugins_1 = this.getPluginInstances(projectPackageJSON_1.graphdoc.plugins, schema, projectPackageJSON_1, graphdocPackageJSON);
                        projectPackageJSON_1.graphdoc.plugins.forEach(function (plugin) {
                            return output.info("use plugin", plugin);
                        });
                        return [4 /*yield*/, utility_1.Plugin.collectAssets(plugins_1)];
                    case 4:
                        assets = _a.sent();
                        assets.forEach(function (asset) {
                            return output.info("use asset", path_1.default.relative(process.cwd(), asset));
                        });
                        // Ensure Ourput directory
                        output.info("output directory", path_1.default.relative(process.cwd(), projectPackageJSON_1.graphdoc.output));
                        return [4 /*yield*/, this.ensureOutputDirectory(projectPackageJSON_1.graphdoc.output, projectPackageJSON_1.graphdoc.force)];
                    case 5:
                        _a.sent();
                        // Create Output directory
                        return [4 /*yield*/, fs_2.createBuildDirectory(projectPackageJSON_1.graphdoc.output, projectPackageJSON_1.graphdoc.template, assets)];
                    case 6:
                        // Create Output directory
                        _a.sent();
                        return [4 /*yield*/, this.getTemplatePartials(projectPackageJSON_1.graphdoc.template)];
                    case 7:
                        partials_1 = _a.sent();
                        // Render index.html
                        output.info("render", "index");
                        return [4 /*yield*/, this.renderFile(projectPackageJSON_1, partials_1, plugins_1)];
                    case 8:
                        _a.sent();
                        renderTypes = []
                            .concat(schema.types || [])
                            .concat(schema.directives || [])
                            .map(function (type) {
                            output.info("render", type.name || "");
                            return _this.renderFile(projectPackageJSON_1, partials_1, plugins_1, type);
                        });
                        return [4 /*yield*/, Promise.all(renderTypes)];
                    case 9:
                        files = _a.sent();
                        output.ok("complete", String(files.length + 1 /* index.html */) + " files generated.");
                        return [3 /*break*/, 11];
                    case 10:
                        err_1 = _a.sent();
                        output.error(err_1);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    GraphQLDocumentGenerator.prototype.ensureOutputDirectory = function (dir, force) {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                try {
                    stats = fs_1.default.statSync(dir);
                    if (!stats.isDirectory()) {
                        return [2 /*return*/, Promise.reject(new Error("Unexpected output: " + dir + " is not a directory."))];
                    }
                    if (!force) {
                        return [2 /*return*/, Promise.reject(new Error(dir + " already exists (delete it or use the --force flag)"))];
                    }
                    return [2 /*return*/, fs_2.removeBuildDirectory(dir)];
                }
                catch (err) {
                    return [2 /*return*/, err.code === "ENOENT" ? Promise.resolve() : Promise.reject(err)];
                }
                return [2 /*return*/];
            });
        });
    };
    GraphQLDocumentGenerator.prototype.getProjectPackage = function (input) {
        var packageJSON;
        try {
            packageJSON = require(path_1.default.resolve(input.flags.configFile));
        }
        catch (err) {
            packageJSON = {};
        }
        packageJSON.graphdoc = __assign(__assign({}, (packageJSON.graphdoc || {})), input.flags);
        if (packageJSON.graphdoc.data) {
            var data = packageJSON.graphdoc.data;
            packageJSON.graphdoc = __assign(__assign({}, data), packageJSON.graphdoc);
        }
        if (packageJSON.graphdoc.plugins.length === 0) {
            packageJSON.graphdoc.plugins = ["graphdoc/plugins/default"];
        }
        packageJSON.graphdoc.baseUrl = packageJSON.graphdoc.baseUrl || "./";
        packageJSON.graphdoc.template = fs_2.resolve(packageJSON.graphdoc.template || "graphdoc/template/slds");
        packageJSON.graphdoc.output = path_1.default.resolve(packageJSON.graphdoc.output);
        packageJSON.graphdoc.version = graphdocPackageJSON.version;
        if (!packageJSON.graphdoc.output) {
            return Promise.reject(new Error("Flag output (-o, --output) is required"));
        }
        return Promise.resolve(packageJSON);
    };
    GraphQLDocumentGenerator.prototype.getPluginInstances = function (paths, schema, projectPackageJSON, pluginGraphdocPackageJSON) {
        return paths.map(function (p) {
            var absolutePaths = fs_2.resolve(p);
            var plugin = require(absolutePaths).default;
            return typeof plugin === "function"
                ? // plugins as constructor
                    new plugin(schema, projectPackageJSON, pluginGraphdocPackageJSON)
                : // plugins plain object
                    plugin;
        });
    };
    GraphQLDocumentGenerator.prototype.getTemplatePartials = function (templateDir) {
        return __awaiter(this, void 0, void 0, function () {
            var partials, files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        partials = {};
                        return [4 /*yield*/, bluebird_1.default.promisify(function (pattern, options, cb) { return glob_1.default(pattern, options, cb); })("**/*.mustache", { cwd: templateDir })];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, Promise.all(files.map(function (file) {
                                var name = path_1.default.basename(file, ".mustache");
                                return fs_2.readFile(path_1.default.resolve(templateDir, file), "utf8").then(function (content) { return (partials[name] = content); });
                            }))];
                    case 2:
                        _a.sent();
                        if (!partials.index) {
                            throw new Error("The index partial is missing (file " + path_1.default.resolve(templateDir, "index.mustache") + " not found).");
                        }
                        return [2 /*return*/, partials];
                }
            });
        });
    };
    GraphQLDocumentGenerator.prototype.getSchema = function (projectPackage) {
        return __awaiter(this, void 0, void 0, function () {
            var schemaFileExt;
            return __generator(this, function (_a) {
                if (projectPackage.graphdoc.schemaFile) {
                    schemaFileExt = path_1.default.extname(projectPackage.graphdoc.schemaFile);
                    switch (schemaFileExt) {
                        case ".json":
                            return [2 /*return*/, schema_loader_1.jsonSchemaLoader(projectPackage.graphdoc)];
                        case ".gql":
                        case ".gqls":
                        case ".graphqls":
                        case ".graphql":
                            return [2 /*return*/, schema_loader_1.idlSchemaLoader(projectPackage.graphdoc)];
                        case ".js":
                            return [2 /*return*/, schema_loader_1.jsSchemaLoader(projectPackage.graphdoc)];
                        default:
                            return [2 /*return*/, Promise.reject(new Error("Unexpected schema extension name: " + schemaFileExt))];
                    }
                }
                else if (projectPackage.graphdoc.endpoint) {
                    return [2 /*return*/, schema_loader_1.httpSchemaLoader(projectPackage.graphdoc)];
                }
                else {
                    return [2 /*return*/, Promise.reject(new Error("Endpoint (--endpoint, -e) or Schema File (--schema, -s) are require."))];
                }
                return [2 /*return*/];
            });
        });
    };
    GraphQLDocumentGenerator.prototype.renderFile = function (projectPackageJSON, partials, plugins, type) {
        return __awaiter(this, void 0, void 0, function () {
            var templateData, file, filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utility_1.createData(projectPackageJSON, graphdocPackageJSON, plugins, type)];
                    case 1:
                        templateData = _a.sent();
                        file = type ? utility_1.getFilenameOf(type) : "index.html";
                        filePath = path_1.default.resolve(projectPackageJSON.graphdoc.output, file);
                        return [2 /*return*/, fs_2.writeFile(filePath, mustache_1.render(partials.index, templateData, partials))];
                }
            });
        });
    };
    return GraphQLDocumentGenerator;
}(command_1.Command));
exports.GraphQLDocumentGenerator = GraphQLDocumentGenerator;
