import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import productRoutes from "./routes/ProductRoutes.js";
import productRouter from "./routes/ProductRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

app.use("/api/product", productRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
