require("dotenv").config();
const express = require("express");
const db_connect = require("./database/db");

const app = express();
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

const startServer = async () => {
  try {
    await db_connect();
    app.listen(port, () => {
      console.log(`Server listening at ${host}:${port}`);
    });
  } catch (error) {
    console.log("Error starting server: ", error);
  }
};

startServer();