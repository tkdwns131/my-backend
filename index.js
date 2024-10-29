// backend/index.js
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()

dotenv.config()

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err))

app.use(express.json())

// backend/index.js
const groupRoutes = require("./routes/group")
const matchRoutes = require("./routes/match")

app.use("/api/group", groupRoutes)
app.use("/api/match", matchRoutes)

// 서버 실행
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
