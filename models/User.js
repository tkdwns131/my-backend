// backend/models/User.js
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  manittoId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model("User", userSchema)
