require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Trello Lite Backend is Running...");
});

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/boards", require("./routes/boards"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/admin/boards", require("./routes/adminBoard"));

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
