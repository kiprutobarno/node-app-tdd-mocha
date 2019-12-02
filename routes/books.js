const express = require("express");
const router = express.Router();
const books = require("../models/Books");

router.post("/books", async (req, res) => {
  let db = req.app.db;
  let bookInfo = req.body;

  try {
    await books.addBook(db, bookInfo);
    res.status(201).send({ status: "success", message: "successfully added" });
  } catch (error) {
    res.status(400).send({ status: "fail", message: error });
  }
});

router.get("/books", async (req, res) => {
  let db = req.app.db;
  try {
    let data = await books.getBooks(db);
    if (data.length === 0)
      res.status(404).send({ message: "Books not available" });
    else res.status(200).send({ status: "Success", data: data });
  } catch (error) {
    res.status(400).send({ status: "fail", message: error });
  }
});

router.get("/books/:isbn", async (req, res) => {
  let db = req.app.db;
  let isbn = req.params.isbn;
  try {
    let data = await books.getBook(db, isbn);
    if (data == null || data.length === 0) {
      res.status(404).send({ message: "Book not available" });
    } else res.status(200).send({ status: "Success", data: data });
  } catch (error) {
    res.status(400).send({ status: "fail", message: error });
  }
});

router.put("/books/:isbn", async (req, res) => {
  let db = req.app.db;
  let isbn = req.params.isbn;
  let body = req.body;
  try {
    let data = await books.getBook(db, isbn);
    if (data == null || data.length === 0) {
      res.status(404).send({ message: "Book not available" });
    } else {
      await books.updateBook(db, isbn, body);
      res.status(200).send({ status: "Success", message: "Update successful" });
    }
  } catch (error) {
    res.status(400).send({ status: "fail", message: error });
  }
});

router.delete("/books/:isbn", async (req, res) => {
  let db = req.app.db;
  let isbn = req.params.isbn;
  try {
    let data = await books.getBook(db, isbn);
    if (data == null || data.length === 0) {
      res.status(404).send({ message: "Book not available" });
    } else {
      await books.removeBook(db, isbn);
      res.status(200).send({ status: "Success", data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "fail", message: error });
  }
});

router.delete("/books", async (req, res) => {
  let db = req.app.db;
  try {
    let data = await books.getBooks(db);
    if (data == null || data.length === 0) {
      res.status(404).send({ message: "Books not available" });
    } else {
      await books.removeAll(db);
      res.status(200).send({ status: "Success", data: data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "fail", message: error });
  }
});

module.exports = router;
