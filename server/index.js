const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error-middleware");
const mongoose = require("mongoose");
const { createServer } = require("http");
const router = require("./router/index");
const roleService = require("./services/role-service");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("MongoDB connected");

    await roleService.initializeRoles();
    console.log("Roles initialized");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
