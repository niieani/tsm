#!/usr/bin/env node
let argv = process.argv.slice(2);

// note: injected @ build
declare const VERSION: string;

if (argv.includes('-h') || argv.includes('--help')) {
	let msg = '';
	msg += '\n  Usage\n    $ tsm [options] -- <command>\n';
	msg += '\n  Options';
	msg += `\n    --config    Configuration file path (default: tsm.js)`;
	msg += `\n    --version   Displays current version`;
	msg += '\n    --help      Displays this message\n';
	msg += '\n  Examples';
	msg += '\n    $ tsm server.ts';
	msg += '\n    $ tsm input.jsx --trace-warnings';
	msg += '\n    $ NO_COLOR=1 tsm main.tsx \n';
	console.log(msg);
	process.exit(0);
}

if (argv.includes('-v') || argv.includes('--version')) {
	console.log(`tsm, v${VERSION}`);
	process.exit(0);
}

require('child_process').spawn('node', ['--loader', 'tsm/loader', ...argv], {
	stdio: 'inherit'
}).on('exit', process.exit);
