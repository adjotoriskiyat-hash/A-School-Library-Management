const LibraryAttendant = require('../models/LibraryAttendant');

// Create attendant
exports.createAttendant = async (req, res) => {
  try {
      const attendant = await LibraryAttendant.create(req.body);
          res.status(201).json(attendant);
            } catch (error) {
                res.status(400).json({ error: error.message });
                  }
                  };

                  // Get all attendants
                  exports.getAllAttendants = async (req, res) => {
                    try {
                        const attendants = await LibraryAttendant.find();
                            res.status(200).json(attendants);
                              } catch (error) {
                                  res.status(500).json({ error: error.message });
                                    }
                                    };
                                    