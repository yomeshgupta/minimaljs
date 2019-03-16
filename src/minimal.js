const http = require('http');
const fs = require('fs');
const path = require('path');

class Minimal {
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
