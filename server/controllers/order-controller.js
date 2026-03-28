const orderService = require("../services/order-service");
const { serializeDoc, serializeDocs } = require("../utils/serialize-doc");

class OrderController {
  async list(req, res, next) {
    try {
      const rows = await orderService.getAll();
      res.json(serializeDocs(rows));
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const row = await orderService.getById(req.params.id);
      res.json(serializeDoc(row));
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const row = await orderService.create(req.body);
      res.status(201).json(serializeDoc(row));
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const row = await orderService.update(req.params.id, req.body);
      res.json(serializeDoc(row));
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const row = await orderService.remove(req.params.id);
      res.json(serializeDoc(row));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new OrderController();
