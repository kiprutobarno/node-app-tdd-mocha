let server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("BOOK MART", function() {
  describe("Create Book", function() {
    let books = [
      {
        isbn: "808080",
        title: "The Art of Software Development",
        author: "Larry Page",
        year: "2014"
      },
      {
        isbn: "808081",
        title: "Weavers",
        author: "Elton John",
        year: "2016"
      }
    ];

    it("Should add a book into the database", done => {
      for (book in books) {
        chai
          .request(server)
          .post("/books")
          .send(books[book])
          .end((err, res) => {
            res.should.have.status(201);
          });
      }
      done();
    });
  });

  describe("Get all Books", function() {
    it("Should retrieve all books from the database", done => {
      chai
        .request(server)
        .get("/books")
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });

  describe("Get a Book", function() {
    let books = [
      {
        isbn: "808080",
        title: "The Art of Software Development",
        author: "Larry Page",
        year: "2014"
      },
      {
        isbn: "808081",
        title: "Weavers",
        author: "Elton John",
        year: "2016"
      }
    ];
    it("Should retrieve a specific book from the database", done => {
      chai
        .request(server)
        .get("/books/" + books[1].isbn)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });

  describe("Update a Book", function() {
    let books = [
      {
        isbn: "808080",
        title: "The Art of Software Development",
        author: "Larry Page",
        year: "2014"
      },
      {
        isbn: "808081",
        title: "Weavers",
        author: "Elton John",
        year: "2016"
      }
    ];

    let bookUpdate = {
      isbn: "808300",
      title: "Double Impact",
      author: "Jimmy Carter",
      year: "2015"
    };
    it("Should update only a specific book in the database", done => {
      chai
        .request(server)
        .put("/books/" + books[1].isbn)
        .send(bookUpdate)
        .end((err, result) => {
          result.should.have.status(200);
        });
      done();
    });
  });

  describe("Check if Book is Updated", function() {
    it("should confirm that the particular book has been successfully updated", done => {
      let books = [
        {
          isbn: "808080",
          title: "The Art of Software Development",
          author: "Larry Page",
          year: "2014"
        },
        {
          isbn: "808300",
          title: "Weavers",
          author: "Elton John",
          year: "2016"
        }
      ];
      chai
        .request(server)
        .get("/books/" + books[1].isbn)
        .end((err, result) => {
          result.should.have.status(200);
          result.body.data.year.should.eq("2015");
          result.body.data.author.should.eq("Jimmy Carter");
          result.body.data.title.should.eq("Double Impact");
        });
      done();
    });
  });

  describe("Delete a Book", function() {
    it("Should delete only a specific book in the database", done => {
      let books = [
        {
          isbn: "808081",
          title: "The Art of Software Development",
          author: "Larry Page",
          year: "2014"
        },
        {
          isbn: "808300",
          title: "Weavers",
          author: "Elton John",
          year: "2016"
        }
      ];
      chai
        .request(server)
        .delete("/books/" + books[1].isbn)
        .end((err, result) => {
          result.should.have.status(200);
        });
      done();
    });
  });

  describe("Delete all Books", function() {
    it("Should delete all books in the database", done => {
      chai
        .request(server)
        .delete("/books")
        .end((err, result) => {
          result.should.have.status(200);
        });
      done();
    });
  });
});
