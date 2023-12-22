# Trello App

## Overview

This application is a comprehensive task management system inspired by Trello, designed to streamline project management and team collaboration. It is built using modern web technologies including Node.js for the backend, Express.js as the web application framework, and MongoDB for the database. The application's primary goal is to provide a user-friendly platform for users to organize, track, and manage their tasks efficiently.

Key functionalities include:
- **User Management**: Users can sign up, verify their email, log in, and manage their profiles. Features like changing passwords, updating user information, and soft deletion of accounts are integrated for enhanced user experience.
- **Task Management**: Users can create tasks with details like title, description, and deadlines. Tasks can be assigned to specific users and their status (ToDo, Doing, Done) can be tracked and updated.
- **Collaboration and Assignment**: The system allows for tasks to be assigned to different users, facilitating team collaboration. Users can view tasks assigned to them and update their progress.
- **Email Integration**: The application uses Nodemailer for email operations, enabling functionalities like email verification and notifications.
- **Security and Authentication**: With JWT (JSON Web Tokens) and bcrypt for hashing passwords, the application ensures secure authentication and data protection.

The backend structure is built to support scalability and maintainability, with clear routes and separation of concerns in the codebase. The application is designed to be intuitive and user-centric, catering to both individual users managing personal tasks and teams collaborating on larger projects.

## Technologies

- **Node.js**: JavaScript runtime environment for building the server-side of the application.
- **Express.js**: Web application framework for Node.js, used for building web applications and APIs.
- **MongoDB**: NoSQL database used to store application data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Multer**: Middleware for handling file uploads.
- **Cloudinary**: Cloud service for image storage and management.
- **JSON Web Tokens (JWT)**: Used for securely transmitting information between parties as a JSON object.
- **Bcryptjs**: Library for hashing and salting user passwords.
- **Nodemailer**: Module for Node.js applications to send emails.
- **Joi**: Library for schema description and data validation.
- **Dotenv**: Module for loading environment variables from a `.env` file.
- **UUID**: Library for generating unique identifiers.

## Configuration

### .env File
Create a `.env` file in the root directory with the following configurations:

```
JWT_KEY = abdelkadertrello
SALT_ROUND = 8
MONGO_URL = mongodb://127.0.0.1:27017/TrelloApp
MODE = dev
email= your email
emailpass = your password
BASE_URL = http://localhost:4000
```

## API Endpoints

### User Endpoints
- `POST /signUp`: Register a new user.
- `GET /verify/:token`: Verify a user's email.
- `POST /signIn`: Authenticate a user.
- `GET /getAllUsers`: Retrieve all users.
- `PATCH /changePassword`: Change a user's password.
- `PUT /updateUser`: Update user details.
- `DELETE /deleteUser`: Delete a user.
- `PATCH /softDelete`: Soft delete a user (mark as deleted).
- `PATCH /logOut`: Log out a user.

### Task Endpoints
- `POST /addTask`: Add a new task.
- `PUT /updateTask/:_id`: Update an existing task.
- `DELETE /deleteTask/:_id`: Delete a task.
- `GET /getAllTasks`: Retrieve all tasks.
- `GET /getTasksOfOneUser`: Get tasks assigned to a specific user.

## Project Structure

```plaintext
Trello Assignment
│
├── DB
│   ├── models
│   │   ├── task.model.js
│   │   └── user.model.js
│   └── dbConnection.js
│
├── email
│   ├── html.js
│   └── nodemailer.js
│
├── src
│   ├── middleware
│   │   ├── auth.js
│   │   ├── errorHandlingMiddleware.js
│   │   └── validation.js
│   │
│   ├── modules
│   │   ├── Tasks
│   │   │   ├── task.controller.js
│   │   │   ├── task.model.js
│   │   │   ├── task.routes.js
│   │   │   └── task.validation.js
│   │   │
│   │   └── Users
│   │       ├── user.controller.js
│   │       ├── user.model.js
│   │       ├── user.routes.js
│   │       └── user.validation.js
│   │
│   ├── multer
│   │   └── multer.js
│   │
│   └── utils
│       ├── AppError.js
│       └── catchAsyncErrors.js
│
├── uploads
│   └── Profile Photo
│
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md

## Installation and Running

1. Clone the repository:
   ```
   git clone https://github.com/AbdeIkader/Todo-App.git
   ```
2. Navigate to the project directory:
   ```
   cd Trello Assignment
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up your environment variables as per the `.env` file instructions.
5. Start the server:
   ```
   npm start
   ```

## Contributing

Contributions are welcome. Please follow standard fork and pull request workflow.

## License

This project is licensed under the ISC License.

## Contact

- Email: [abdelrahmanabdelkader2002@gmail.com](mailto:abdelrahmanabdelkader2002@gmail.com)

---




