const taskService = require("../services/task-service");
const { serializeTask, serializeTasks } = require("../utils/serialize-doc");

class TaskController {
  async list(req, res, next) {
    try {
      const rows = await taskService.getAll();
      res.json(serializeTasks(rows));
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const row = await taskService.getById(req.params.id);
      res.json(serializeTask(row));
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const row = await taskService.create(req.body);
      res.status(201).json(serializeTask(row));
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const row = await taskService.update(req.params.id, req.body);
      res.json(serializeTask(row));
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const row = await taskService.remove(req.params.id);
      res.json(serializeTask(row));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();
