import Alert from "./Alert"
import { useEffect, useState } from "react"
import { useAlert } from "../AlertContext"
export default function Cart() {
    const [cart, setCart] = useState([])
    const { showAlert } = useAlert()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (data === "" || data === null || data === undefined) {
                showAlert("Error", "No item added to cart. Add an item to cart to view changes")
            } else {
                setCart(data)
            }
        }).catch((err) => {
            console.log(err)
            showAlert("Error", "Failed to fetch cart items")
        })
    }, [])
    const removeItem = (item) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                cartItem: [{
                    image: item.image,
                    name: item.name,
                    price: item.price,
                    description: item.description
                }]
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            showAlert(data[0], data[1])
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="body">
            <h1>Cart Items</h1>
            {cart.length === 0 ? (
                <h2>Your cart is empty</h2>
            ) : (<>
                <h2>Here are the products you added to cart:</h2>
                <div className="clist">
                    {cart.map((item, index) => (
                        <div key={index} className="icard">
                            <img src={item.cartItem[0].image} className="cimg" />
                            <div className="pinfo">
                                <h3>{item.cartItem[0].name}</h3>
                                <p className="price">Price: {item.cartItem[0].price}</p>
                                <p className="description">Description: {item.cartItem[0].description}</p>
                            </div>
                            <div className="a2cBtn">
                                <button className="mt-2.5 mr-2.5 p-1 border border-black rounded-[20px] w-[260px]">Buy Now</button>
                                <button 
                                    className="mt-2.5 mr-2.5 p-1 border border-black rounded-[20px] w-[260px]" 
                                    onClick={() => {
                                        removeItem(item.cartItem[0])
                                    }}>
                                    Remove Item
                                    </button>
                            </div>
                        </div>
                    ))}
                </div>
            </>)}
            {alert.length > 0 && 
            <Alert 
                heading={alert[0]} 
                message={alert[1]} 
                onClose={() => {
                    showAlert("", "")
                }}
            />}
        </div>
    )
}