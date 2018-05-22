'use strict';

// Load array of notes
// const data = require('./db/notes');
console.log('Hello Noteful!');
const express = require('express');
const app = express();
const data = require('./db/notes');
const { PORT } = require('./config');


// ADD STATIC SERVER HERE
app.use(express.static('public'));

// app.get('/api/notes', (req, res) => {
// 	res.json(data);
// });

app.get('/api/notes/:id', (req, res) => {
	
	const findNoteById = data.find(note => note.id === Number(req.params.id)); 
	res.json(findNoteById);
});

app.get('/api/notes', (req, res) => {
	const searchParam = req.query.searchTerm;
	// console.log(searchParam);
	const filteredSearch = data.filter(note => note.title.includes(searchParam));
	res.json(filteredSearch);
	// res.json(data);
});


app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
