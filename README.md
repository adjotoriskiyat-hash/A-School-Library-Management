
# School Library Management API

A robust RESTful API built to manage a school library system. Developed as part of the TS Academy Phoenix Cohort Assignment 1.

## 🛠️ Tech Stack
* **Node.js**
* **Express.js**
* **MongoDB** (with Mongoose)

## 📁 Architecture
This project strictly follows the **MVC (Model-View-Controller)** pattern, ensuring a well-structured, maintainable, and scalable codebase separating database schemas, business logic, and routing.

## 🚀 Setup Instructions

1. **Clone the repository** to your local machine or Codespace.
2. **Install dependencies** by running:
   ```bash
      npm install

      ```
       3. **Configure Environment Variables**: Create a .env file in the root folder and add your credentials:
          ```env
             PORT=5000
                MONGO_URI=your_mongodb_connection_string
                   JWT_SECRET=your_secret_key
                      
                         ```
                          4. **Start the server**:
                             ```bash
                                npm run dev
                                   
                                      ```
                                      ## 📖 API Documentation (Endpoints)
                                      ### Auth (Bonus)
                                       * POST /login - Mock login to generate a JWT for protected routes.
                                       ### Authors
                                        * POST /authors - Create a new author
                                         * GET /authors - Get all authors
                                          * GET /authors/:id - Get a single author
                                           * PUT /authors/:id - Update an author
                                            * DELETE /authors/:id - Delete an author
                                            ### Books (Protected & Advanced Logic)
                                             * POST /books - Create a new book (Requires JWT Auth)
                                              * GET /books - Get all books (Includes search by title/author, pagination, and overdue checks)
                                               * GET /books/:id - Get a single book (Dynamically populates student/attendant details if status is "OUT")
                                                * PUT /books/:id - Update a book
                                                 * DELETE /books/:id - Delete a book
                                                  * POST /books/:id/borrow - Borrow a book (Updates status to OUT)
                                                   * POST /books/:id/return - Return a book (Updates status to IN)
                                                   ### Students
                                                    * POST /students - Create a new student
                                                     * GET /students - Get all students
                                                      * GET /students/:id - Get a single student
                                                      ### Library Attendants
                                                       * POST /attendants - Create a new library attendant
                                                        * GET /attendants - Get all library attendants
                                                        ```