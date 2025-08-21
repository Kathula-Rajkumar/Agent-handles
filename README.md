**Tech Stack**

Frontend: React, Tailwind CSS

Backend: Node.js, Express.js, MongoDB

Authentication: JWT


**Folder Structure**

admin-agent/
├─ backend/       # Express API, MongoDB models, routes
├─ frontend/      # React app, components, pages
└─ README.md

1. **Clone the repository**
git clone https://github.com/Kathula-Rajkumar/Agent-handles.git
cd Agent-handles

2. **Backend Setup**
cd backend
npm install

**Create a .env file with MongoDB URI:**

MONGO_URI=your_mongodb_connection_string
PORT=5000

**Start backend server:**

npm run dev

3. **Frontend Setup**
cd ../frontend
npm install
npm start


**Frontend runs on http://localhost:3000 by default.**

**Usage**

Login as admin. 
email: **admin@example.com**
password: **Admin@123**

Add agents.

Upload listings via CSV.

Manage agents and listings via dashboard.
