import dotenv from "dotenv";
dotenv.config();
import  {db}  from "./db.js";
import express from "express";

import router from "./routes/schoolRoutes.js";

const app= express();
const PORT= process.env.PORT || 5000;
app.use(express.json());

app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err); 

    res.status(500).json({
    message: "internal server error",
    error: err.message
  });
});

async function startServer() {
  await db(); 

  app.listen(PORT, () => {
    console.log("Server running");
  });
}

startServer();


