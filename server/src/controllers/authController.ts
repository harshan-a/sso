import type { NextFunction, Request, Response } from "express"
import crypto from "crypto"
import {
  BadRequest,
  Unauthorized,
  NotFound,
  Forbidden,
} from "../errors/index.js"
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import AuthorizationCode from "../models/AuthorizationCode.js"

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password, code_challenge, redirect_url } = req.body

  if (!email || !password || !code_challenge)
    throw new BadRequest("Something missing:(")

  let user = await User.findOne({ email })
  if (!user) throw new NotFound("User not found")

  if (!(await user.comparePassword(password)))
    throw new Unauthorized("Incorrect Password:(")

  const authorizationCode = await AuthorizationCode.create({
    userId: user._id,
    code_challenge,
  })
  const redirectUrl = `${redirect_url}?authorization_code=${authorizationCode._id}`

  res.status(200).json({
    success: true,
    redirectUrl,
    msg: "User logged in successfully:)",
  })
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const {
    name,
    email,
    password,
    code_challenge,
    redirect_url,
  }: {
    name: string
    email: string
    password: string
    code_challenge: string
    redirect_url: string
  } = req.body

  if (!email || !password || !name || !code_challenge || !redirect_url)
    throw new BadRequest("Something missing:(")

  const user = await User.create(req.body)

  const authorizationCode = await AuthorizationCode.create({
    userId: user._id,
    code_challenge,
  })
  const redirectUrl = `${redirect_url}?authorization_code=${authorizationCode._id}`

  res.status(200).json({
    success: true,
    redirectUrl,
    msg: "User registered in successfully:)",
  })
}

export async function token(req: Request, res: Response, next: NextFunction) {
  const { code_verifier, authorization_code } = req.body

  if (!code_verifier || !authorization_code)
    throw new BadRequest("Something missing:(")

  const code = await AuthorizationCode.findOne({ _id: authorization_code })
  if (!code) throw new Forbidden("Authorization code does not exist.")

  const newChallenge = crypto
    .createHash("sha256")
    .update(code_verifier)
    .digest("base64Url" as any)

  if (newChallenge !== code.code_challenge)
    throw new Unauthorized("PKCE code challenge does not match.")

  code.generateAccessToken()

  res.status(200).send("success")
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body

  if (!email || !password) throw new BadRequest("Something missing:(")

  let user = await User.findOne({ email })
  if (!user) throw new NotFound("User not found")

  user.password = password
  await user.save()

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Password has been changed." })
}
