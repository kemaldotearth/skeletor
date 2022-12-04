#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program.description(
  'A simple CLI tool for generating front end design system packages.',
);
program.option('--verbose', 'verbose logging');
