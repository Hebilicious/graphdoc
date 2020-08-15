"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIST = "LIST";
exports.NON_NULL = "NON_NULL";
exports.SCALAR = "SCALAR";
exports.OBJECT = "OBJECT";
exports.INTERFACE = "INTERFACE";
exports.UNION = "UNION";
exports.ENUM = "ENUM";
exports.INPUT_OBJECT = "INPUT_OBJECT";
function getTypeOf(t) {
    if (t.kind === exports.LIST || t.kind === exports.NON_NULL) {
        return getTypeOf(t.ofType);
    }
    return t;
}
exports.getTypeOf = getTypeOf;
function getFilenameOf(type) {
    var name = type.kind === exports.LIST || type.kind === exports.NON_NULL
        ? getTypeOf(type).name.toLowerCase()
        : type.name.toLowerCase();
    if (name[0] === "_" && name[1] === "_") {
        return name.slice(2) + ".spec.html";
    }
    return name + ".doc.html";
}
exports.getFilenameOf = getFilenameOf;
var fullTypeFragment = "\n  fragment FullType on __Type {\n    fields(includeDeprecated: true) {\n      name\n      description\n      args {\n        ...InputValue\n      }\n      type {\n        ...TypeRef\n      }\n      isDeprecated\n      deprecationReason\n    }\n    inputFields {\n      ...InputValue\n    }\n    interfaces {\n      ...TypeRef\n    }\n    enumValues(includeDeprecated: true) {\n      name\n      description\n      isDeprecated\n      deprecationReason\n    }\n    possibleTypes {\n      ...TypeRef\n    }\n  }";
var inputValueFragment = "\n  fragment InputValue on __InputValue {\n    name\n    description\n    type { ...TypeRef }\n    defaultValue\n  }";
var typeRefFragment = "\n  fragment TypeRef on __Type {\n    kind\n    name\n    description\n    ofType {\n      kind\n      name\n      description\n      ofType {\n        kind\n        name\n        description\n        ofType {\n          kind\n          name\n          description\n          ofType {\n            kind\n            name\n            description\n            ofType {\n              kind\n              name\n              description\n              ofType {\n                kind\n                name\n                description\n                ofType {\n                  kind\n                  name\n                  description\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }";
exports.query = "query IntrospectionQuery {\n    __schema {\n      queryType { name description kind}\n      mutationType { name description kind }\n      subscriptionType { name description kind }\n      types {\n        name\n        kind\n        description\n        ...FullType\n      }\n      directives {\n        name\n        description\n        locations\n        args {\n          ...InputValue\n        }\n      }\n    }\n  }\n\n  " + fullTypeFragment + "\n  " + inputValueFragment + "\n  " + typeRefFragment + "\n";
exports.queryRoot = "query IntrospectionQuery {\n    __schema {\n      queryType { name description kind}\n      mutationType { name description kind }\n      subscriptionType { name description kind }\n    }\n  }\n";
exports.queryTypes = "query IntrospectionQuery {\n    __schema {\n      types {\n        name\n        kind\n        description\n        ...FullType\n      }\n    }\n  }\n\n  " + fullTypeFragment + "\n  " + inputValueFragment + "\n  " + typeRefFragment + "\n";
exports.queryDirectives = "query IntrospectionQuery {\n    __schema {\n      directives {\n        name\n        description\n        locations\n        args {\n          ...InputValue\n        }\n      }\n    }\n  }\n\n  " + inputValueFragment + "\n  " + typeRefFragment + "\n";
