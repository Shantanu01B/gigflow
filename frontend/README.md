GigFlow – Freelance Job Marketplace (MERN)
GigFlow is a full-stack MERN application that allows users to post freelance jobs and apply to them through a bidding system. The platform supports secure authentication, real-time updates, and a clean hiring workflow similar to real-world freelance marketplaces.

This project was built as part of a Full Stack Development Internship Assignment.

🚀 Live Demo

✨ Features
🛡️ Authentication & Security
User authentication using JWT and HttpOnly cookies

Secure password hashing with bcrypt

Protected routes based on user roles

Session management

💼 Job Management
Post and browse freelance job listings

Job filtering and search functionality

Real-time job updates

Job status tracking (open/in-progress/completed)

👥 Role-Based Actions
For Clients:

Post new job listings

Review freelancer bids

Hire freelancers for projects

Manage posted projects

For Freelancers:

Browse available jobs

Submit bids on projects

Edit bids while pending

Track bid status

🔄 Real-Time Features
Live bid notifications using Socket.io

Real-time hiring updates

Instant status changes

Live chat between clients and freelancers

💰 Bidding System
One bid per freelancer per job

Bid editing capability while pending

Automatic rejection of other bids after hiring

Transaction-safe hiring logic using MongoDB sessions

🎨 User Experience
Toast notifications for user actions

Responsive and modern UI

Clean dashboards for both roles

Animated transitions and loading states

Professional design with Tailwind CSS
🛠️ Tech Stack
Frontend
React (Vite) - UI Framework

Tailwind CSS - Styling

Redux Toolkit - State Management

React Router - Navigation

React Hot Toast - Notifications

Socket.io Client - Real-time communication

Lucide React - Icons

Backend
Node.js - Runtime Environment

Express.js - Web Framework

MongoDB - Database

Mongoose - ODM

JWT - Authentication

Socket.io - Real-time WebSocket

Bcrypt - Password Hashing

CORS - Cross-Origin Resource Sharing

📁 Project Structure
GigFlow/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── gigController.js
│   │   └── bidController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Gig.js
│   │   └── Bid.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── gigRoutes.js
│   │   └── bidRoutes.js
│   ├── config/
│   │   ├── db.js
│   │   └── socket.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── GigDetail.jsx
│   │   │   ├── CreateGig.jsx
│   │   │   ├── ClientDashboard.jsx
│   │   │   └── FreelancerDashboard.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       └── authSlice.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
└── README.md

User Model
javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'freelancer' }, // 'client' or 'freelancer'
  createdAt: { type: Date, default: Date.now }
}
Gig Model
javascript
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['open', 'assigned', 'completed'], 
    default: 'open' 
  },
  location: String,
  skills: [String],
  createdAt: { type: Date, default: Date.now }
}
Bid Model
javascript
{
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  freelancerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  message: { type: String, required: true },
  bidAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'hired', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
}


🔌 API Endpoints
Authentication
POST /api/auth/register - Register new user

POST /api/auth/login - User login

POST /api/auth/logout - User logout

Gigs
GET /api/gigs - Get all gigs (with search query)

GET /api/gigs/:id - Get single gig by ID

POST /api/gigs - Create new gig (Client only)

GET /api/gigs/my - Get current user's posted gigs (Client only)

Bids
POST /api/bids - Create new bid (Freelancer only)

GET /api/bids/gig/:gigId - Get all bids for a gig

GET /api/bids/my - Get current user's bids (Freelancer only)

PUT /api/bids/:bidId - Update bid (Freelancer only)

PATCH /api/bids/:bidId/hire - Hire freelancer (Client only)

🚀 Setup Instructions
Prerequisites
Node.js (v14 or higher)

MongoDB (local or Atlas)

npm or yarn package manager

Demo Flow

Register and login

Post a job as a client

Login as another user

Place a bid on the job

View bid in freelancer dashboard

Hire freelancer as client

Observe real-time updates and status changes

Bonus Features

Real-time updates using Socket.io

MongoDB transaction-safe hiring logic

Toast notifications

Clean dashboards for both roles

Responsive UI