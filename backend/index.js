const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// routes
const journalRoutes = require("./routes/journalRoutes");
const authRoutes = require("./routes/authRoutes");

// Load env vars
dotenv.config();

// Connect to database
connectDB();
const app = express();

// cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
