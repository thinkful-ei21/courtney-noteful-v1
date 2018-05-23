'use strict';

const express = require('express');
const router = express.Router();


//DATABASE
const data = require('../../db/notes');
const simDB = require('../../db/simDB');  
const notes = simDB.initialize(data);


router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

router.get('/notes/:id', (req, res, next) => {
	// const findNoteById = data.find(note => note.id === Number(req.params.id));
	// if(findNoteById) {
	// 	res.json(findNoteById);	
	// } else {
	// 	var err = new Error('Not Found');
	//   err.status = 404;
	//   res.status(404).json({ message: 'Not Found' });
	// }

	notes.find(req.params.id, (err, list) => {
		if (err) {
			return next(err);
		}
		res.json(list);
	});
});



router.get('/notes', (req, res, next) => {
	// const searchParam = req.query.searchTerm;
	// const filteredSearch = data.filter(note => note.title.includes(searchParam));
	// res.json(filteredSearch);

	const {searchTerm} = req.query;
	notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});


router.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

module.exports = router;