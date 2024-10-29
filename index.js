const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.log(err))

app.use(express.json())

app.get("/", (req, res) => {
  res.send("백엔드 서버 동작 중")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`)
})
