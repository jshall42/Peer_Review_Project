# 📚 Peer Review Web Application

A fully functional, full-stack web platform for facilitating **anonymous**, **transparent**, and **constructive peer feedback** between students and instructors.

---

## 🚧 Work in Progress

> This project is actively being developed.  
> At the moment, you can clone the repo and run the frontend locally to see some of the UI—such as the home, registration, login, and forgot password pages.  
>
> ⚠️ **Important:** The backend is not yet fully functional or hosted, so dynamic features like authentication, data saving, and peer reviews will **not** work at this time.
>         (The data saving and peer reviews are fucntional just not complete or deployed anywhere so they are WIP)

---

### 🔍 What You Can Explore

- Frontend React components and layout  
- Responsive and accessible UI design  
- Backend structure and API design (not deployed yet)  
- Project architecture and code organization  

📁 The backend is under development; no live data or API calls will succeed yet.

---

## 🚀 Overview

This application enables instructors to create and manage courses, teams, and peer review activities. Students can participate in scheduled reviews, answer a variety of question types, and receive personalized feedback reports — all through an intuitive, mobile-friendly interface.

> 🔐 Built with accessibility, security, and user experience in mind, this project is ideal for educational institutions and collaborative learning environments.

---

## ✨ Features

### ✅ Instructor Tools
- Create and manage courses  
- Invite students  
- Form student teams  
- Design, schedule, and monitor peer reviews  
- Create reviews with Likert, short answer, multiple-choice questions, and etc. 
- View both student-level and class-wide reports  

### 🎓 Student Tools
- Register and enroll in courses  
- Join teams and complete anonymous peer assessments  
- Receive personalized feedback summaries  

### 🛡 Platform Highlights
- Single Page Application design (SPA)  
- Secure login with bcrypt
- WCAG-compliant accessibility  
- Role-based access control  

---

## 🧰 Tech Stack

| Layer       | Technologies                               |
|-------------|--------------------------------------------|
| Frontend    | React, TypeScript, HTML, CSS (Bootstrap)   |
| Backend     | Node.js, Express.js                        |
| Database    | PostgreSQL (AWS RDS)                       |
| Hosting     | Render (backend and frontend)              |
| Security    | bcrypt, UUID, CORS, HTTPS-ready            |

---

## 🛠 Installation (Local Setup)

```bash
# Clone the repo
git clone https://github.com/yourusername/peer-review-app.git
cd peer-review-app

# Install backend dependencies (Not needed since backend doesn't work locally)
cd server
npm install

# Run the backend (note: backend is not functional yet)
node index.js

# In a new terminal, install frontend dependencies
cd ../client/peer-review-app
npm install

# Run the frontend
npm run dev
