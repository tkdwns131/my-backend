const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") // CORS 추가
const app = express()
require("dotenv").config()
app.use(cors()) // CORS 미들웨어 적용

app.use(express.json())
// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)

// 사용자 스키마 및 모델 정의
const userSchema = new mongoose.Schema({
  name: String,
  matched: { type: Boolean, default: false },
})

const User = mongoose.model("User", userSchema)

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

  const allUsers = await User.find({ matched: false })
  const selectedUser = allUsers.find((user) => user.name === selectedName)

  if (selectedUser) {
    const otherUsers = allUsers.filter((user) => user.name !== selectedName)
    if (otherUsers.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherUsers.length)
      const matchedUser = otherUsers[randomIndex]

      // 매칭 완료 처리
      selectedUser.matched = true
      matchedUser.matched = true

      await selectedUser.save()
      await matchedUser.save()

      res.send({ matched: matchedUser.name })
    } else {
      res.status(404).send("No other users available to match.")
    }
  } else {
    res.status(404).send("Selected user not found or already matched.")
  }
})

// 서버 시작
const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
