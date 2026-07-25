import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDatabase from "./config/database.js";

const startServer = async () => {
  await connectDatabase();

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
};

startServer();