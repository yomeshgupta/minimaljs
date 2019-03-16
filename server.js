const http = require('http');
const fs = require('fs');
const path = require('path');
const CONFIG = require('./config');

const server = http.createServer((req, res) => {
	fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
		res.setHeader('Content-Type', 'text/html');
		if (err) {
			res.writeHead(500);
			res.end('Some error occured');
		}
		res.writeHead(200);
		return res.end(data);
	});
});

server
	.listen(CONFIG.PORT, () => {
		console.log(`Server running on ${CONFIG.PORT}`);
	})
	.on('error', err => {
		console.log('Server start up failed', err);
	});
