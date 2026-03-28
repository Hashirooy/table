const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  name: { type: String },
  status: { type: String },
  date: { type: Date },
  role: { type: String },
  department: { type: String },
});

module.exports = model("User", userSchema);
