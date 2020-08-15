"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
var Output = /** @class */ (function () {
    function Output(out, options) {
        this.out = out;
        this.options = options;
    }
    Output.prototype.ok = function (ref, value) {
        this.out.log("%c ✓ %s: %c%s", "color:green", ref, "color:grey", value);
    };
    Output.prototype.info = function (ref, value) {
        if (this.options.verbose) {
            this.out.log("%c ❭ %s: %c%s", "color:yellow", ref, "color:grey", value);
        }
    };
    Output.prototype.error = function (err) {
        this.out.error("%c ✗ %s", "color:red", err.message || err);
        if (this.options.verbose) {
            this.out.error("%c%s", "color:grey", err.stack || "    NO STACK");
        }
        this.out.error("");
        process.exit(1);
    };
    return Output;
}());
exports.Output = Output;
