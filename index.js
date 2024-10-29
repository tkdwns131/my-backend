const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") // CORS 추가
const app = express()
require("dotenv").config()
app.use(cors()) // CORS 미들웨어 적용
// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)

app.use(express.json())

app.get("/", (req, res) => {
  res.send("백엔드 서버 동작 중")
})

// backend/index.js
const groupRoutes = require("./routes/group")
const matchRoutes = require("./routes/match")

app.use("/api/group", groupRoutes)
app.use("/api/match", matchRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`)
})
