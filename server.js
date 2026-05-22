const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Import your Custom Error Handler
const errorHandler = require('./middleware/errorHandler');

// Load env variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

    // Simple Mock Login to generate a JWT for testing
    app.post('/login', (req, res) => {
      const { password } = req.body;
        
          if (password === 'admin123') {
              const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
                  res.status(200).json({ success: true, token });
                    } else {
                        res.status(401).json({ success: false, message: 'Invalid credentials' });
                          }
                          });

                          // Import Routes
                          const authorRoutes = require('./routes/authors');
                          const studentRoutes = require('./routes/students');
                          const attendantRoutes = require('./routes/attendants');
                          const bookRoutes = require('./routes/books');

                          // Use Routes
                          app.use('/authors', authorRoutes);
                          app.use('/students', studentRoutes);
                          app.use('/attendants', attendantRoutes);
                          app.use('/books', bookRoutes);

                          // Basic route to test the server
                          app.get('/', (req, res) => {
                            res.send('School Library API is running...');
                            });

                            // Custom Error Handler Middleware (MUST BE ABSOLUTELY LAST)
                            app.use(errorHandler);

                            const PORT = process.env.PORT || 5000;

                            app.listen(PORT, () => {
                              console.log(`🚀 Server running on port ${PORT}`);
                              });
                              