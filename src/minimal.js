const http = require('http');
const fs = require('fs');
const path = require('path');

class Minimal {
	constructor() {
		this._middlewares = [];
	}
	use(...args) {
		let path = '';
		let handler;
		if (args.length === 2) {
			[path, handler] = args;
		} else {
			handler = args[0];
		}
		if (typeof path !== 'string') {
			if (typeof path !== 'object') {
				throw new Error('Path needs to be either a string or a regex');
			}
		}
		if (typeof handler !== 'function') throw new Error('Handler needs to be a function');
		this._middlewares.push({
			path,
			handler
		});
	}
	listen(port = 8080, cb) {
		return http
			.createServer((req, res) => {
				fs.readFile(path.resolve(__dirname, '../', 'public', 'index.html'), (err, data) => {
					res.setHeader('Content-Type', 'text/html');
					if (err) {
						console.log(err);
						res.writeHead(500);
						res.end('Some error occured');
					}
					res.writeHead(200);
					return res.end(data);
				});
			})
			.listen({ port }, () => {
				if (typeof cb !== 'function') {
					throw new Error('Listen callback needs to be a function');
				}
				cb();
			});
	}
}

module.exports = Minimal;
