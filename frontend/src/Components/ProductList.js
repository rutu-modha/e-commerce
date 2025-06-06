import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Alert from "./Alert"
import Search from "./Search"
import { useAlert } from "../AlertContext"
export default function ProductList() {
    const [products, setProducts] = useState([])
    const { showAlert } = useAlert()
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setProducts(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const addToCart = (product) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                cartItem: [{
                    image: product.image, 
                    name: product.name, 
                    price: product.price, 
                    description: product.description
                }] 
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            showAlert(data[0], data[1])
        }).catch((err) => {
            showAlert("Error", "Failed to add item to cart")
            console.log(err)
        })
    }
    return (
        <div className="mt-2.5">
            <Search />
            <h1 className="m-2.5">Products Listings</h1>
            <h2>Here is the product listing from our side, which you might find interesting:</h2>
            <div className="plist">
                {products.map((product, index) => (
                    <div className="pcard" key={index}>
                        <img src={product.image} className="pimg"  onClick={() => { navigate(`/${product._id}`) }}/>
                        <h3>{product.name}</h3>
                        <p>Price: ₹{product.price}</p>
                        <button 
                            className="p-1 w-[150px] rounded-[7px] bg-black text-white" 
                            onClick={ () => {
                                addToCart(product)
                            }}>
                            Add to Cart
                        </button>
                        <button className="p-1 w-[150px] rounded-[7px] bg-black text-white">Buy Now</button>
                    </div>
                ))}
            </div>
            {alert.length > 0 && 
                <Alert 
                    heading = { alert[0] } 
                    message = { alert[1] }  
                    onClose={() => {
                        showAlert("", "")
                    }}/>}
        </div>
    )
}
