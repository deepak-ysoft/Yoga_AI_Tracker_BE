const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.log("MongoDB connection error:", err),
  );

// Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes"),
);
app.use(
  "/api/sessions",
  require("./routes/sessionRoutes"),
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      message: "Something went wrong!",
      error: err.message,
    });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),
);
