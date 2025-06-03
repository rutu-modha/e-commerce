import "./App.css"
import { Link, Route, Routes } from "react-router"
import Register from "./Components/SignUp"
import Authorize from "./Components/Login"
import ProductForm from "./Components/ProductForm"
import ProductList from "./Components/ProductList"
import Cart from "./Components/Cart"
import Result from "./Components/Results"
import AlertWrapper from "./Components/AlertWrapper"
import Detail from "./Components/ProductInfo"
export default function App(){
    return (
        <div>
            <AlertWrapper />
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
                <Route path="/searchProducts" element={<Result/>}/>
                <Route path="/:id" element={<Detail/>}/>
            </Routes>
        </div>
    )
}