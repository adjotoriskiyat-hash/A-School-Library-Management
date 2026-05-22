const Student = require('../models/Student');

// Create student
exports.createStudent = async (req, res) => {
  try {
      const student = await Student.create(req.body);
          res.status(201).json(student);
            } catch (error) {
                res.status(400).json({ error: error.message });
                  }
                  };

                  // Get all students
                  exports.getAllStudents = async (req, res) => {
                    try {
                        const students = await Student.find();
                            res.status(200).json(students);
                              } catch (error) {
                                  res.status(500).json({ error: error.message });
                                    }
                                    };

                                    // Get single student
                                    exports.getStudentById = async (req, res) => {
                                      try {
                                          const student = await Student.findById(req.params.id);
                                              if (!student) return res.status(404).json({ message: 'Student not found' });
                                                  res.status(200).json(student);
                                                    } catch (error) {
                                                        res.status(500).json({ error: error.message });
                                                          }
                                                          };
                                                          