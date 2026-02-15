const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Root route to show server is running
app.get("/", (req, res) => {
  res.send(`<h1>Blood Bank Server is Running on Port ${process.env.PORT || 8081}</h1><p>Access the API at /api/v1</p>`);
});

//routes
// 1 test route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`=`.repeat(50).bgBlue.white);
  console.log(`🩸 BLOOD BANK SERVER RUNNING SUCCESSFULLY`.bgBlue.white);
  console.log(`🌐 MODE: ${process.env.DEV_MODE || 'Development'}`.bgBlue.white);
  console.log(`🔌 PORT: ${PORT}`.bgBlue.white);
  console.log(`📝 API: http://localhost:${PORT}/`.bgBlue.white);
  console.log(`=`.repeat(50).bgBlue.white);
});
