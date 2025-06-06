import "./index.css"
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
                    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto font['Roboto'] text-black bg-white">
                        <App/>
                    </div>
                </AlertProvider>
            </SearchProvider>
        </React.StrictMode>
    </HashRouter>
)