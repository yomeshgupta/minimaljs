const http = require('http');
const CONFIG = require('./config');

const server = http.createServer((req, res) => {
	console.log(req);
});

server.listen(CONFIG.PORT, () => console.log(`Server running on ${CONFIG.PORT}`));
