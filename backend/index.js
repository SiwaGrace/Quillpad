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

//
const corsOptions = {
  origin: "http://localhost:5173", // allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  credentials: true, // enable set-cookie and Authorization headers
};

// Connect to database
connectDB();

const app = express();

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
