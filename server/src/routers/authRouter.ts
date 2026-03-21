import express from "express"
import {
  changePassword,
  login,
  signup,
  token,
} from "../controllers/authController.js"

const router = express.Router()

router.post("/login", login)
router.post("/signup", signup)
router.post("/change-password", changePassword)
router.post("/token", token)

export default router
