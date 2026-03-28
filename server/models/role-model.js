const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["CLIENT", "ADMIN", "MODERATOR"],
    },
    description: {
      type: String,
    },
    permissions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model("Role", roleSchema);
