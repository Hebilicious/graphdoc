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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var word_wrap_1 = __importDefault(require("word-wrap"));
var utility_1 = require("../../lib/utility");
var MAX_CODE_LEN = 80;
// const MAX_COMMENT_LEN = 80;
var SchemaPlugin = /** @class */ (function (_super) {
    __extends(SchemaPlugin, _super);
    function SchemaPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SchemaPlugin.prototype.getHeaders = function () {
        return [
            '<link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700" rel="stylesheet">',
            '<link type="text/css" rel="stylesheet" href="./assets/code.css" />',
            '<script src="./assets/line-link.js"></script>'
        ];
    };
    SchemaPlugin.prototype.getAssets = function () {
        return [
            path_1.resolve(__dirname, "assets/code.css"),
            path_1.resolve(__dirname, "assets/line-link.js")
        ];
    };
    SchemaPlugin.prototype.getDocuments = function (buildForType) {
        this.html = new utility_1.HTML();
        var code = this.code(buildForType);
        if (code) {
            return [
                new utility_1.DocumentSection("GraphQL Schema definition", this.html.code(code))
            ];
        }
        return [];
    };
    SchemaPlugin.prototype.code = function (buildForType) {
        if (!buildForType) {
            return this.schema(this.document);
        }
        var directive = this.document.directives.find(function (eachDirective) { return eachDirective.name === buildForType; });
        if (directive) {
            return this.directive(directive);
        }
        var type = this.document.types.find(function (eachType) { return eachType.name === buildForType; });
        if (type) {
            switch (type.kind) {
                case utility_1.SCALAR:
                    return this.scalar(type);
                case utility_1.OBJECT:
                    return this.object(type);
                case utility_1.INTERFACE:
                    return this.interfaces(type);
                case utility_1.UNION:
                    return this.union(type);
                case utility_1.ENUM:
                    return this.enum(type);
                case utility_1.INPUT_OBJECT:
                    return this.inputObject(type);
            }
        }
        throw new TypeError("Unexpected type: " + buildForType);
    };
    SchemaPlugin.prototype.argument = function (arg) {
        return (this.html.property(arg.name) +
            ": " +
            this.html.useIdentifier(arg.type, this.url(arg.type)) // + ' ' + this.deprecated(arg);
        );
    };
    SchemaPlugin.prototype.argumentLength = function (arg) {
        return arg.name.length + 1 + this.html.useIdentifierLength(arg.type);
    };
    SchemaPlugin.prototype.arguments = function (fieldOrDirectives) {
        var _this = this;
        if (fieldOrDirectives.args.length === 0) {
            return "";
        }
        return ("(" +
            fieldOrDirectives.args.map(function (arg) { return _this.argument(arg); }).join(", ") +
            ")");
    };
    SchemaPlugin.prototype.argumentsLength = function (fieldOrDirectives) {
        var _this = this;
        if (fieldOrDirectives.args.length === 0) {
            return 0;
        }
        return fieldOrDirectives.args.reduce(function (sum, arg) { return sum + _this.argumentLength(arg); }, 2);
    };
    SchemaPlugin.prototype.argumentsMultiline = function (fieldOrDirectives) {
        var _this = this;
        if (fieldOrDirectives.args.length === 0) {
            return [];
        }
        var maxIndex = fieldOrDirectives.args.length - 1;
        return fieldOrDirectives.args.map(function (arg, index) {
            return index < maxIndex ? _this.argument(arg) + "," : _this.argument(arg);
        });
    };
    SchemaPlugin.prototype.argumentDescription = function (arg) {
        var desc = arg.description === null
            ? "[" + this.html.highlight("Not documented") + "]"
            : arg.description;
        return this.description(this.html.highlight(arg.name) + ": " + desc);
    };
    SchemaPlugin.prototype.argumentsDescription = function (fieldOrDirectives) {
        var _this = this;
        if (fieldOrDirectives.args.length === 0) {
            return [];
        }
        var reduceArguments = function (descriptions, arg) {
            return descriptions.concat(_this.argumentDescription(arg));
        };
        return fieldOrDirectives.args.reduce(reduceArguments, [
            this.html.comment("Arguments")
        ]);
    };
    SchemaPlugin.prototype.deprecated = function (fieldOrEnumVal) {
        if (!fieldOrEnumVal.isDeprecated) {
            return "";
        }
        if (!fieldOrEnumVal.deprecationReason) {
            return this.html.keyword("@deprecated");
        }
        return (this.html.keyword("@deprecated") +
            "( reason: " +
            this.html.value('"' + fieldOrEnumVal.deprecationReason + '" ') +
            " )");
    };
    SchemaPlugin.prototype.deprecatedLength = function (fieldOrEnumVal) {
        if (!fieldOrEnumVal.isDeprecated) {
            return 0;
        }
        if (!fieldOrEnumVal.deprecationReason) {
            return "@deprecated".length;
        }
        return ('@deprecated( reason: "'.length +
            fieldOrEnumVal.deprecationReason.length +
            '" )'.length);
    };
    SchemaPlugin.prototype.description = function (description) {
        var _this = this;
        if (description) {
            return word_wrap_1.default(description, {
                width: MAX_CODE_LEN
            })
                .split("\n")
                .map(function (l) { return _this.html.comment(l); });
        }
        return [];
    };
    SchemaPlugin.prototype.directive = function (directive) {
        var _this = this;
        return this.html.line(this.html.keyword("directive") +
            " " +
            this.html.keyword("@" + directive.name) +
            this.arguments(directive) +
            " on " +
            directive.locations
                .map(function (location) { return _this.html.keyword(location); })
                .join(" | "));
    };
    SchemaPlugin.prototype.enum = function (type) {
        var _this = this;
        var reduceEnumValues = function (lines, enumValue) {
            return lines.concat([""], _this.description(enumValue.description), [
                _this.html.property(enumValue.name) + _this.deprecated(enumValue)
            ]);
        };
        return (this.html.line(this.html.keyword("enum") + " " + this.html.identifier(type) + " {") +
            (type.enumValues || [])
                .reduce(reduceEnumValues, [])
                .map(function (line) { return _this.html.line(_this.html.tab(line)); })
                .join("") +
            this.html.line("}"));
    };
    SchemaPlugin.prototype.field = function (field) {
        var _this = this;
        var fieldDescription = this.description(field.description);
        var argumentsDescription = this.argumentsDescription(field);
        if (fieldDescription.length > 0 && argumentsDescription.length) {
            fieldDescription.push(this.html.comment(""));
        }
        var fieldDefinition = field.args.length > 0 && this.fieldLength(field) > MAX_CODE_LEN
            ? // Multiline definition:
             __spreadArrays([
                this.html.property(field.name) + "("
            ], this.argumentsMultiline(field).map(function (l) { return _this.html.tab(l); }), [
                "): " +
                    this.html.useIdentifier(field.type, this.url(field.type)) +
                    " " +
                    this.deprecated(field)
            ]) : // Single line
            // fieldName(argumentName: ArgumentType): ReturnType [@deprecated...]
            [
                this.html.property(field.name) +
                    this.arguments(field) +
                    ": " +
                    this.html.useIdentifier(field.type, this.url(field.type)) +
                    " " +
                    this.deprecated(field)
            ];
        return []
            .concat(fieldDescription)
            .concat(argumentsDescription)
            .concat(fieldDefinition)
            .map(function (line) { return _this.html.line(_this.html.tab(line)); })
            .join("");
    };
    SchemaPlugin.prototype.fieldLength = function (field) {
        return (field.name.length +
            this.argumentsLength(field) +
            ": ".length +
            this.html.useIdentifierLength(field) +
            " ".length +
            this.deprecatedLength(field));
    };
    SchemaPlugin.prototype.fields = function (type) {
        var _this = this;
        var fields = "";
        fields += this.html.line();
        fields += (type.fields || [])
            .map(function (field) { return _this.field(field); })
            .join(this.html.line());
        if (type.fields && type.fields.length > 0) {
            fields += this.html.line();
        }
        return fields;
    };
    SchemaPlugin.prototype.inputObject = function (type) {
        return (this.html.line(this.html.keyword("input") + " " + this.html.identifier(type) + " {") +
            this.inputValues(type.inputFields || []) +
            this.html.line("}"));
    };
    SchemaPlugin.prototype.inputValues = function (inputValues) {
        var _this = this;
        return inputValues
            .map(function (inputValue) {
            return _this.html.line(_this.html.tab(_this.inputValue(inputValue)));
        })
            .join("");
    };
    SchemaPlugin.prototype.inputValue = function (arg) {
        var _this = this;
        var argDescription = this.description(arg.description);
        return []
            .concat(argDescription)
            .concat([
            this.html.property(arg.name) +
                ": " +
                this.html.useIdentifier(arg.type, this.url(arg.type)) // + ' ' + this.deprecated(arg)
        ])
            .map(function (line) { return _this.html.line(_this.html.tab(line)); })
            .join("");
    };
    SchemaPlugin.prototype.interfaces = function (type) {
        return (this.html.line(this.html.keyword("interface") + " " + this.html.identifier(type) + " {") +
            this.fields(type) +
            this.html.line("}"));
    };
    SchemaPlugin.prototype.object = function (type) {
        var _this = this;
        var interfaces = (type.interfaces || [])
            .map(function (i) { return _this.html.useIdentifier(i, _this.url(i)); })
            .join(", ");
        var implement = interfaces.length === 0
            ? ""
            : " " + this.html.keyword("implements") + " " + interfaces;
        return (this.html.line(this.html.keyword("type") +
            " " +
            this.html.identifier(type) +
            implement +
            " {") +
            this.fields(type) +
            this.html.line("}"));
    };
    SchemaPlugin.prototype.scalar = function (type) {
        return this.html.line(this.html.keyword("scalar") + " " + this.html.identifier(type));
    };
    SchemaPlugin.prototype.schema = function (schema) {
        var _this = this;
        var definition = this.html.line(this.html.keyword("schema") + " {");
        if (schema.queryType) {
            definition +=
                this.html.line() +
                    this.description(schema.queryType.description)
                        .map(function (line) { return _this.html.line(_this.html.tab(line)); })
                        .join("") +
                    this.html.line(this.html.tab(this.html.property("query") +
                        ": " +
                        this.html.useIdentifier(schema.queryType, this.url(schema.queryType))));
        }
        if (schema.mutationType) {
            definition +=
                this.html.line() +
                    this.description(schema.mutationType.description)
                        .map(function (line) { return _this.html.line(_this.html.tab(line)); })
                        .join("") +
                    this.html.line(this.html.tab(this.html.property("mutation") +
                        ": " +
                        this.html.useIdentifier(schema.mutationType, this.url(schema.mutationType))));
        }
        if (schema.subscriptionType) {
            definition +=
                this.html.line() +
                    this.description(schema.subscriptionType.description)
                        .map(function (line) { return _this.html.line(_this.html.tab(line)); })
                        .join("") +
                    this.html.line(this.html.tab(this.html.property("subscription") +
                        ": " +
                        this.html.useIdentifier(schema.subscriptionType, this.url(schema.subscriptionType))));
        }
        definition += this.html.line("}");
        return definition;
        /* .concat(
                 schema.directives
                     .map((directive) => {
                         return this.html.line(this.html.comment('DIRECTIVE')) +
                             this.description(directive.description)
                             .map(line => this.html.line(line))
                             .join('') +
                             this.code(directive.name);
                     }),
                 schema.types
                     .sort((a: SchemaType, b: SchemaType) => {
                         return order[a.kind].localeCompare(order[b.kind]);
                     })
                     .map((type) => {
                         return this.html.line(this.html.comment(type.kind)) +
                             this.description(type.description)
                             .map(line => this.html.line(line))
                             .join('') +
                             this.code(type.name);
                     }))*/
        /* return [this.schemaDefinition(schema)]
                 .concat(
                 directives.map(directive => this.directive(directive)),
                 types.map((type) => this.type(type) as string)
                 )
                 .join('\n\n') + '\n';*/
    };
    SchemaPlugin.prototype.union = function (type) {
        var _this = this;
        return this.html.line(this.html.keyword("union") +
            " " +
            this.html.identifier(type) +
            " = " +
            (type.possibleTypes || [])
                .map(function (eachType) {
                return _this.html.useIdentifier(eachType, _this.url(eachType));
            })
                .join(" | "));
    };
    return SchemaPlugin;
}(utility_1.Plugin));
exports.default = SchemaPlugin;
