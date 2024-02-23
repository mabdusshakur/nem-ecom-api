require("dotenv").config();
const express = require("express");
const db_connect = require("./database/db");

const UserRouter = require("./routes/UserRoute");

const app = express();
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use("/api/v1/users", UserRouter);

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