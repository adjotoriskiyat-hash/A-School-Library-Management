const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Logs the full error in your terminal for debugging

      // Catch Mongoose Duplicate Key Error (Like a duplicate ISBN or Email)
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
                return res.status(400).json({ 
                      success: false,
                            error: `A record with that ${field} already exists. Please use a unique value.` 
                                });
                                  }

                                    // Catch Mongoose Validation Errors (Missing required fields)
                                      if (err.name === 'ValidationError') {
                                          const message = Object.values(err.errors).map(val => val.message).join(', ');
                                              return res.status(400).json({ success: false, error: message });
                                                }

                                                  // Default fallback for any other server errors
                                                    res.status(500).json({ 
                                                        success: false,
                                                            error: err.message || 'Internal Server Error' 
                                                              });
                                                              };

                                                              module.exports = errorHandler;
                                                            
