#!/usr/bin/env node

/**
 * skeletor-cli
 * A simple CLI tool for generating front end design system packages.
 *
 * @author @kemal.earth <https://kemal.earth>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
})();
