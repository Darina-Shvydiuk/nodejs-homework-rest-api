import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Server not running. Error message: ${error.message}`);
        process.exit(1);
    });
