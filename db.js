import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

let db;

try {
  db = await mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
  });

  console.log("Connected to MySQL");
} catch (err) {
  console.error("DB connection failed:", err.message);
}

export default db;