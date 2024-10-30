// // backend/models/User.js
// const mongoose = require("mongoose")

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
//   manittoId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// })

// module.exports = mongoose.model("User", userSchema)

// backend/models/User.js
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matched: { type: Boolean, default: false }, // 사용자가 매칭되었는지 여부
  matchedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }, // 매칭된 사용자 ID
})

module.exports = mongoose.model("User", userSchema)
