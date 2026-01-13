# 🚀 GigFlow – Freelance Job Marketplace

**GigFlow** is a high-performance, full-stack MERN application designed to connect clients with freelancers. It features a robust bidding system, real-time notifications via Socket.io, and secure role-based access control.

Built as part of a **Full Stack Development Internship Assignment.**



---

## ✨ Features

### 🛡️ Authentication & Security
* **JWT & HttpOnly Cookies:** Secure session management preventing XSS attacks.
* **Bcrypt Hashing:** Industry-standard password encryption.
* **Role-Based Access (RBAC):** Distinct workflows and protected routes for Clients and Freelancers.

### 💼 Job Management
* **Dynamic Browsing:** Filter and search through freelance listings.
* **Lifecycle Tracking:** Gigs transition through `Open` → `In-Progress` → `Completed` statuses.
* **Real-time Updates:** Instant visibility of new job posts and status changes.

### 💰 Intelligent Bidding System
* **Transaction Safety:** Uses **MongoDB Sessions** to ensure hiring logic is atomic (prevents double-hiring).
* **Bid Management:** Freelancers can place and edit bids; clients can review and hire with one click.
* **Auto-Cleanup:** Automatically rejects other pending bids once a freelancer is hired.

### 🔄 Real-Time & UX
* **Socket.io Integration:** Live bid notifications and instant hiring alerts.
* **Responsive Design:** Fully mobile-friendly UI built with Tailwind CSS.
* **Interactive Feedback:** Toast notifications and smooth loading states.

---

## 🛠️ Tech Stack

| **Frontend** | **Backend** | **Database & Tools** |
| :--- | :--- | :--- |
| React (Vite) | Node.js | MongoDB |
| Redux Toolkit | Express.js | Mongoose (ODM) |
| Tailwind CSS | Socket.io | JWT / Bcrypt |
| Lucide React | CORS | React Hot Toast |

---

## 📁 Project Structure

```text
GigFlow/
├── backend/
│   ├── controllers/    # Auth, Gig, and Bid logic
│   ├── models/         # User, Gig, Bid schemas
│   ├── routes/         # API Routes
│   ├── config/         # DB & Socket configurations
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── pages/      # Dashboard, Gigs, Auth pages
    │   ├── components/ # Reusable UI components
    │   ├── redux/      # Store and State Slices
    │   └── services/   # API & Socket instances
Database Models
User Model
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'freelancer' }, // 'client' or 'freelancer'
  createdAt: { type: Date, default: Date.now }
}

Gig Model
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open', 'assigned', 'completed'], default: 'open' }
}
Bid Model
{
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bidAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'hired', 'rejected'], default: 'pending' }
}

🔌 API Endpoints
Authentication
POST /api/auth/register - Register new user

POST /api/auth/login - User login

POST /api/auth/logout - User logout

Gigs
GET /api/gigs - Get all gigs (with search query)

POST /api/gigs - Create new gig (Client only)

GET /api/gigs/my - Get current user's posted gigs

Bids
POST /api/bids - Create new bid (Freelancer only)

PATCH /api/bids/:bidId/hire - Hire freelancer (Client only)

🚀 Setup Instructions
1. Prerequisites
Node.js (v14 or higher)

MongoDB (Local or Atlas)

2. Installation

# Clone the repository
git clone [https://github.com/yourusername/gigflow.git](https://github.com/yourusername/gigflow.git)

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
3. Environment Setup
Create a .env file in the backend/ directory:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
4. Running the App
Bash

# Run Backend (from /backend)
npm run dev

# Run Frontend (from /frontend)
npm run dev
💡 Demo Flow
Register as a Client and post a new job.

Login as a Freelancer in a different browser/tab.

Place a Bid on the job.

Go back to the Client Dashboard to see the bid instantly via Socket.io.

Hire the freelancer and observe the status changes.
