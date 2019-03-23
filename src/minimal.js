const http = require('http');
const fs = require('fs');
const path = require('path');

const request = require('./request');
const response = require('./response');
const { checkMiddlewareInputs, matchPath } = require('./lib/helpers');

function Minimal() {
	const _middlewares = [];

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
			}
		};
		return next;
	}

	function handle(req, res) {
		const next = findNext(req, res);
		next();
	}

	function listen(port = 8080, cb) {
		return http
			.createServer((req, res) => {
				request(req);
				response(res);
				handle(req, res);
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
