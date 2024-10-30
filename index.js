const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") // CORS 추가
const User = require("./models/User")
const app = express()
require("dotenv").config()

app.use(cors({ origin: "*" }))

app.use(express.json())
// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 오류:", err))

// 사용자 스키마 및 모델 정의
const userSchema = new mongoose.Schema({
  name: String,
  matched: { type: Boolean, default: false },
})

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}, Method: ${req.method}`)
  next()
})

// 사용자 추가 API
app.post("/addUser", async (req, res) => {
  const { name } = req.body
  const user = new User({ name })
  await user.save()
  res.status(201).send(user)
})

// 이름 매칭 API
app.post("/matchUser", async (req, res) => {
  const { selectedName } = req.body

  try {
    // 매칭되지 않은 사용자 목록 가져오기
    const allUsers = await User.find({ matched: false })

    // 선택된 사용자 찾기
    const selectedUser = allUsers.find((user) => user.name === selectedName)

    if (!selectedUser) {
      return res.status(404).json({
        message: "선택한 사용자가 존재하지 않거나 이미 매칭되었습니다.",
      })
    }

    // 선택된 사용자 제외한 나머지 사용자 중 매칭 가능한 사용자 선택
    const otherUsers = allUsers.filter(
      (user) => user._id.toString() !== selectedUser._id.toString()
    )
    if (otherUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "매칭 가능한 다른 사용자가 없습니다." })
    }

    // 무작위로 다른 사용자 선택
    const randomIndex = Math.floor(Math.random() * otherUsers.length)
    const matchedUser = otherUsers[randomIndex]

    // 매칭 상태 및 상대방 ID 업데이트
    selectedUser.matched = true
    selectedUser.matchedUserId = matchedUser._id
    matchedUser.matched = true
    matchedUser.matchedUserId = selectedUser._id

    await selectedUser.save()
    await matchedUser.save()

    res.status(200).json({
      message: "매칭 성공",
      selectedUser: selectedUser.name,
      matchedUser: matchedUser.name,
    })
  } catch (error) {
    console.error("매칭 오류:", error)
    res.status(500).json({ message: "매칭 중 오류가 발생했습니다.", error })
  }
})

// 서버 시작
const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`)
})
