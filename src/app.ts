import express from "express"
import cors from "cors"

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000", // Next.js frontend
    credentials: true,
  })
)

app.use(express.json())

// Routes
app.get("/", (req, res) => {
  res.send("API is running...")
})

export default app
