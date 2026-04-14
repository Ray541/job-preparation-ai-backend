import "dotenv/config"
import mongoose from "mongoose"

const mongoURI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    if (!mongoURI) {
      console.error(
        "❌ Error: MONGO_URI is not defined in environment variables"
      )
      process.exit(1)
    }

    const conn = await mongoose.connect(mongoURI)

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Error: ${error.message}`)
    } else {
      console.error(`❌ Unknown Error: ${error}`)
    }
    process.exit(1)
  }
}

export default connectDB
