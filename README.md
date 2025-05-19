
# Task and Course Management System

A simple RESTful API built with **NestJS**, **TypeScript**, and **MongoDB** for managing users, tasks, and courses.

---

## 📦 Technologies Used

- NestJS (TypeScript)
- MongoDB with Mongoose
- JWT for Authentication
- bcrypt for Password Hashing
- class-validator for DTO validation

---

## ⚙️ Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/kamola18/task-course-api.git
cd task-course-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**

Create a `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/task-course-db
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. **Run the app**

```bash
npm run start:dev
```

---

## 🔐 Authentication

### Register (Student or Admin)
`POST /auth/register`

```json
{
  "name": "Kamola",
  "email": "kamola@example.com",
  "password": "mypassword",
  "role": "student"
}
```

### Login and Get JWT Token
`POST /auth/login`

```json
{
  "email": "kamola@example.com",
  "password": "mypassword"
}
```

Response:

```json
{
  "access_token": "your.jwt.token"
}
```

Use this token in the `Authorization` header:

```
Bearer your.jwt.token
```

---

## 📘 API Endpoints

### 🔹 Tasks

- `POST /tasks` – Create a task (Auth required)
- `GET /tasks` – Get all tasks (Auth required)
- `GET /tasks/:id` – Get task by ID
- `PUT /tasks/:id` – Update a task
- `DELETE /tasks/:id` – Delete a task

### 🔹 Courses

- `POST /courses` – Create a new course (admin only)
- `GET /courses` – List all courses

### 🔹 Students

- `POST /courses/:courseId/register` – Register a student to a course (student only)
- `GET /students/:id/courses` – Get courses for a student (Auth required)

---

## 🧪 Sample Student Credentials

```json
{
  "email": "kamola@example.com",
  "password": "mypassword"
}
```

Use the `/auth/login` route to obtain a JWT token with this.

---

## 📌 Notes

- All users (students/admins) are stored in the `users` collection.
- Only students can register for courses and see their registered courses.
- Admins can create courses.
