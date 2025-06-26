import Product from "../model/Product.js";
import generateBarcodeBuffer from "../utils/barcodeGenerator.js";
import generateProductCode from "./generateProductCode.js";

const CreateProduct = async (req, res, next) => {
  try {
    const {
      productName,
      category,
      subCategory,
      unit,
      sellingPrice,
      description,
      quantity,
    } = req.body;

    // ✅ Generate productCode
    const productCode = await generateProductCode(category, subCategory);

    const product = new Product({
      productName,
      category,
      subCategory,
      unit,
      sellingPrice,
      description,
      quantity,
      productCode,
      productStatus: "manufacturing", // or whatever default
    });

    await product.save();

    const barcodeBuffer = await generateBarcodeBuffer(productCode);
    const barcodeBase64 = `data:image/png;base64,${barcodeBuffer.toString(
      "base64"
    )}`;

    res.status(200).json({
      message: "Product created successfully",
      product,
      barcode: barcodeBase64,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Product already exists" });
    }

    next(error);
  }
};
export default CreateProduct;

// delete product

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//get one product

export const getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      message: "All products fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};
//get one product

export const getOneProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    res.status(200).json({
      message: "product fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

//update product 

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};


