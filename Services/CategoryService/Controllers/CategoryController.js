import Category from "../Model/Category.js";
import SubCategory from "../Model/SubCategory.js";

//!main category
export const createMainCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = new Category({
      name,
      parentCategory: null, // Main category has no parent
    });

    await category.save();

    res.status(200).json({
      message: "Main category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//delete category
export const deleteMainCategory = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//update category
export const updateMainCategory = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "Id and name are required" });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};
//get all category

export const getAllMainCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ parentCategory: null });
    res.status(200).json({
      message: "Main categories fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};
// get one category
export const getOneMainCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//!sub category
export const createSubCategory = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name and categoryId are required" });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Parent category not found" });
    }

    const subCategory = new SubCategory({
      name,
      category: categoryId,
    });

    await subCategory.save();

    res.status(200).json({
      message: "Subcategory created successfully",
      subCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//update subcategory
export const updateSubCategory = async (req, res, next) => {
  try {
    const { id, name, categoryId } = req.body;

    if (!id || !name || !categoryId) {
      return res
        .status(400)
        .json({ message: "Id, name and categoryId are required" });
    }
    // ✅ Check if main category exists before updating
    const mainCategory = await Category.findById(categoryId);
    if (!mainCategory) {
      return res.status(404).json({ message: "Main category not found" });
    }
    const subCategory = await SubCategory.findByIdAndUpdate(
      id,
      { name, category: categoryId },
      { new: true }
    );

    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({
      message: "Subcategory updated successfully",
      subCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//delete sub category

export const deleteSubCategory = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const subCategory = await SubCategory.findByIdAndDelete(id);

    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};
//get all sub category
export const getAllSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find({}).populate("category");
    res.status(200).json({
      message: "Subcategories fetched successfully",
      subCategories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//get one sub category
export const getOneSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({
      message: "Subcategory fetched successfully",
      subCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};
