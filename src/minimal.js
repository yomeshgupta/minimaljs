const http = require('http');
const fs = require('fs');
const path = require('path');

const request = require('./request');
const response = require('./response');

function Minimal() {
	const _middlewares = [];

	function use(...args) {
		let path = '*';
		let handler = null;

		if (args.length === 2) [path, handler] = args;
		else handler = args[0];

		if (typeof path !== 'string') throw new Error('Path needs to be either a string');
		else if (typeof handler !== 'function') throw new Error('Middleware needs to be a function');

		_middlewares.push({
			path,
			handler
		});
	}

	function listen(port = 8080, cb) {
		return http
			.createServer((req, res) => {
				request(req);
				response(res);
				fs.readFile(path.resolve(__dirname, '../', 'public', 'index.html'), (err, data) => {
					if (err) {
						return res.status(500).send('Error Occured');
					}
					return res.status(200).send(data);
				});
			})
			.listen({ port }, () => {
				if (cb) {
					if (typeof cb === 'function') {
						return cb();
					}
					throw new Error('Listen callback needs to be a function');
				}
			});
	}

	return {
		use,
		listen
	};
}

module.exports = Minimal;
