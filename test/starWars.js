"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Test case for the ["modularized schema"](http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#modularizing) of graphql-tools.
 */
var Character = "\n# A character in the Star Wars Trilogy\ninterface Character {\n  # The id of the character.\n  id: ID!\n\n  # The name of the character.\n  name: String\n\n  # The friends of the character, or an empty list if they have none.\n  friends: [Character]\n\n  # Which movies they appear in.\n  appearsIn: [Episode]\n\n  # All secrets about their past.\n  secretBackstory: String\n}\n";
var Droid = "\n# A mechanical creature in the Star Wars universe.\ntype Droid implements Character {\n  # The id of the droid.\n  id: ID!\n\n  # The name of the droid.\n  name: String\n\n  # The friends of the droid, or an empty list if they have none.\n  friends: [Character]\n\n  # Which movies they appear in.\n  appearsIn: [Episode]\n\n  # Construction date and the name of the designer.\n  secretBackstory: String\n\n  # The primary function of the droid.\n  primaryFunction: String\n}\n";
var Episode = "\n# One of the films in the Star Wars Trilogy\nenum Episode {\n  # Released in 1977.\n  NEWHOPE\n\n  # Released in 1980.\n  EMPIRE\n\n  # Released in 1983.\n  JEDI\n}\n";
var Human = "\n# A humanoid creature in the Star Wars universe.\ntype Human implements Character {\n  # The id of the human.\n  id: ID!\n\n  # The name of the human.\n  name: String\n\n  # The friends of the human, or an empty list if they have none.\n  friends: [Character]\n\n  # Which movies they appear in.\n  appearsIn: [Episode]\n\n  # The home planet of the human, or null if unknown.\n  homePlanet: String\n\n  # Where are they from and how they came to be who they are.\n  secretBackstory: String\n}\n";
var Mutation = "\n# Root Mutation\ntype Mutation {\n  # Save the favorite episode.\n  favorite(\n    # Favorite episode.\n    episode: Episode!\n  ): Episode\n}\n";
var Query = "\n# Root query\ntype Query {\n  # Return the hero by episode.\n  hero(\n    # If omitted, returns the hero of the whole saga. If provided, returns the hero of that particular episode.\n    episode: Episode\n  ): Character\n\n  # Return the Human by ID.\n  human(\n    # id of the human\n    id: ID!\n  ): Human\n\n  # Return the Droid by ID.\n  droid(\n    # id of the droid\n    id: ID!\n  ): Droid\n}\n";
var Schema = "\nschema {\n    query: Query\n    mutation: Mutation\n}\n";
exports.default = (function () { return [
    Character,
    Droid,
    Episode,
    Human,
    Mutation,
    Query,
    Schema
]; });
