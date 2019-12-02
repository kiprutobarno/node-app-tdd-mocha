const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const dbUrl = "mongodb://localhost:27017/booksdb";
const dbName = "booksdb";
const books = require("./routes/books");
const prefix = "/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(prefix, books);

MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db(dbName);
    app.db = db;
  })
  .catch(err => console.log("Error", err));

const server = app.listen(8000, () => {
  console.log("...listening on port 8000...");
});

module.exports = server;
