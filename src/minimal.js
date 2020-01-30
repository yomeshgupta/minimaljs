const http = require('http');

const request = require('./request');
const response = require('./response');
const Router = require('./router/index');
const { checkMiddlewareInputs, matchPath } = require('./lib/helpers');

function Minimal() {
	const _middlewares = [];
	const _router = new Router();

	function use(...args) {
		const { path, handler } = checkMiddlewareInputs(args);
		_middlewares.push({
			path,
			handler
		});
	}

	function findNext(req, res) {
		let current = -1;
		const next = () => {
			current += 1;
			const middleware = _middlewares[current];
			const { matched = false, params = {} } = middleware ? matchPath(middleware.path, req.pathname) : {};

			if (matched) {
				req.params = params;
				middleware.handler(req, res, next);
			} else if (current <= _middlewares.length) {
				next();
			} else {
				req.handler(req, res);
			}
		};
		return next;
	}

	function handle(req, res, cb) {
		const next = findNext(req, res);
		req.handler = cb;
		next();
	}

	function get(...args) {
		const { path, handler } = checkMiddlewareInputs(args);
		return _router.get(path, handler);
	}

	function post(...args) {
		const { path, handler } = checkMiddlewareInputs(args);
		return _router.post(path, handler);
	}

	function listen(port = 8080, cb) {
		return http
			.createServer((req, res) => {
				request(req);
				response(res);
				handle(req, res, () => _router.handle(req, res));
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
		listen,
		get,
		post
	};
}

module.exports = Minimal;
