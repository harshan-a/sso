import express from "express"
import { checkEmailExists } from "../controllers/userController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/check", checkEmailExists)

export default router
