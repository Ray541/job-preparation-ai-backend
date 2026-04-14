# 🚀 Job Preparation AI - Backend

A powerful and scalable backend for the **Job Preparation AI** platform, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

This backend serves as the core engine for AI-driven mock interviews, resume analysis, and career guidance tools.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Dev Tools**: `nodemon`, `tsx` (for fast execution)

---

## 📁 Project Structure

```text
job-preparation-ai-backend/
├── src/
│   ├── config/         # Configuration files (DB, Auth, etc.)
│   │   └── db.ts       # Database connection
│   ├── app.ts          # Express application setup
├── server.ts           # Entry point
├── .env                # Environment variables
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 2. Clone the Repository
```bash
git clone https://github.com/Ray541/job-preparation-ai-backend.git
cd job-preparation-ai-backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 5. Run the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

---

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Health Check / API Welcome |

*More endpoints coming soon...*

---

## 🔐 Security & Configuration

- **CORS**: Configured to allow requests from `http://localhost:3000` (Default Next.js port).
- **Dotenv**: Environment variables are managed via `.env` files.
- **TypeScript**: Strict type checking and ESM modules enabled.

---

## 🤝 Contributing

1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License
Distributed under the ISC License.
