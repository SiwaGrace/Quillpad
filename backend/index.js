const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// routes
const journalRoutes = require("./routes/journalRoutes");
const authRoutes = require("./routes/authRoutes");
const visionRoutes = require("./routes/visionRoute");
const quoteRoutes = require("./routes/quotes.js");
const scriptureRoute = require("./routes/scripture");
const subVisionRoutes = require("./routes/subVisionRoutes.js");

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
app.use("/api/visions", visionRoutes);
app.use("/api/visions", subVisionRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api", quoteRoutes);
app.use("/api", scriptureRoute);

// it's working?
app.use("/home", (req, res) => {
  res.status(200).json("hello");
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
