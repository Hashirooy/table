const OrderModel = require("../models/order-model");
const ApiError = require("../exceptions/api-error");
const mongoose = require("mongoose");

class OrderService {
  async getAll() {
    return OrderModel.find().sort({ date: -1 });
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const doc = await OrderModel.findById(id);
    if (!doc) throw ApiError.NotFound("Order not found");
    return doc;
  }

  async create(payload) {
    return OrderModel.create(payload);
  }

  async update(id, payload) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const doc = await OrderModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw ApiError.NotFound("Order not found");
    return doc;
  }

  async remove(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const doc = await OrderModel.findByIdAndDelete(id);
    if (!doc) throw ApiError.NotFound("Order not found");
    return doc;
  }
}

module.exports = new OrderService();
