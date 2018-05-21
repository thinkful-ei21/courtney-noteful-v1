'use strict';

// Load array of notes
// const data = require('./db/notes');
console.log('Hello Noteful!');
const express = require('express');
const app = express();
const data = require('./db/notes');


// ADD STATIC SERVER HERE
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
	res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
	console.log(req.params);
	const findNoteById = data.find(note => note.id === Number(req.params.id)); 
	res.json(findNoteById);
});


app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
