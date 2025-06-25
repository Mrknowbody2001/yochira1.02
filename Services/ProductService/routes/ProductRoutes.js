import express from "express";
import CreateProduct, { deleteProduct }  from "../controllers/ProductController.js"
import validateProduct  from "../middlewares/ProductValidater.js";

const productRouter = express.Router();

productRouter.post("/create", validateProduct, CreateProduct);

//delete
productRouter.delete("/delete", deleteProduct);

export default productRouter;