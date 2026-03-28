const TaskModel = require("../models/task-model");
const ApiError = require("../exceptions/api-error");
const mongoose = require("mongoose");

const populateAssignees = {
  path: "assignee",
  select: "-password",
};

class TaskService {
  async getAll() {
    return TaskModel.find().sort({ date: -1 }).populate(populateAssignees);
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const doc = await TaskModel.findById(id).populate(populateAssignees);
    if (!doc) throw ApiError.NotFound("Task not found");
    return doc;
  }

  async create(payload) {
    const doc = await TaskModel.create(payload);
    return doc.populate(populateAssignees);
  }

  async update(id, payload) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const doc = await TaskModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).populate(populateAssignees);
    if (!doc) throw ApiError.NotFound("Task not found");
    return doc;
  }

  async remove(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const doc = await TaskModel.findByIdAndDelete(id);
    if (!doc) throw ApiError.NotFound("Task not found");
    return doc;
  }
}

module.exports = new TaskService();
