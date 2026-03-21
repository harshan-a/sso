import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react"
import PasswordBar from "../components/PasswordBar"
import { useClientData } from "../context/ClientData"
import { signup } from "../apis/auth"
import { useLoading } from "../context/Loading"
import { AxiosError } from "axios"

type SignupProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function Signup({ setIsLogin }: SignupProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const { redirectUrl, codeChallenge } = useClientData()
  const { setIsLoading } = useLoading()

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await signup({
        name,
        email,
        password,
        redirect_url: redirectUrl,
        code_challenge: codeChallenge,
      })

      console.log(data)
      setErrorMessage("")
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.data) setErrorMessage(err.response?.data.msg)
        console.log(err.response?.data)
      } else setErrorMessage("Something error:(")
    }
    setIsLoading(false)
  }

  return (
    <>
      <h2 className="text-center mb-5">Signup</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="input-bar"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-bar"
          />
        </div>
        <PasswordBar password={password} setPassword={setPassword} />
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-bar"
          />
        </div>
        <button type="submit" className="submit-btn">
          Signup
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="text-center mt-4 ">
        Already have an account?{" "}
        <span
          className="underline cursor-pointer text-cyan-400"
          onClick={() => setIsLogin(true)}>
          Login
        </span>
      </p>
    </>
  )
}
