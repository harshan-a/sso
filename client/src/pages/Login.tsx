import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react"
import EmailValidation from "../components/EmailValidation"
import PasswordBar from "../components/PasswordBar"
import { login } from "../apis/auth"
import { AxiosError } from "axios"
import { useClientData } from "../context/ClientData"
import { useLoading } from "../context/Loading"

type LoginProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>
  setForgotPassword: Dispatch<SetStateAction<boolean>>
}

export default function Login({ setIsLogin, setForgotPassword }: LoginProps) {
  const [email, setEmail] = useState({ valid: false, mail: "" })
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const { redirectUrl, codeChallenge } = useClientData()
  const { setIsLoading } = useLoading()

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await login({
        email: email.mail,
        password: password,
        redirect_url: redirectUrl,
        code_challenge: codeChallenge,
      })

      console.log(data)
      setErrorMessage("")
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.data) setErrorMessage(err.response?.data.msg)
      } else setErrorMessage("Something error:(")
      console.log(err)
    }
    setIsLoading(false)
  }
  // const name = () => email.mail

  return (
    <>
      <h2 className="text-center mb-5">Login</h2>

      <form onSubmit={handleSubmit}>
        <EmailValidation input={email} setInput={setEmail} />
        <PasswordBar password={password} setPassword={setPassword} />
        <button
          type="submit"
          className={`submit-btn ${email.valid ? "" : "pointer-events-none opacity-50"}`}>
          Login
        </button>

        <p
          className="form-secondary-action"
          onClick={() => setForgotPassword(true)}>
          Forgot password?
        </p>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <span
          className="underline cursor-pointer text-cyan-400"
          onClick={() => setIsLogin(false)}>
          Signup
        </span>
      </p>
    </>
  )
}
