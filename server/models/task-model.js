const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    assignee: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "assignee must be a non-empty array of user ids",
      },
    },
    priority: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: false }
);

module.exports = model("Task", taskSchema);
