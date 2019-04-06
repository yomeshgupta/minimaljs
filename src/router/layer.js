const { matchPath } = require('../lib/helpers');

class Layer {
	constructor(path, handler) {
		this.handler = handler;
		this.name = handler.name || '<anonymous>';
		this.path = path;
	}

	requestHandler(...args) {
		const handler = this.handler;
		handler ? handler(...args) : null;
	}

	match(path) {
		return matchPath(this.path, path);
	}
}

module.exports = Layer;
