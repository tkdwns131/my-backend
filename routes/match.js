// // backend/routes/match.js
// const express = require("express")
// const router = express.Router()
// const User = require("../models/User")
// const Group = require("../models/Group")

// router.post("/", async (req, res) => {
//   const { groupId } = req.body
//   const group = await Group.findById(groupId).populate("users")
//   if (!group) return res.status(404).json({ message: "Group not found" })

//   const shuffledUsers = group.users.sort(() => Math.random() - 0.5)
//   shuffledUsers.forEach((user, index) => {
//     user.manittoId = shuffledUsers[(index + 1) % shuffledUsers.length]._id
//     user.save()
//   })

//   res.status(200).json({ message: "Matching completed" })
// })

// module.exports = router
