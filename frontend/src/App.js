import "./App.css"
import { Link, Route, Routes } from "react-router"
import Register from "./Components/SignUp"
import Authorize from "./Components/Login"
import ProductForm from "./Components/ProductForm"
import ProductList from "./Components/ProductList"
import Cart from "./Components/Cart"
import Token from "./Token"
export default function App(){
    let decode = Token()
    return (
        <div>
            <div className="navbar">
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/auth">
                    <button>Sign Up</button>
                </Link>
                <Link to="/verify">
                    <button>Log In</button>
                </Link>
                <Link to="/products">
                    <button>Add Product</button>
                </Link>
                <Link to="/cart">
                    <button>Cart</button>
                </Link>
            </div>
            <Routes>
                <Route path="/auth" element={<Register/>}/>
                <Route path="/verify" element={<Authorize/>}/>
                <Route path="/products" element={<ProductForm/>}/>
                <Route path="/" element={<ProductList/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </div>
    )
}