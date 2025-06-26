import express from "express";
import CreateProduct, { deleteProduct, getAllProduct, getOneProduct, updateProduct }  from "../controllers/ProductController.js"
import validateProduct  from "../middlewares/ProductValidater.js";

const productRouter = express.Router();

productRouter.post("/create", validateProduct, CreateProduct);

//delete
productRouter.delete("/delete", deleteProduct);

//update
productRouter.put("/update/:id",validateProduct, updateProduct);

//getOneProduct 
productRouter.get("/:id", getOneProduct);

//getAllProduct 
productRouter.get("/", getAllProduct);

export default productRouter;