import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"
import LoadingGif from "../assets/icons/loading.gif"

type LoadingType = { setIsLoading: Dispatch<SetStateAction<boolean>> }

const LoadingContext = createContext<LoadingType>({
  setIsLoading: () => {},
})

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-[3px] cursor-wait">
          <img src={LoadingGif} alt="Loading..." className="w-12 h-12" />
        </div>
      )}
      <LoadingContext.Provider value={{ setIsLoading }}>
        {children}
      </LoadingContext.Provider>
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoading() {
  return useContext(LoadingContext)
}
