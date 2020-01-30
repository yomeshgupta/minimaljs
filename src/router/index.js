const Layer = require('./layer.js');
const Route = require('./route.js');

class Router {
	constructor() {
		this.stack = [
			new Layer('*', (req, res) => {
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/plain');
				res.end(`Cannot find ${req.url}`);
			})
		];
	}

	handle(req, res) {
		const method = req.method;
		let found = false;

		this.stack.some((item, index) => {
			if (index === 0) {
				return false;
			}
			const { matched = false, params = {} } = item.match(req.pathname);
			if (matched && item.route && item.route.requestHandler(method)) {
				found = true;
				req.params = params;
				return item.requestHandler(req, res);
			}
		});

		return found ? null : this.stack[0].requestHandler(req, res);
	}

	route(path) {
		const route = new Route(path);
		const layer = new Layer(path, (req, res) => route.dispatch(req, res));
		layer.route = route;
		this.stack.push(layer);

		return route;
	}

	get(path, handler) {
		const route = this.route(path);
		route.get(handler);
		return this;
	}

	put(path, handler) {
		const route = this.route(path);
		route.put(handler);
		return this;
	}
}

module.exports = Router;
