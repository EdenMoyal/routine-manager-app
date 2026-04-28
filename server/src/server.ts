import dotenv from 'dotenv';
dotenv.config();  // Reads the .env file from the root directory, parses the content, and assigns it to process.env

import { app } from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Could not start server due to DB connection failure.", error);
    process.exit(1);
  }
};

startServer();