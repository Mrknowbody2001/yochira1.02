import express from "express";
import {
  createMainCategory,
  createSubCategory,
  deleteMainCategory,
  deleteSubCategory,
  getAllMainCategories,
  getAllSubCategories,
  getOneMainCategory,
  getOneSubCategory,
  updateMainCategory,
  updateSubCategory,
} from "../Controllers/CategoryController.js";

const router = express.Router();
// main category
router.post("/create", createMainCategory);
router.delete("/delete", deleteMainCategory);
router.put("/update/:id", updateMainCategory);
router.get("/getAllMainCategories", getAllMainCategories);
router.get("/getOneMainCategory/:id", getOneMainCategory);

//sub category
router.post("/create", createSubCategory);
router.delete("/delete", deleteSubCategory);
router.put("/update/:id", updateSubCategory);
router.get("/getAllSubCategories", getAllSubCategories);
router.get("/getOneSubCategory/:id", getOneSubCategory);

export default router;
