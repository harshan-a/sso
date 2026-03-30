import type { AxiosResponse } from "axios"
import axios from "axios"

type LoginData = {
  name: string
  email: string
  password: string
  redirect_url: string
  code_challenge: string
}

export async function login(
  data: Omit<LoginData, "name">,
): Promise<AxiosResponse> {
  return axios.post("api/v1/auth/login", data)
}

export function signup(data: LoginData): Promise<AxiosResponse> {
  return axios.post("api/v1/auth/signup", data)
}

export function changePassword(data: {
  email: string
  password: string
  otpId: string
}): Promise<{ data: { success: boolean; msg: string } }> {
  return axios.post("api/v1/auth/change-password", data)
}
