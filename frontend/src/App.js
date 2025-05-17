import "./App.css"
import { Link, Route, Routes } from "react-router"
import Register from "./Components/SignUp"
import Authorize from "./Components/Login"
export default function App(){
    return (
        <div>
            <div className="navbar">
                <Link to="/auth">
                    <button>Sign Up</button>
                </Link>
                <Link to="/verify">
                    <button>Log In</button>
                </Link>
            </div>
            <Routes>
                <Route path="/auth" element={<Register/>}/>
                <Route path="/verify" element={<Authorize/>}/>
            </Routes>
        </div>
    )
}