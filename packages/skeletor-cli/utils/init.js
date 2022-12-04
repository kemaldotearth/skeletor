const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = ({ clear = true }) => {
	unhandled();
	welcome({
		title: `skeletor-cli`,
		tagLine: `by @kemal.earth`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#e93d82',
		color: '#000000',
		bold: true,
		clear
	});
};