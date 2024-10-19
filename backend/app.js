// import fs from "node:fs/promises";

// import bodyParser from "body-parser";
import axios from  "axios";

import express from "express";

const app = express();

// app.use(express.static("images"));
// app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/blocks", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/color.json");

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get("/meteo-data", async (req, res) => {
  const { lat, lng } =  req.query;
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=sunrise,sunset&hourly=relative_humidity_2m,precipitation,cloudcover,windspeed_10m,surface_pressure&timezone=auto`;

    // Making a request to API
    const response = await axios.get(url);

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching weather data"});
  }

  
});


// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
