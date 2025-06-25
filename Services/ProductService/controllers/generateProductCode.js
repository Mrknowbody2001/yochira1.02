import Product from "../model/Product.js";

const generateProductCode = async (categoryId, subCategoryId) => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // e.g. 20250621

  // Count how many products already exist today for this category + subCategory
  const count = await FinishedProduct.countDocuments({
    category: categoryId,
    subCategory: subCategoryId,
    createdAt: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)), // today start
      $lte: new Date(new Date().setHours(23, 59, 59, 999)), // today end
    },
  });

  const seq = (count + 1).toString().padStart(3, "0"); // 001, 002, etc.

  // Build product code
  const catPart = categoryId.toString().slice(-3); // last 3 chars of categoryId
  const subCatPart = subCategoryId.toString().slice(-3); // last 3 chars of subCategoryId

  return `${catPart}-${subCatPart}-${datePart}-${seq}`;
};

export default generateProductCode;