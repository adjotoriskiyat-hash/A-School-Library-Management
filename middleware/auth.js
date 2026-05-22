const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

    // Check if the token is in the headers (Bearer token format)
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          token = req.headers.authorization.split(' ')[1];
            }

              if (!token) {
                  return res.status(401).json({ message: 'Not authorized to access this route. No token provided.' });
                    }

                      try {
                          // Verify token
                              const decoded = jwt.verify(token, process.env.JWT_SECRET);
                                  req.user = decoded; // Attach the dummy user payload to the request
                                      next();
                                        } catch (error) {
                                            return res.status(401).json({ message: 'Not authorized. Token is invalid or expired.' });
                                              }
                                              };

                                              module.exports = protect;
                                              