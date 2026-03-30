import { Schema, model } from "mongoose"

const otpSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10,
  },
})

export default model("OTP", otpSchema)
