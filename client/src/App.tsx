import Form from "./pages/Form"
import Header from "./components/Header"
import { LoadingProvider } from "./context/Loading"
import { ClientDataProvider } from "./context/ClientData"

function App() {
  return (
    <>
      <LoadingProvider>
        <ClientDataProvider>
          <Header />
          <Form />
        </ClientDataProvider>
      </LoadingProvider>
    </>
  )
}

export default App
