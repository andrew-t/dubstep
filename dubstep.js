#!/usr/bin/env node

var qr = require('./qr'),
	prompt = require('prompt'),
	exec = require('child_process').exec,
	toofer = require('2fa');

switch (process.argv[2]) {
	case undefined:
		prompt.start();
		prompt.get({
			properties: {
				stub: {
					message: 'Short name for pass',
					required: true,
					hidden: false,
				},
				label: {
					message: 'Label/issuer',
					required: true,
					hidden: false,
				},
				username: {
					message: 'Username',
					required: true,
					hidden: false
				},
				password: {
					message: 'Password',
					required: true,
					hidden: false // true
				}
			}
		}, function(err, result) {
			if (result.password)
				exec('echo "Username:' + result.username + '\n' +
					'Password:' + result.password + '\n' +
					qr('otpauth://totp/' + encodeURIComponent(result.label) + ':' +
						encodeURIComponent(result.username) + '?secret=' +
						encodeURIComponent(result.password) + '&issuer=' +
						encodeURIComponent(result.label),
					'L') +
					'" | pass insert -m "2step/' + result.stub + '"');
			else console.log('Aborted');
		});
		break;
	case 'code':
		process.stdin.setEncoding('utf8');
		var input = '';
		process.stdin.on('readable', function() {
			var chunk = process.stdin.read();
			if (chunk !== null)
				input += chunk;
		});
		process.stdin.on('end', function() {
			var key = /\nPassword:([^\n]*)\r?\n/.exec(input)[1],
				code = toofer.generateCode(key, Math.floor(Date.now() / 30000));
			console.log('Code: ' + code);
			console.log(toofer.verifyTOTP(key, code, { drift: 4, step: 30 }));
		});
		break;
	default:
		console.log('dubstep');
		console.log('pass show 2step/NAME | dubstep code');
		break;
}

