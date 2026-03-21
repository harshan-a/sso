import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import swaggerUI from "swagger-ui-express"
import YamlJs from "yamljs"

// routes
import { userRouter, authRouter, otpRouter } from "./routers/index.js"

import notFound from "./middlewares/notFound.js"
import errorHandling from "./middlewares/errorHandling.js"

const app = express()

// console.log(process.env.CLIENT_BASE_URLS?.split(","))
app.use(cors())

app.use(express.json({ limit: "10kb" })) // body parser (data limited to 10kb)
// app.use(express.urlencoded({ limit: "10kb" })) // form data parser (data limited to 10kb)
app.use(cookieParser())

app.use(morgan("dev"))

// routes
app.use("/api/v1/users", userRouter) // 2 end points
app.use("/api/v1/auth", authRouter) // 3 end points
app.use("/api/v1/otp", otpRouter) // 2 end points

const docs = YamlJs.load("./swagger.yaml")
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs))

// not found and errorhandling middlerware
app.use(notFound)
app.use(errorHandling)

export default app
