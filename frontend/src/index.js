import React  from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from "react-router"
const main = document.getElementById("root")
const root = ReactDOM.createRoot(main)
root.render(
    <HashRouter>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </HashRouter>
)