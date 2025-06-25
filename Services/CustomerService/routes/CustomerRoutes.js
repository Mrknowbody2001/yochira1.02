import express from "express";

import CustomerValidator from "../Middlewares/CustomerValidator.js";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getOneCustomer,
  updateCustomer,
} from "../Controller/CustomerController.js";

const CustomerRoutes = express.Router();

// Register customer
CustomerRoutes.post("/register", CustomerValidator, createCustomer);

// Delete customer
CustomerRoutes.delete("/delete/:id", deleteCustomer);

// Update customer
CustomerRoutes.put("/update/:id", CustomerValidator, updateCustomer);

// Get all customers
CustomerRoutes.get("/getAllCustomers", getAllCustomers);

// Get one customer by ID
CustomerRoutes.get("/getOneCustomer/:id", getOneCustomer);

export default CustomerRoutes;
