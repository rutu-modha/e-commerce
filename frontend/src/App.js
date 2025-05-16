import "./App.css"
import { Link, Route, Routes } from "react-router"
import Register from "./Components/SignUp"
export default function App(){
    return (
        <div>
            <div className="navbar">
                <Link to="/auth">
                    <button>Sign Up</button>
                </Link>
            </div>
            <Routes>
                <Route path="/auth" element={<Register/>}/>
            </Routes>
        </div>
    )
}