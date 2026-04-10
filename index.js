import dotenv from "dotenv";
dotenv.config();

import { db } from "./db.js";
import express from "express";
import router from "./routes/schoolRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "internal server error",
    error: err.message,
  });
});


app.get("/", (req, res) => {
  res.send("api is running");
})

async function startServer() {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB failed but starting server anyway");
  }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();