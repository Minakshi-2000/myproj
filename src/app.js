import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";

dotenv.config();

const app = express()

app.use(express.json()) //for handling json date
app.use(express.urlencoded()) //http://localhost:3000/username=iamrahul18password=1234
app.use(express.static("public/temp"))
app.use(cors({ origin: process.env.CORS_ORIGIN })) 
app.use(cookieParser())


import employeerRouter from "./routes/employeer.router.js"
import jobSeekerRouter from "./routes/jobSeeker.routes.js"
import jobRouter from "./routes/job.router.js"
import applicantRouter from "./routes/applicants.router.js"

app.use("/api/v1/employer",employeerRouter) //http://localhost:3000/api/v1/employer/login
app.use("/api/v1/jobSeeker",jobSeekerRouter)
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/applicants", applicantRouter)

export default app