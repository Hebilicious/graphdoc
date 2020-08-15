"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarWarsSchema = void 0;
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
var graphql_1 = require("graphql");
/**
 * This is designed to be an end-to-end test, demonstrating
 * the full GraphQL stack.
 *
 * We will create a GraphQL schema that describes the major
 * characters in the original Star Wars trilogy.
 *
 * NOTE: This may contain spoilers for the original Star
 * Wars trilogy.
 */
/**
 * Using our shorthand to describe type systems, the type system for our
 * Star Wars example is:
 *
 * enum Episode { NEWHOPE, EMPIRE, JEDI }
 *
 * interface Character {
 *   id: ID
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 * }
 *
 * type Human : Character {
 *   id: ID
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   homePlanet: String
 * }
 *
 * type Droid : Character {
 *   id: ID
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   primaryFunction: String
 * }
 *
 * type Query {
 *   hero(episode: Episode): Character
 *   human(id: ID): Human
 *   droid(id: ID): Droid
 * }
 *
 * We begin by setting up our schema.
 */
/**
 * The original trilogy consists of three movies.
 *
 * This implements the following type system shorthand:
 *   enum Episode { NEWHOPE, EMPIRE, JEDI }
 */
var episodeEnum = new graphql_1.GraphQLEnumType({
    description: "One of the films in the Star Wars Trilogy",
    name: "Episode",
    values: {
        EMPIRE: {
            description: "Released in 1980.",
            value: 5
        },
        JEDI: {
            description: "Released in 1983.",
            value: 6
        },
        NEWHOPE: {
            description: "Released in 1977.",
            value: 4
        }
    }
});
/**
 * Characters in the Star Wars trilogy are either humans or droids.
 *
 * This implements the following type system shorthand:
 *   interface Character {
 *     id: ID
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     secretBackstory: String
 *   }
 */
var characterInterface = new graphql_1.GraphQLInterfaceType({
    name: "Character",
    description: "A character in the Star Wars Trilogy",
    fields: function () { return ({
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            description: "The id of the character."
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "The name of the character."
        },
        friends: {
            type: new graphql_1.GraphQLList(characterInterface),
            description: "The friends of the character, or an empty list if they " + "have none."
        },
        appearsIn: {
            type: new graphql_1.GraphQLList(episodeEnum),
            description: "Which movies they appear in."
        },
        secretBackstory: {
            type: graphql_1.GraphQLString,
            description: "All secrets about their past."
        }
    }); },
    resolveType: function (_) { return humanType; }
});
/**
 * We define our human type, which implements the character interface.
 *
 * This implements the following type system shorthand:
 *   type Human : Character {
 *     id: ID
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     secretBackstory: String
 *   }
 */
var humanType = new graphql_1.GraphQLObjectType({
    name: "Human",
    description: "A humanoid creature in the Star Wars universe.",
    fields: function () { return ({
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            description: "The id of the human."
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "The name of the human."
        },
        friends: {
            type: new graphql_1.GraphQLList(characterInterface),
            description: "The friends of the human, or an empty list if they " + "have none.",
            resolve: function (human) { return human; }
        },
        appearsIn: {
            type: new graphql_1.GraphQLList(episodeEnum),
            description: "Which movies they appear in."
        },
        homePlanet: {
            type: graphql_1.GraphQLString,
            description: "The home planet of the human, or null if unknown."
        },
        secretBackstory: {
            type: graphql_1.GraphQLString,
            description: "Where are they from and how they came to be who they are.",
            resolve: function () {
                throw new Error("secretBackstory is secret.");
            }
        }
    }); },
    interfaces: [characterInterface]
});
/**
 * The other type of character in Star Wars is a droid.
 *
 * This implements the following type system shorthand:
 *   type Droid : Character {
 *     id: ID
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     secretBackstory: String
 *     primaryFunction: String
 *   }
 */
var droidType = new graphql_1.GraphQLObjectType({
    name: "Droid",
    description: "A mechanical creature in the Star Wars universe.",
    fields: function () { return ({
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            description: "The id of the droid."
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "The name of the droid."
        },
        friends: {
            type: new graphql_1.GraphQLList(characterInterface),
            description: "The friends of the droid, or an empty list if they " + "have none.",
            resolve: function (droid) { return droid; }
        },
        appearsIn: {
            type: new graphql_1.GraphQLList(episodeEnum),
            description: "Which movies they appear in."
        },
        secretBackstory: {
            type: graphql_1.GraphQLString,
            description: "Construction date and the name of the designer.",
            resolve: function () {
                throw new Error("secretBackstory is secret.");
            }
        },
        primaryFunction: {
            type: graphql_1.GraphQLString,
            description: "The primary function of the droid."
        }
    }); },
    interfaces: [characterInterface]
});
/**
 * This is the type that will be the root of our query, and the
 * entry point into our schema. It gives us the ability to fetch
 * objects by their IDs, as well as to fetch the undisputed hero
 * of the Star Wars trilogy, R2-D2, directly.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     hero(episode: Episode): Character
 *     human(id: ID): Human
 *     droid(id: ID): Droid
 *   }
 *
 */
var queryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    description: "Root query",
    fields: function () { return ({
        hero: {
            type: characterInterface,
            description: "Return the hero by episode.",
            args: {
                episode: {
                    description: "If omitted, returns the hero of the whole saga. If " +
                        "provided, returns the hero of that particular episode.",
                    type: episodeEnum
                }
            },
            resolve: function () { return null; }
        },
        human: {
            type: humanType,
            description: "Return the Human by ID.",
            args: {
                id: {
                    description: "id of the human",
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: function () { return null; }
        },
        droid: {
            type: droidType,
            description: "Return the Droid by ID.",
            args: {
                id: {
                    description: "id of the droid",
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID)
                }
            },
            resolve: function () { return null; }
        }
    }); }
});
/**
 *   type Mutation {
 *     favorite(episode: Episode!): Episode
 *   }
 */
var mutationType = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: function () { return ({
        favorite: {
            type: episodeEnum,
            description: "Save the favorite episode.",
            args: {
                episode: {
                    type: new graphql_1.GraphQLNonNull(episodeEnum),
                    description: "Favorite episode."
                }
            },
            resolve: function (_, _a) {
                var episode = _a.episode;
                return episode;
            }
        }
    }); }
});
/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
exports.StarWarsSchema = new graphql_1.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
