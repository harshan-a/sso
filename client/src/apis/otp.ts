import axios from "axios"
import type { AxiosResponse } from "axios"

export function sendOTP({ email }: { email: string }): Promise<AxiosResponse> {
  return axios.post("api/v1/otp/send", { email })
}

export function verifyOTP({
  email,
  otp,
}: {
  email: string
  otp: string
}): Promise<AxiosResponse> {
  return axios.post("api/v1/otp/verify", { email, otp })
}
