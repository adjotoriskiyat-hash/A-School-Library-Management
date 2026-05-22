const Book = require('../models/Book');
const mongoose = require('mongoose');

// Create a book
exports.createBook = async (req, res, next) => { // <-- Added 'next' here
  try {
      const book = await Book.create(req.body);
          res.status(201).json(book);
            } catch (error) {
                next(error); // <-- Passes the error to your new middleware!
                  }
                  };
                  

                  // Get all books 
                  exports.getAllBooks = async (req, res) => {
                    try {
                        const { search, page = 1, limit = 10 } = req.query;
                            let query = {};

                                // Search by title or author
                                    if (search) {
                                          // Find authors matching the search query
                                                const matchingAuthors = await mongoose.model('Author').find({ 
                                                        name: { $regex: search, $options: 'i' } 
                                                              }).select('_id');
                                                                    
                                                                          const authorIds = matchingAuthors.map(author => author._id);

                                                                                // Search books by title OR matching author IDs
                                                                                      query = {
                                                                                              $or: [
                                                                                                        { title: { $regex: search, $options: 'i' } },
                                                                                                                  { authors: { $in: authorIds } }
                                                                                                                          ]
                                                                                                                                };
                                                                                                                                    }

                                                                                                                                        // Pagination setup
                                                                                                                                            const limitInt = parseInt(limit);
                                                                                                                                                const skip = (parseInt(page) - 1) * limitInt;

                                                                                                                                                    // Fetch books
                                                                                                                                                        const books = await Book.find(query)
                                                                                                                                                              .populate('authors', 'name')
                                                                                                                                                                    .limit(limitInt)
                                                                                                                                                                          .skip(skip);

                                                                                                                                                                              // Overdue Check
                                                                                                                                                                                  const currentDate = new Date();
                                                                                                                                                                                      const formattedBooks = books.map(book => {
                                                                                                                                                                                            const bookObj = book.toObject();
                                                                                                                                                                                                  // If it's OUT, has a return date, and that date has passed today's date
                                                                                                                                                                                                        if (book.status === 'OUT' && book.returnDate && book.returnDate < currentDate) {
                                                                                                                                                                                                                bookObj.isOverdue = true;
                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                              bookObj.isOverdue = false;
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                          return bookObj;
                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                  // Count total documents for frontend pagination calculation
                                                                                                                                                                                                                                                      const totalBooks = await Book.countDocuments(query);

                                                                                                                                                                                                                                                          res.status(200).json({
                                                                                                                                                                                                                                                                currentPage: parseInt(page),
                                                                                                                                                                                                                                                                      totalPages: Math.ceil(totalBooks / limitInt),
                                                                                                                                                                                                                                                                            totalBooks,
                                                                                                                                                                                                                                                                                  data: formattedBooks
                                                                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                                                                        } catch (error) {
                                                                                                                                                                                                                                                                                            res.status(500).json({ error: error.message });
                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                              };


                                    // Get single book (With Special Requirement Logic)
                                    exports.getBookById = async (req, res) => {
                                      try {
                                          let book = await Book.findById(req.params.id).populate('authors', 'name bio');
                                              
                                                  if (!book) return res.status(404).json({ message: 'Book not found' });

                                                      // SPECIAL REQUIREMENT: If OUT, populate the extra details
                                                          if (book.status === 'OUT') {
                                                                await book.populate('borrowedBy', 'name studentId email');
                                                                      await book.populate('issuedBy', 'name staffId');
                                                                          }

                                                                              res.status(200).json(book);
                                                                                } catch (error) {
                                                                                    res.status(500).json({ error: error.message });
                                                                                      }
                                                                                      };

                                                                                      // Update a book
                                                                                      exports.updateBook = async (req, res) => {
                                                                                        try {
                                                                                            const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
                                                                                                if (!book) return res.status(404).json({ message: 'Book not found' });
                                                                                                    res.status(200).json(book);
                                                                                                      } catch (error) {
                                                                                                          res.status(400).json({ error: error.message });
                                                                                                            }
                                                                                                            };

                                                                                                            // Delete a book
                                                                                                            exports.deleteBook = async (req, res) => {
                                                                                                              try {
                                                                                                                  const book = await Book.findByIdAndDelete(req.params.id);
                                                                                                                      if (!book) return res.status(404).json({ message: 'Book not found' });
                                                                                                                          res.status(200).json({ message: 'Book deleted successfully' });
                                                                                                                            } catch (error) {
                                                                                                                                res.status(500).json({ error: error.message });
                                                                                                                                  }
                                                                                                                                  };
                                                                                                                           // Borrow Book
                                                                                                                                  exports.borrowBook = async (req, res) => {
                                                                                                                                    try {
                                                                                                                                        const { studentId, attendantId, returnDate } = req.body;
                                                                                                                                            const book = await Book.findById(req.params.id);

                                                                                                                                                if (!book) return res.status(404).json({ message: 'Book not found' });
                                                                                                                                                    if (book.status === 'OUT') return res.status(400).json({ message: 'Book is already borrowed' });

                                                                                                                                                        // Apply rules
                                                                                                                                                            book.status = 'OUT';
                                                                                                                                                                book.borrowedBy = studentId;
                                                                                                                                                                    book.issuedBy = attendantId;
                                                                                                                                                                        book.returnDate = returnDate;

                                                                                                                                                                            await book.save();
                                                                                                                                                                                res.status(200).json({ message: 'Book borrowed successfully', book });
                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                      res.status(500).json({ error: error.message });
                                                                                                                                                                                        }
                                                                                                                                                                                        };

                                                                                                                                                                                        // Return Book
                                                                                                                                                                                        exports.returnBook = async (req, res) => {
                                                                                                                                                                                          try {
                                                                                                                                                                                              const book = await Book.findById(req.params.id);

                                                                                                                                                                                                  if (!book) return res.status(404).json({ message: 'Book not found' });
                                                                                                                                                                                                      if (book.status === 'IN') return res.status(400).json({ message: 'Book is already in the library' });

                                                                                                                                                                                                          // Apply rules
                                                                                                                                                                                                              book.status = 'IN';
                                                                                                                                                                                                                  book.borrowedBy = null;
                                                                                                                                                                                                                      book.issuedBy = null;
                                                                                                                                                                                                                          book.returnDate = null;

                                                                                                                                                                                                                              await book.save();
                                                                                                                                                                                                                                  res.status(200).json({ message: 'Book returned successfully', book });
                                                                                                                                                                                                                                    } catch (error) {
                                                                                                                                                                                                                                        res.status(500).json({ error: error.message });
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                          };
