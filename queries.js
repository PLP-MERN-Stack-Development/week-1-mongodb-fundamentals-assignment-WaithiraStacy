// insert_books.js
use('plp_bookstore');

db.books.insertMany([
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    published_year: 2008,
    price: 45.99,
    in_stock: true,
    pages: 464,
    publisher: "Prentice Hall"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andy Hunt",
    genre: "Programming",
    published_year: 1999,
    price: 39.99,
    in_stock: true,
    pages: 352,
    publisher: "Addison-Wesley"
  },
  {
    title: "You Don’t Know JS",
    author: "Kyle Simpson",
    genre: "JavaScript",
    published_year: 2015,
    price: 29.99,
    in_stock: true,
    pages: 278,
    publisher: "O'Reilly Media"
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    genre: "JavaScript",
    published_year: 2018,
    price: 35.00,
    in_stock: true,
    pages: 472,
    publisher: "No Starch Press"
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    genre: "Computer Science",
    published_year: 2009,
    price: 89.99,
    in_stock: false,
    pages: 1312,
    publisher: "MIT Press"
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma",
    genre: "Software Engineering",
    published_year: 1994,
    price: 54.99,
    in_stock: true,
    pages: 395,
    publisher: "Addison-Wesley"
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    genre: "Programming",
    published_year: 1999,
    price: 47.99,
    in_stock: false,
    pages: 431,
    publisher: "Addison-Wesley"
  },
  {
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    genre: "Interview Prep",
    published_year: 2015,
    price: 35.50,
    in_stock: true,
    pages: 687,
    publisher: "CareerCup"
  },
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    genre: "Python",
    published_year: 2019,
    price: 39.95,
    in_stock: true,
    pages: 544,
    publisher: "No Starch Press"
  },
  {
    title: "Fluent Python",
    author: "Luciano Ramalho",
    genre: "Python",
    published_year: 2015,
    price: 49.99,
    in_stock: false,
    pages: 792,
    publisher: "O'Reilly Media"
  }
]);

// queries.js
// Basic Queries
db.books.find({ genre: "Programming" });
db.books.find({ published_year: { $gt: 2010 } });
db.books.find({ author: "Andy Hunt" });
db.books.updateOne({ title: "Clean Code" }, { $set: { price: 50.99 } });
db.books.deleteOne({ title: "The Pragmatic Programmer" });

// Advanced Queries
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });
db.books.find().sort({ price: 1 });
db.books.find().sort({ price: -1 });
db.books.find().skip(0).limit(5);
db.books.find().skip(5).limit(5);

// Aggregation Pipelines
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1,
      _id: 0
    }
  }
]);

// Indexing
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: -1 });
db.books.find({ title: "Clean Code" }).explain("executionStats");

// README.md
/*
# MongoDB Week 1 Submission

## Setup Instructions
1. Ensure MongoDB is installed or set up a MongoDB Atlas cluster.
2. Connect to your MongoDB instance using mongosh or Compass.
3. Run `insert_books.js` to populate the database:
   ```
   mongosh < insert_books.js
   ```
4. Run `queries.js` in your MongoDB shell to execute queries.

## Project Structure
- `insert_books.js`: Contains book data for insertion.
- `queries.js`: Contains all queries (CRUD, advanced, aggregation, indexing).
- `README.md`: Setup and run instructions.

## Screenshot
_Include a screenshot of your Compass or Atlas interface showing the `plp_bookstore.books` collection and sample documents._

*/

