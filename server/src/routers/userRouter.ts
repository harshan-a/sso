import express from "express"
import { checkEmailExists } from "../controllers/userController.js"

const router = express.Router()

router.get("/check", checkEmailExists)

export default router
