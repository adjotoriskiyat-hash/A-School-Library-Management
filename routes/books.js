const protect = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { 
  createBook, 
    getAllBooks, 
      getBookById, 
        updateBook, 
          deleteBook,
            borrowBook,
              returnBook
              } = require('../controllers/bookController');

              // Standard CRUD
              router.post('/', protect, createBook);
              router.get('/', getAllBooks);
              router.get('/:id', getBookById);
              router.put('/:id', updateBook);
              router.delete('/:id', deleteBook);

              // Borrow & Return Endpoints
              router.post('/:id/borrow', borrowBook);
              router.post('/:id/return', returnBook);

              module.exports = router;