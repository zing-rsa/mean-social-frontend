import { useContext, createContext, useState } from "react"
import { Error } from "../components";

let ErrorContext = createContext(null);

function ErrorProvider({children}) {

    const [error, setError] = useState(null);

    return (
        <ErrorContext.Provider value={{error, setError}}>
            <Error />
            {children}
        </ErrorContext.Provider>
    )
}

const useError = () => {
    return useContext(ErrorContext)
}

export { ErrorProvider, useError }