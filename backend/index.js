const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// routes
const journalRoutes = require("./routes/journalRoutes");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/journals", journalRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
