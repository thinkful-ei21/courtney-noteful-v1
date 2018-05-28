'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);



describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

});


describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

});


describe('GET API tests', function () {

  it('GET request "/api/notes" should return all notes', function () {
  	const validTerm = 'cat';

    return chai.request(app)
      .get('/api/notes')
      .query({searchTerm: validTerm})
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.length).to.equal(10);
        res.body.forEach(function(item) {
        	expect(item).to.be.a('object');
        	expect(item).to.have.all.keys('id', 'title', 'content');
        	expect(item.title).to.contain(validTerm);
        });
      });
  });


  it('GET request "/api/notes" with a bad query should return empty array', function () {
  	const invalidTerm = 'aaaaa';

    return chai.request(app)
      .get('/api/notes')
      .query({searchTerm: invalidTerm})
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.length).to.equal(0);
 
      });
  });

  it('GET request "/api/notes/:id" should return a specifc note', function() {
  	return chai.request(app)
  		.get('/api/notes/1000')
  		.then(function(res) {
  			expect(res).to.have.status(200);
  			expect(res).to.be.json;
  			expect(res.body).to.be.a("object");
  			expect(res.body).to.include.keys("id", "title", "content");
  			expect(res.body.id).to.equal(1000);
  		});

  });

  it("GET request '/api/notes/DOESNOTEXIST' should return 404 response", function() {
  	return chai.request(app)
  		.get('/api/notes/DOESNOTEXIST')
  		.then(function(res) {
  			expect(res).to.have.status(404);
  		});
  });
});


describe("POST API tests", function() {

	it("POST request should create new note", function() {
		const newNote = {
			"title": "More Cats",
			"content": "More undeniably cute fluffiness"
		};

		return chai.request(app)
			.post('/api/notes')
			.send(newNote)
			.then(function(res) {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.a("object");
				expect(res.body).to.include.keys("id", "title", "content");
				expect(res.body.id).to.equal(1010);
			});
	});

	it("POST request should return error if title is missing", function() {
		const emptyNote = {};

		return chai.request(app)
			.post("/api/notes")
			.send(emptyNote)
			.then(function(res) {
				expect(res).to.have.status(400);
				expect(res).to.be.json;
				expect(res.body).to.be.a("object");
			});
	});
});






















