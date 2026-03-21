import { createContext, useContext, type ReactNode } from "react"

type ClientDataType = {
  redirectUrl: string
  codeChallenge: string
}

const ClientDataContext = createContext<ClientDataType>({
  redirectUrl: "",
  codeChallenge: "",
})

export const ClientDataProvider = ({ children }: { children: ReactNode }) => {
  const params = new URLSearchParams(window.location.search)
  const redirectUrl = params.get("redirect_url")
  const codeChallenge = params.get("pkce_code_challenge")
  // console.log(redirectUrl, pkceCodeChallenger)

  if (!redirectUrl || !codeChallenge) {
    return <span className="text-white">Unexpected Error...</span>
  }

  return (
    <ClientDataContext.Provider value={{ redirectUrl, codeChallenge }}>
      {children}
    </ClientDataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useClientData = () => useContext(ClientDataContext)
