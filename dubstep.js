#!/usr/bin/env node

var qr = require('./qr'),
	prompt = require('prompt'),
	exec = require('child_process').exec;

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
	exec('echo "Username:' + result.username + '\n' +
		'Password:' + result.password + '\n' +
		qr('otpauth://totp/' + encodeURIComponent(result.label) + ':' +
			encodeURIComponent(result.username) + '?secret=' +
			encodeURIComponent(result.password) + '&issuer=' +
			encodeURIComponent(result.label),
		'L') +
		'" | pass insert -m "2step/' + result.stub + '"');
});
