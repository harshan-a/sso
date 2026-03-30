import mongoose, { Schema, model } from "mongoose"
import fs from "fs"
import path from "path"
import { importPKCS8, SignJWT, importSPKI } from "jose"

const authorizationCodeSchema = new Schema(
  {
    code_challenge: {
      type: String,
      required: [true, "PKCE code challenge is missing:("],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 10,
    },
  },
  {
    methods: {
      generateAccessToken: async function () {
        const privateKeyPem = fs.readFileSync(
          path.resolve("./keys/private.pem"),
          "utf-8",
        )
        const publicKeyPem = fs.readFileSync(
          path.resolve("./keys/public.pem"),
          "utf-8",
        )
        const privateCryptoKey = await importPKCS8(privateKeyPem, "RS256")

        const token = await new SignJWT({ userId: this.userId.toString() })
          .setProtectedHeader({ alg: "RS256", kid: "key-1" })
          .sign(privateCryptoKey)

        // const { payload } = await jwtVerify(token, publicCryptoKey)

        // console.log(privateKeyPem)
        // console.log(token)
        // console.log(payload)
        // console.log(privateCryptoKey)
        return token
      },
    },
  },
)

export default model("AuthorizationCode", authorizationCodeSchema)
