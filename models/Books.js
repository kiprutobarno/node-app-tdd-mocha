/**
 *
 * @param {Object} db Database object
 * @param {JSON} bookInfo Book information to be saved in the database
 */
const addBook = (db, bookInfo) => {
  return db.collection("books").insertOne(bookInfo);
};

/**
 *
 * @param {Object} db Database object
 * @returns {Array} All books
 */
const getBooks = db => {
  return db
    .collection("books")
    .find({})
    .toArray();
};

/**
 *
 * @param {Object} db Database object
 * @param {String} isbn Book serial number
 */
const getBook = (db, isbn) => {
  return db.collection("books").findOne({ isbn: isbn });
};

/**
 *
 * @param {Object} db Database object
 * @param {String} isbn book serial number
 * @param {JSON} bookInfo Book information to be updated
 */
const updateBook = (db, isbn, bookInfo) => {
  return db
    .collection("books")
    .updateOne(
      { isbn: isbn },
      {
        $set: {
          isbn: bookInfo.isbn,
          title: bookInfo.title,
          author: bookInfo.author,
          year: bookInfo.year
        }
      }
    );
};

/**
 *
 * @param {Object} db Database object
 * @param {String} isbn Book serial number
 */
const removeBook = (db, isbn) => {
  return db.collection("books").deleteOne({ isbn: isbn });
};

/**
 *
 * @param {Object} db Database object
 */
const removeAll = db => {
  return db.collection("books").deleteMany({});
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  removeBook,
  removeAll
};
