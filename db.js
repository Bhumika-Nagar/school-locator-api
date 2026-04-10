import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mysql from "mysql2/promise";

let connection;

export async function db() {
  try{

    connection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      port: Number(process.env.MYSQLPORT), 
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
    });

    console.log("Connected to MySQL");
    return connection;

  } catch (err) {
    console.error("DB connection failed FULL ERROR:", err);
    process.exit(1); 
  }
}

export function getDB() {
  if (!connection) {
    throw new Error("DB not connected. Call connectDB() first.");
  }
  return connection;
}