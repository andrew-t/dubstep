#!/usr/local/bin/node

var qr = require('./qr'),
	prompt = require('prompt');

prompt.start();
prompt.get({
	properties: {
		label: {
			message: 'Label/issuer',
			required: true,
			hidden: false
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
	console.log('Label: ' + result.label);
	console.log('Username: ' + result.username);
	console.log('Password: ' + result.password);
	console.log(qr('otpauth://totp/' + result.label + ':' + result.username + '?secret=' + result.password + '&issuer=' + result.label));
});
