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
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://quillpad-b0ce.onrender.com", // Your future Vercel URL
];
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like (Postman, mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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
