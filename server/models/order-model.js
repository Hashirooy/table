const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    customerName: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    notes: { type: String, default: "" },
  },
  { timestamps: false },
);

module.exports = model("Order", orderSchema);
