// // backend/routes/group.js
// const express = require("express")
// const router = express.Router()
// const Group = require("../models/Group")

// // 그룹 생성 라우트
// router.post("/", async (req, res) => {
//   const { groupName } = req.body
//   const group = new Group({ groupName })
//   await group.save()
//   res.status(201).json(group)
// })

// module.exports = router
