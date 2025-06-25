import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    unit: { type: String, enum: ["set", "each"], required: true },
    sellingPrice: { type: Number, required: true },
    description: { type: String },
    quantity: { type: Number, default: 0 },
    productCode: { type: String, required: true, unique: true },
    productStatus: {
      type: String,
      enum: ["manufacturing", "qc", "finished"],
      default: "manufacturing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
