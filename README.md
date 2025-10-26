🪶 Quillpad — Personal Journal App

Quillpad is a full-stack journal web app designed for self-reflection, creativity, and personal growth.
Users can write, edit, and delete journal entries, track their moods, view insights, and visualize their writing habits — all in one intuitive, beautifully designed space.

🚀 Tech Stack

Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express.js, MongoDB
Authentication: JWT (JSON Web Tokens)
State Management: Redux Toolkit
Other Tools: Axios, dotenv, bcryptjs

🎯 Core Journal Functionality

These are the core features that make Quillpad a complete journaling experience:

✍️ Create, View, Edit, Delete Entries — Manage your personal thoughts and reflections easily.

🔒 User Authentication — Secure sign-up, login, and logout using JWT.

🧭 Dashboard View — See your latest journal entries at a glance.

🗓️ Date Tracking — Each entry automatically logs the date of creation and update.

🗂️ Filter & Search — Quickly find past entries by keyword or date.

⚙️ Setup & Installation

Clone the repository

git clone https://github.com/yourusername/quillpad.git
cd quillpad

Install dependencies

# install backend dependencies

cd backend && npm install

# install frontend dependencies

cd ../frontend && npm install

Set up environment variables
In both /backend and /frontend folders, create a .env file with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
VITE_API_URL=http://localhost:5000/api

Run the app

npm run dev

or (if using Yarn)

yarn dev

🧪 Dev Notes

If you don’t want to log in repeatedly during testing, use:

const isDev = import.meta.env.VITE_ENV === "development";

to skip login during development and re-enable it for production.

📌 Roadmap

Add Calendar & Stats Pages

Integrate Mood Tracking

Add Export as PDF Feature

Implement Public/Private Journal Modes

Polish UI animations

🧑‍💻 Author

Grace Esime Djobokou
Frontend & Fullstack Developer
