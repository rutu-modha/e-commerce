import React  from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from "react-router"
import { SearchProvider } from "./SearchContext"
import { AlertProvider } from "./AlertContext"
const main = document.getElementById("root")
const root = ReactDOM.createRoot(main)
root.render(
    <HashRouter>
        <React.StrictMode>
            <SearchProvider>
                <AlertProvider>
                    <App/>
                </AlertProvider>
            </SearchProvider>
        </React.StrictMode>
    </HashRouter>
)