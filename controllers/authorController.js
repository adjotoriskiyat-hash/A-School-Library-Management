const Author = require('../models/Author');

// Create author
exports.createAuthor = async (req, res) => {
  try {
      const author = await Author.create(req.body);
          res.status(201).json(author);
            } catch (error) {
                res.status(400).json({ error: error.message });
                  }
                  };

                  // Get all authors
                  exports.getAllAuthors = async (req, res) => {
                    try {
                        const authors = await Author.find();
                            res.status(200).json(authors);
                              } catch (error) {
                                  res.status(500).json({ error: error.message });
                                    }
                                    };

                                    // Get single author
                                    exports.getAuthorById = async (req, res) => {
                                      try {
                                          const author = await Author.findById(req.params.id);
                                              if (!author) return res.status(404).json({ message: 'Author not found' });
                                                  res.status(200).json(author);
                                                    } catch (error) {
                                                        res.status(500).json({ error: error.message });
                                                          }
                                                          };

                                                          // Update author
                                                          exports.updateAuthor = async (req, res) => {
                                                            try {
                                                                const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
                                                                    if (!author) return res.status(404).json({ message: 'Author not found' });
                                                                        res.status(200).json(author);
                                                                          } catch (error) {
                                                                              res.status(400).json({ error: error.message });
                                                                                }
                                                                                };

                                                                                // Delete author
                                                                                exports.deleteAuthor = async (req, res) => {
                                                                                  try {
                                                                                      const author = await Author.findByIdAndDelete(req.params.id);
                                                                                          if (!author) return res.status(404).json({ message: 'Author not found' });
                                                                                              res.status(200).json({ message: 'Author deleted successfully' });
                                                                                                } catch (error) {
                                                                                                    res.status(500).json({ error: error.message });
                                                                                                      }
                                                                                                      };
                                                                                                      