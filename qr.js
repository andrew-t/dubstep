var qr = require('qrcode-npm');

function make(data, ec) {
	var code;

	for (var s = 0; s <= 10; ++s)
		try {
			code = qr.qrcode(s, ec || 'M');
			code.addData(data);
			code.make();
			break;
		} catch (e) {
			// console.log(e);
		}
	if (!code)
		throw 'Data too large.';

	var size = code.getModuleCount(),
		sl = '\033[15;107;97m',
		out;
	for (var i = 0; i < size * 2 + 4; ++i)
		sl += ' ';
	sl += '\033[0m\n';
	out = sl;
	for (var y = 0; y < size; ++y) {
		out += '\033[15;107;97m  ';
		for (var x = 0; x < size; ++x)
			out += (code.isDark(x, y) ? '\033[30;40m' : '\033[15;107;97m') + '  ';
		out += '\033[15;107;97m  \033[0m\n';
	}
	out += sl;

	return out;
}
	

if (module.parent)
	module.exports = make;
else
	console.log(make(process.argv[2], process.argv[3]));
