"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var bluebird_1 = __importDefault(require("bluebird"));
var fs_1 = __importDefault(require("fs"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
/**
 * resolve
 *
 * transform a path relative to absolute, if relative
 * path start with `graphdoc/` return absolute path to
 * plugins directory
 */
var MODULE_BASE_PATH = "graphdoc/";
function resolve(relative) {
    if (relative.slice(0, MODULE_BASE_PATH.length) === MODULE_BASE_PATH) {
        return path_1.default.resolve(__dirname, "../../", relative.slice(MODULE_BASE_PATH.length));
    }
    return path_1.default.resolve(relative);
}
exports.resolve = resolve;
/**
 * Execute fs.read as Promise
 */
exports.readFile = bluebird_1.default.promisify(fs_1.default.readFile);
exports.writeFile = bluebird_1.default.promisify(function (file, data, cb) {
    return fs_1.default.writeFile(file, data, cb);
});
exports.copyAll = bluebird_1.default.promisify(function (from, to, cb) {
    return fs_extra_1.default.copy(from, to, cb);
});
exports.readDir = bluebird_1.default.promisify(fs_1.default.readdir);
exports.mkDir = bluebird_1.default.promisify(fs_1.default.mkdir);
exports.removeBuildDirectory = bluebird_1.default.promisify(fs_extra_1.default.remove);
/**
 * Create build directory from a template directory
 */
function createBuildDirectory(buildDirectory, templateDirectory, assets) {
    return __awaiter(this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.readDir(templateDirectory)];
                case 1:
                    files = _a.sent();
                    return [4 /*yield*/, bluebird_1.default.all(files
                            // ignore *.mustache templates
                            .filter(function (file) { return path_1.default.extname(file) !== ".mustache"; })
                            // copy recursive
                            .map(function (file) {
                            return exports.copyAll(path_1.default.resolve(templateDirectory, file), path_1.default.resolve(buildDirectory, file));
                        }))];
                case 2:
                    _a.sent();
                    // create assets directory
                    return [4 /*yield*/, exports.mkDir(path_1.default.resolve(buildDirectory, "assets"))];
                case 3:
                    // create assets directory
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.default.all(assets.map(function (asset) {
                            return exports.copyAll(asset, path_1.default.resolve(buildDirectory, "assets", path_1.default.basename(asset)));
                        }))];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createBuildDirectory = createBuildDirectory;
