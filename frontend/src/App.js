import "./App.css"
import { Link, Route, Routes } from "react-router"
import Register from "./Components/SignUp"
import Authorize from "./Components/Login"
import ProductForm from "./Components/ProductForm"
import { jwtDecode } from "jwt-decode"
export default function App(){
    const token = localStorage.getItem("token")
    let decode = {}
    try {
        decode = jwtDecode(token)
    } catch (error) {
        console.error("Failed to decode token:", error)
    }
    return (
        <div>
            <div className="navbar">
                <Link to="/auth">
                    <button>Sign Up</button>
                </Link>
                <Link to="/verify">
                    <button>Log In</button>
                </Link>
                <Link to="/products">
                    {decode.role === "Retailer" ? <button>Add Product</button> : null}
                </Link>
            </div>
            <Routes>
                <Route path="/auth" element={<Register/>}/>
                <Route path="/verify" element={<Authorize/>}/>
                <Route path="/products" element={<ProductForm/>}/>
            </Routes>
        </div>
    )
}