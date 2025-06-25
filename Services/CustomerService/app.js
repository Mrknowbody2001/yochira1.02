import express from "express";
import mongoose from "mongoose";
// Routes
;

// const cors = require("cors");
import dotenv from "dotenv";
import CustomerRoutes from "./routes/CustomerRoutes.js";
//
const app = express();
app.use(express.json());
// app.use(cors());

//! error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});


dotenv.config();

app.use("/api/customer", CustomerRoutes);

//! Database connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log(error);
    });

//! start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
