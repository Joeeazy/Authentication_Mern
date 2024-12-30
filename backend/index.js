import express from "express"
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"

//configs
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

//routes
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log("server is running on port: ", PORT)
})


// 