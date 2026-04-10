import express from "express";
import { getDistance } from "../utils/distance.js";
import db from "../db.js";
export const addSchool= async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name?.trim() || !address?.trim() || latitude == null || longitude == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    

    await db.execute(query, [name, address, lat, lon]);

    res.status(201).json({
      message: "School added successfully",
      data: { name, address, latitude: lat, longitude: lon }
    });

  } catch (err) {
    next(err); 
  }
};


export const listSchools= async (req, res, next) => {
  try {
    let { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Coordinates required" });
    }

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    const [results] = await db.execute("SELECT * FROM schools");

    const sorted = results.map((school) => {
      const distance = getDistance(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      );

      return { ...school, distance };
    });

    sorted.sort((a, b) => a.distance - b.distance);

    res.json(sorted);

  } catch (err) {
    next(err);
  }
};

