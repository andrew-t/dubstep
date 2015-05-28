#!/usr/local/bin/node

var qr = require('qrcode-npm'),
	data = process.argv[2],
	ec = process.argv[3] || 'M',
	code;

for (var s = 0; s <= 10; ++s)
	try {
		code = qr.qrcode(s, ec);
		code.addData(data);
		code.make();
		break;
	} catch (e) { }

var size = code.getModuleCount(),
	sl = '\033[15;107;97m';
for (var i = 0; i < size * 2 + 4; ++i)
	sl += '\u2588';
sl += '\033[0m';
console.log(sl);
for (var y = 0; y < size; ++y) {
	var l = '';
	for (var x = 0; x < size; ++x)
		l += (code.isDark(x, y) ? '\033[30;40m' : '\033[15;107;97m') + '\u2588\u2588';
	console.log('\033[15;107;97m\u2588\u2588' + l + '\033[15;107;97m\u2588\u2588\033[0m');
}
console.log(sl);