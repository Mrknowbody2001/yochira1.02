import express from "express";
const router = express.Router();
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getOneSupplier,
  updateSupplier,
} from "../Controllers/supplierController.js";
import supplierValidator from "../Middlewares/supplierValidator.js";
import { get } from "mongoose";

router.post(
  "/register",
  supplierValidator, // ✅ pass the array directly.....
  createSupplier
);
router.delete("/delete", deleteSupplier);

router.put("/update/:id", supplierValidator, updateSupplier);

router.get("/getAllSuppliers", getAllSuppliers);

router.get("/getOneSupplier/:id", getOneSupplier);

export default router;
