#!/usr/bin/env node

var qr = require('./qr'),
	prompt = require('prompt'),
	exec = require('child_process').exec,
	speakeasy = require('speakeasy');

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
			var key = /\nPassword:([^\n]*)\r?\n/.exec(input)[1];
			console.log('Hex Code:    ' + speakeasy.time({
					key: key.replace(/\s/g, ''),
					encoding: 'hex'
				}));
			console.log('BASE32Code:  ' + speakeasy.time({
					key: key.toUpperCase()
						.replace(/\s/g, ''),
					encoding: 'base32'
				}));
			console.log('Base32 Code: ' + speakeasy.time({
					key: key,
					encoding: 'base32'
				}));
			console.log('ASCII Code:  ' + speakeasy.time({
					key: key.replace(/\s/g, ''),
					encoding: 'ascii'
				}));
			console.log('ASCIICode:   ' + speakeasy.time({
					key: key,
					encoding: 'ascii'
				}));
		});
		break;
	default:
		console.log('dubstep');
		console.log('pass show 2step/NAME | dubstep code');
		break;
}

