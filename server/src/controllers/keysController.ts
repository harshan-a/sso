import type { Request, Response, NextFunction } from "express"
import { exportJWK, importSPKI } from "jose"
import fs from "fs"
import path from "path"

export default async function sendJwks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const publicKeyPem = fs.readFileSync(
    path.resolve("./keys/public.pem"),
    "utf-8",
  )
  const publicKey = await importSPKI(publicKeyPem, "RS256")
  // console.log(publicKey)
  const jwks = await exportJWK(publicKey)
  jwks.kid = "key-1"
  jwks.alg = "RS256"

  res.status(200).json({ keys: [jwks] })
}
