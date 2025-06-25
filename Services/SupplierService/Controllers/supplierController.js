import Supplier from "../Models/Supplier.js";

export const createSupplier = async (req, res, next) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(200).json({
      message: "Supplier created successfully",
      supplier,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Supplier already exists" });
    }
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    await Supplier.findByIdAndDelete(req.body.id);
    res.status(200).json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const supplierId = req.params.id;
    const updateData = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({
      message: "Supplier updated successfully",
      supplier: updatedSupplier,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Supplier with this email already exists" });
    }
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

export const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json({
      message: "Suppliers fetched successfully",
      suppliers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

export const getOneSupplier = async (req, res, next) => {
  try {
    const supplierId = req.params.id;
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json({
      message: "Supplier fetched successfully",
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};
