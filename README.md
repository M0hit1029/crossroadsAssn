# React Redux CRUD Dashboard

This project is a React-based dashboard application built using Vite that demonstrates fetching data from a public GET API, managing global state with Redux Toolkit, and performing complete CRUD (Create, Read, Update, Delete) operations. The application fetches user data from a mock API and stores it in Redux, while create, update, and delete operations are handled locally within the Redux store. The UI is built using **shadcn/ui** components for a clean and modern design, and **React Toastify** is used to provide user-friendly toast notifications for actions like adding, updating, and deleting records. The dashboard displays data in a structured table with proper loading and error handling, making the project suitable for learning and demonstrating Redux-based state management in a real-world frontend scenario.

---

## 🚀 Features

- Fetch data from a public REST API
- Global state management using Redux Toolkit
- Full CRUD operations (Create, Read, Update, Delete)
- Dashboard table view with actions
- Toast notifications using React Toastify
- Clean UI built with shadcn/ui
- Loading and error handling
- Scalable and organized folder structure

---

## 🛠️ Tech Stack

- React (Vite)
- Redux Toolkit
- React Redux
- shadcn/ui
- React Toastify
- Tailwind CSS
- JavaScript (ES6+)

---

## 🌐 API Used
https://jsonplaceholder.typicode.com/users

## 📁 Project Structure
frontend/
│── public/
│── src/
│ ├── assets/
│ ├── components/ # Reusable UI components (Table, Modal, Buttons)
│ ├── features/ # Redux slices (CRUD logic)
│ ├── services/ # API calls
│ ├── store/ # Redux store configuration
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md

## 🔄 CRUD Functionality

- **Create:** Add a new user and store it in Redux
- **Read:** Fetch users from the API and display them in a table
- **Update:** Edit existing user details using Redux state
- **Delete:** Remove a user from Redux state

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/M0hit1029/crossroadsAssn.git
cd crossroadsAssn
npm i
npm run dev

