🪶 Quillpad — Vision & Personal Growth App

Quillpad is a full-stack personal growth web app designed to help users clarify their vision, reflect on their journey, and track their progress over time.
It combines journaling, goal-setting, and self-awareness tools in one beautifully designed, intuitive space.

Quillpad is built for people who want to think clearly, grow intentionally, and document their life journey.

🚀 Tech Stack
Frontend
React
Vite
Tailwind CSS
Backend
Node.js
Express.js
MongoDB

Other Tools
Redux Toolkit (state management)
JWT (authentication)
Axios
bcryptjs
dotenv

🎯 Core Features

These are the main features that power Quillpad:

✍️ Journaling
Create, view, edit, and delete personal entries.
Each entry is automatically timestamped.
Search and filter entries by keywords or date.

🎯 Vision & Growth
Reflect on goals, ideas, and life direction.
Use Quillpad as a digital space for clarity and planning.
Track personal insights over time.

🔒 Authentication

Secure sign-up and login using JWT.
Private, user-specific data.

🧭 Dashboard

Overview of recent entries.
Quick access to your reflections and ideas.

⚙️ Setup & Installation
Clone the repository
git clone https://github.com/yourusername/quillpad.git
cd quillpad

Install dependencies

Backend:

cd backend
yarn install


Frontend:

cd ../frontend
yarn install

Environment Variables

Create a .env file in both /backend and /frontend:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
VITE_API_URL=http://localhost:5000/api

Run the App

From the root directory of the project:
yarn install
yarn dev

🧪 Development Tip

To skip authentication during development:

const isDev = import.meta.env.VITE_ENV === "development";

This helps speed up testing and can be disabled in production.

🗺️ Roadmap (Vision Direction)

Planned features for future versions:
📅 Calendar & Activity Stats
😊 Mood & Emotion Tracking
📄 Export Entries as PDF
🌍 Public / Private Vision Modes
✨ Advanced UI animations & micro-interactions
🎯 Dedicated Goals & Habits System

🧑‍💻 Author
SiwaGrace
Grace Esime Djobokou -> Frontend & Full-stack Developer
