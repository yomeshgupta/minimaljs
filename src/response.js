function response(res) {
	function end(content) {
		res.setHeader('Content-Length', content.length);
		res.status();
		res.end(content);
		return res;
	}

	res.status = code => {
		res.statusCode = code || res.statusCode;
		return res;
	};

	res.send = content => {
		res.setHeader('Content-Type', 'text/html');
		return end(content);
	};

	res.json = content => {
		try {
			content = JSON.stringify(content);
		} catch (err) {
			throw err;
		}
		res.setHeader('Content-Type', 'application/json');
		return end(content);
	};

	res.redirect = url => {
		res.setHeader('Location', url);
		res.status(301);
		res.end();
		return res;
	};
}

module.exports = response;
