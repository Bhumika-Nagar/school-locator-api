import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

let db;

try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("Connected to MySQL");
} catch (err) {
  console.error("DB connection failed:", err.message);
}

export default db;