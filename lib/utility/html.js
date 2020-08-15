"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = exports.HTML = void 0;
var introspection_1 = require("./introspection");
var HTML = /** @class */ (function () {
    function HTML() {
        this.index = 1;
    }
    HTML.prototype.code = function (code) {
        return "<code class=\"highlight\"><table class=\"code\"><tbody>" + code + "</tbody></table></code>";
    };
    HTML.prototype.highlight = function (text) {
        return "<strong>" + text + "</strong>";
    };
    HTML.prototype.sup = function (text) {
        return " <sup>" + text + "</sup>";
    };
    HTML.prototype.line = function (code) {
        var row = this.index++;
        return "<tr class=\"row\"><td id=\"L" + row + "\" class=\"td-index\">" + row + "</td><td id=\"LC" + row + "\" class=\"td-code\">" + (code ||
            "") + "</td></tr>";
    };
    HTML.prototype.tab = function (code) {
        return "<span class=\"tab\">" + code + "</span>";
    };
    HTML.prototype.keyword = function (keyword) {
        return "<span class=\"keyword operator ts\">" + keyword + "</span>";
    };
    HTML.prototype.comment = function (comment) {
        return "<span class=\"comment line\"># " + comment + "</span>";
    };
    HTML.prototype.identifier = function (type) {
        return "<span class=\"identifier\">" + type.name + "</span>";
    };
    HTML.prototype.parameter = function (arg) {
        return "<span class=\"variable parameter\">" + arg.name + "</span>";
    };
    HTML.prototype.property = function (name) {
        return "<span class=\"meta\">" + name + "</span>";
    };
    HTML.prototype.useIdentifier = function (type, toUrl) {
        switch (type.kind) {
            case introspection_1.LIST:
                return ("[" + this.useIdentifier(type.ofType, toUrl) + "]");
            case introspection_1.NON_NULL:
                return this.useIdentifier(type.ofType, toUrl) + "!";
            default:
                return "<a class=\"support type\" href=\"" + toUrl + "\">" + type.name + "</a>";
        }
    };
    HTML.prototype.useIdentifierLength = function (type, base) {
        if (base === void 0) { base = 0; }
        switch (type.kind) {
            case introspection_1.LIST:
                return this.useIdentifierLength(type.ofType, base + 2);
            case introspection_1.NON_NULL:
                return this.useIdentifierLength(type.ofType, base + 1);
            default:
                return base + (type.name || "").length;
        }
    };
    HTML.prototype.value = function (val) {
        return val[0] === '"'
            ? "<span class=\"string\">" + val + "</span>"
            : "<span class=\"constant numeric\">" + val + "</span>";
    };
    return HTML;
}());
exports.HTML = HTML;
function split(text, len) {
    return text.split(/\s+/).reduce(function (result, word) {
        var last = result.length - 1;
        var lineLen = result[last].length;
        if (lineLen === 0) {
            result[last] = word;
        }
        else if (lineLen < len) {
            result[last] = result[last] + " " + word;
        }
        else {
            result.push(word);
        }
        return result;
    }, [""]);
}
exports.split = split;
