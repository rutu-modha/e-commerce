import { createContext, useState } from "react"
const SearchContext = createContext()
function SearchProvider({ children}){
    const [res, setRes] = useState([])
    return (
        <SearchContext.Provider value={{ res, setRes }}>
            {children}
        </SearchContext.Provider>
    )
}
export { SearchContext, SearchProvider }