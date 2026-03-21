import bcrypt from "bcryptjs"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
      maxLength: [20, "Maximum 20 characters is allowed."],
      minLength: [3, "Minimum 3 characters is required."],
    },
    email: {
      require: [true, "Email is required"],
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    methods: {
      comparePassword(password: string) {
        return bcrypt.compare(password, this.password)
      },
    },
  },
)

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
})

export default mongoose.model("User", userSchema)
