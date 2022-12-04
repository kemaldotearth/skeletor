#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program.description(
  'A simple CLI tool for generating front end design system packages.',
);
program.option('--verbose', 'Verbose logging.');
program.version('0.1.0', '-v, --version', 'Logs current version.');

program.command('generate:tokens').action(async () => {
  console.log('Generating tokens...');
});

const run = async () => {
  await program.parseAsync();
};

run();

process.on('unhandledRejection', function (err: Error) {
  const debug = program.opts().verbose;

  if (debug) {
    console.error(err.stack);
  }

  program.error('', { exitCode: 1 });
});
