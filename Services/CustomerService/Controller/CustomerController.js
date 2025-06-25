import Customer from "../model/Customer.js";

//! create a customer
export const createCustomer = async (req, res, next) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(200).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Customer already exists" });
    }
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//! delete customer
export const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//! get all customers
export const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      message: "Customers fetched successfully",
      customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//! get one customer
export const getOneCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer fetched successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};

//! update customer
export const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;
    const updateData = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Customer with this email already exists" });
    }
    res.status(500).json({
      message: "Internal server error",
      error,
    });
    next(error);
  }
};
