#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
// import { promiseResolve } from './utils/helpers';
import { updateSpinnerText, spinnerSuccess } from './utils/spinners';

const program = new Command();

program.description(
  'A simple CLI tool for generating front end design system packages.',
);
program.option('--verbose', 'Verbose logging.');
program.version('0.1.0', '-v, --version', 'Logs current version.');

program.command('generate:tokens').action(async () => {
  updateSpinnerText('Generating tokens...');
  // await promiseResolve(3000);
  await new Promise((resolve) => setTimeout(resolve, 3000));

  spinnerSuccess();
  console.log('wow your tokens!');
});

program.command('generate:ui').action(async () => {
  updateSpinnerText('Generating UI...');
  // await promiseResolve(3000);
  await new Promise((resolve) => setTimeout(resolve, 3000));

  spinnerSuccess();
  console.log('wow your UI!');
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
