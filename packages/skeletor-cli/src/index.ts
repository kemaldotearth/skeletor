#!/usr/bin/env node

import { Command } from "commander";

const run = async () => {
  const program = new Command();

  program.argument("test", "Runs a quick little test script").parse();

  console.log("Testing command...");
};

run();
