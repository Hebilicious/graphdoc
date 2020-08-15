#!/usr/bin/env node

"use strict";
const {
  ArgvInput,
  ColorConsoleOutput,
  ConsoleOutput
} = require("@2fd/command");
const path = require("path");
const { GraphQLDocumentGenerator } = require(path.resolve(
  __dirname,
  "../lib/command"
));
const argv = process.argv.filter(arg => arg !== "--no-color");
new GraphQLDocumentGenerator().handle(
  new ArgvInput(argv),
  argv.length === process.argv.length
    ? new ColorConsoleOutput()
    : new ConsoleOutput()
);
