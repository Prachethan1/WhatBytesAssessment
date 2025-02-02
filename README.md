# Task Management API 🚀

A Node.js backend for managing projects and tasks, built using Express.js, Prisma, and PostgreSQL. The API allows users to create projects, assign tasks, and manage them efficiently.

### 📌 Features
* User Authentication with JWT
* CRUD operations for Projects and Tasks
* Pagination for Projects
* Database Relations: User → Projects → Tasks

### 🛠 Tech Stack
* Backend: Node.js, Express.js
* Database: PostgreSQL (via Prisma ORM)
* Authentication: JWT
* Middleware: Express, CORS, dotenv

### 🚀 Getting Started

**Clone the repository**
```bash
  git clone https://github.com/yourusername/task-management-api.git
  cd task-management-api
```
**Install dependencies**
```bash
  npm install
```
**Set up the environment variables**
```bash
 PORT=3000
 DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
 JWT_SECRET="your_secret_key"
```
**Run Database Migrations**
```bash
  npx prisma migrate dev --name init
```

**Start the Server**
```bash
  npm run dev
```
The API will run at:
```bash
  http://localhost:3000
```


### Entities: 
### User: Represents a user in the system.
* id (UUID, auto-generated) 
* name (string) 
* email (string, unique) 
* createdAt (timestamp) 
### Project: Represents a project.
* id (UUID, auto-generated) 
* name (string) 
* description (string) 
* status (enum: PLANNED, ONGOING, COMPLETED) 
* createdAt (timestamp) 
* userId (relation to User) 
### Task: Represents a task under a project.
* id (UUID, auto-generated) 
* title (string) 
* description (string) 
* status (enum: TODO, IN_PROGRESS, DONE) 
* projectId (relation to Project) 
* createdAt (timestamp) 
* assignedUserId (relation to User) 


### API Endpoints: 
### User Endpoints:
* POST /users: Create a user. 
* GET /users: List all users. 
* PUT /users/:id: Update a user. 
* DELETE /users/:id: Delete a user
### Project Endpoints:
* POST /projects: Create a project. 
* GET /projects: List all projects. 
* PUT /projects/:id: Update a project. 
* DELETE /projects/:id: Delete a project. 
### Task Endpoints:
* POST /projects/:projectId/tasks: Create a task under a project.
* GET /projects/:projectId/tasks: List tasks for a project. 
* PUT /tasks/:id: Update task details or status. 
* DELETE /tasks/:id: Delete a task. 
### Filter Endpoints:
* GET /tasks?status=IN_PROGRESS&assignedUserId=uuid

### Screenrecording for testing process of endpoints

https://github.com/Prachethan1/WhatBytesAssessment/blob/main/screenrecording/screenrecording.mov

