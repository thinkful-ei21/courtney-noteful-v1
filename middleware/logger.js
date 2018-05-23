'use strict';

const morgan = require('morgan');


// function requestLogger(req, res, next) {
// 	const today = new Date();
// 	console.log(`${today.toLocaleDateString()} ${today.toLocaleTimeString()} ${req.method} ${req.url}`);
// 	next();
// }

const requestLogger = morgan('dev');

module.exports = {requestLogger};

