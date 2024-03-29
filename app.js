// Import required modules
require("dotenv").config();
const express = require("express");
const db_connect = require("./database/db");
const UserRouter = require("./routes/UserRoute");
const ProductRouter = require("./routes/ProductRoute");
const WishlistRouter = require("./routes/WishlistRoute");

const app = express();
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// Use UserRouter for handling user-related routes
app.use("/api/v1/users", UserRouter);

// Use ProductRouter for handling product-related routes
app.use("/api/v1/products", ProductRouter);

// Use WishlistRouter for handling wishlist-related routes
app.use("/api/v1/wishlist", WishlistRouter);

/**
 * Function to start the server
 **/

const startServer = async () => {
  try {
    // Connect to the database
    await db_connect();

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening at ${host}:${port}`);
    });
  } catch (error) {
    console.log("Error starting server: ", error);
  }
};

// Call the startServer function to start the server
startServer();
