# 🧰 NestJS Job Queue & Worker Task Service API

A production-ready REST API built with **NestJS**, featuring **background job processing** with **Bull (Redis)**, **job status tracking** persisted in **PostgreSQL**, and **Prisma ORM** for type-safe database access.

This project serves as a clean and scalable backend foundation for running **asynchronous / long-running tasks** (exports, emails, reports, media processing) without blocking HTTP requests, while providing endpoints to **create jobs** and **check their status**.

---

## 🟢 Live Demo

You can try the job service system in action here:

👉 **Live Demo:** https://rscoding.dev/projects/nestjs/demo

The demo showcases:
- See jobs being processed in realtime
- List of queues
- Interaction with backend live

---

## 🚀 Features

### Job Creation & Enqueuing
- Create a job via a REST endpoint
- Persist the job to PostgreSQL with initial status **PENDING**
- Enqueue a queue task to be processed asynchronously

### Worker Processing
- Bull queue worker consumes jobs in the background
- Updates job lifecycle in the database:
  **PENDING → PROCESSING → DONE**
- Includes a simulated long-running workload (~10 seconds) to demonstrate async execution

### Job Status Retrieval
- Fetch an existing job by ID
- Returns the current status from the database
- Returns a proper not-found response when the job does not exist

### Queue Infrastructure
- Bull queue backed by Redis
- Queue name: **jobs**
- Job type: **run**
- Dedicated processor updates status during execution

### Database
- Prisma ORM
- PostgreSQL
- Type-safe queries
- Clean schema design (Job model + JobStatus enum)

---

## 🧱 Tech Stack

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Bull (Queue)
- Redis

---

## 📁 Project Structure

```text
src/
├── jobs/
│   ├── jobs.controller.ts     # REST endpoints (create job, get status)
│   ├── jobs.service.ts        # DB create + enqueue to queue
│   └── jobs.module.ts
├── queue/
│   ├── jobs.processor.ts      # Worker: processes queue jobs, updates DB status
│   ├── queue.module.ts        # Bull/Redis configuration
│   └── queue.service.ts
├── prisma/
│   └── prisma.service.ts      # Prisma client service
├── app.module.ts
└── main.ts                    # Application entry point (default port 3002)
prisma/
└── schema.prisma              # Job model + JobStatus enum
```

---

## ⚙️ Prerequisites

Make sure you have installed:

- Node.js (v18+ recommended)
- npm
- PostgreSQL
- Redis
- Git

---

## ⚙️ Environment Variables

Create a .env file in the project root:

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME  
REDIS_HOST=localhost  
REDIS_PORT=6379  
PORT=3002  

Notes:
- If **REDIS_HOST** is not set, the app defaults to **redis** (useful in Docker networks).
- If **PORT** is not set, the server defaults to **3002**.

---

## 📦 Installation

Clone the repository:

git clone https://github.com/your-username/your-repo.git  
cd your-repo  

Install dependencies:

npm install

---

## 🗄️ Database Setup (Prisma)

Generate Prisma Client:
npx prisma generate

Run database migrations:
npx prisma migrate dev --name init

(Optional) Open Prisma Studio:
npx prisma studio

---

## ▶️ Running the Application

Development mode:
npm run start

Watch mode:
npm run start:dev

Production mode:
npm run start:prod

Server runs on:
http://localhost:3002

---

## 🔑 Job Flow

Create a job:
POST /jobs

What happens next:
1) The API creates a database record with status **PENDING**
2) The service enqueues a Bull job to the **jobs** queue
3) The worker picks it up, marks it **PROCESSING**
4) After processing (simulated ~10 seconds), it marks it **DONE**

Check job status:
GET /jobs/:id

---

## 📌 API Endpoints

Jobs:
- POST /jobs
- GET /jobs/:id

---

## 🧠 Notes

- Redis is required for Bull queues.
- Job state is stored in PostgreSQL via Prisma (not in memory).
- This project is designed as a scalable foundation for background task processing.

---

## 📄 License

MIT License