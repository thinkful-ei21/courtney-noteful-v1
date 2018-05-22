'use strict';

// Load array of notes
// const data = require('./db/notes');
console.log('Hello Noteful!');
const express = require('express');
const app = express();
const data = require('./db/notes');
const { PORT } = require('./config');
const {requestLogger} = require('./middleware/logger');


app.use(express.static('public'));
app.use(requestLogger);

//GETS ALL NOTES
// app.get('/api/notes', (req, res) => {
// 	res.json(data);
// });

app.get('/api/notes/:id', (req, res) => {
	const findNoteById = data.find(note => note.id === Number(req.params.id));
	if(findNoteById) {
		res.json(findNoteById);	
	} else {
		var err = new Error('Not Found');
	  err.status = 404;
	  res.status(404).json({ message: 'Not Found' });
	}
});

app.get('/api/notes', (req, res) => {
	const searchParam = req.query.searchTerm;
	const filteredSearch = data.filter(note => note.title.includes(searchParam));
	res.json(filteredSearch);
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err.message);
});
