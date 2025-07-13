
# 🎯 Task Management System

A modern, full-stack task management application built for high school students. Organize your assignments, projects, and personal tasks with ease!

## ✨ Features

- 📝 **Task Management**: Add, edit, delete, and mark tasks as complete
- 🏷️ **Categories**: Organize tasks by Study, Personal, Project, or Other
- ⚡ **Priority Levels**: Set Low, Medium, or High priority for better planning
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean, distraction-free interface designed for students
- 🐳 **Docker Ready**: One command deployment with Docker Compose

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-management-system
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017

That's it! 🎉 Your task management system is now running locally.

## 🛠️ Development

### Project Structure
```
task-management-system/
├── frontend/          # React application
├── backend/           # Node.js/Express API
├── docker-compose.yml # Docker services configuration
├── README.md         # You're here!
└── LICENSE           # MIT License
```

### API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Environment Variables

The application uses the following environment variables (configured in docker-compose.yml):

- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Application environment
- `PORT` - Backend server port

## 🧑‍💻 Local Development (without Docker)

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### MongoDB
Make sure MongoDB is running locally on port 27017.

## 📦 Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **Web Server**: NGINX (in production)

