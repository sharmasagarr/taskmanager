# 🧹 Task Manager App

A full-stack MERN (MongoDB, Express, React, Node.js) Task Manager app that allows users to create, assign, view, filter, and update tasks based on roles. Built with modern UI using Tailwind CSS and supports user authentication.

---

## 🔧 Tech Stack

### 💽 Frontend:

* React
* React Router DOM
* Axios
* Tailwind CSS
* React Icons
* React Hot Toast (for notifications)

### 🌐 Backend:

* Node.js
* Express.js
* MongoDB (with Mongoose)
* JSON Web Tokens (JWT)
* bcrypt (for password hashing)

---

## ✨ Features

* 🔐 User Authentication (Login/Logout)
* 📝 Create Task (with title, description, status)
* 👥 Assign task to other registered users via email
* 📊 Filter tasks by status, date, or assignment
* ✅ Update status only if you're the assignee
* 🗕️ Timestamp for task creation
* 💬 Real-time toast notifications
* 📆 Clean UI with Tailwind and Icons

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sharmasagarr/taskmanager.git
cd taskmanager
```

### 2. Install dependencies

#### For frontend:

```bash
cd client
npm install
```

#### For backend:

```bash
cd server
npm install
```

---

## 🔑 Environment Variables

### Frontend (.env)

Create a `.env` file inside `/client`:

```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

Create a `.env` file inside `/server`:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
```

---

## 🚀 Running the App

### Start the backend:

```bash
cd server
npm run dev
```

### Start the frontend:

```bash
cd client
npm run dev
```

The frontend will run at `http://localhost:5173`
The backend will run at `http://localhost:3000`

---

## 🛠 API Endpoints

### Auth

* `POST /api/auth/login` — Login user

### Tasks

* `POST /api/tasks` — Create task
* `GET /api/tasks` — Get all tasks
* `GET /api/tasks/filter` — Filter tasks
* `PATCH /api/tasks/:id/status` — Update task status
* `DELETE /api/tasks/:id` — Delete task

---

## 👤 Author

Made by **Sagar Sharma**
[GitHub](https://github.com/sharmasagarr)
