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

// backend/routes/match.js
const express = require("express")
const router = express.Router()
const User = require("../models/User")

// /matchUser 경로의 POST 요청 핸들러
router.post("/", async (req, res) => {
  const { selectedName } = req.body

  try {
    // 매칭되지 않은 사용자 목록 가져오기
    const allUsers = await User.find({ matched: false })

    // 선택된 사용자 찾기
    const selectedUser = allUsers.find((user) => user.name === selectedName)

    // 선택된 사용자가 없는 경우
    if (!selectedUser) {
      return res
        .status(404)
        .json({
          message: "선택한 사용자가 존재하지 않거나 이미 매칭되었습니다.",
        })
    }

    // 다른 사용자를 무작위로 선택
    const otherUsers = allUsers.filter(
      (user) => user._id.toString() !== selectedUser._id.toString()
    )
    if (otherUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "매칭 가능한 다른 사용자가 없습니다." })
    }

    const randomIndex = Math.floor(Math.random() * otherUsers.length)
    const matchedUser = otherUsers[randomIndex]

    // 매칭된 사용자 상태 업데이트
    selectedUser.matched = true
    matchedUser.matched = true
    await selectedUser.save()
    await matchedUser.save()

    res
      .status(200)
      .json({ message: "매칭 성공", matchedUser: matchedUser.name })
  } catch (error) {
    console.error("매칭 오류:", error)
    res.status(500).json({ message: "매칭 중 오류가 발생했습니다.", error })
  }
})

module.exports = router
