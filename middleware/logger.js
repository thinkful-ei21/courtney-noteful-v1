'use strict';


function requestLogger(req, res, next) {
	const today = new Date();
	console.log(`${today.toLocaleDateString()} ${today.toLocaleTimeString()} ${req.method} ${req.url}`);
	next();
}


module.exports = {requestLogger};

