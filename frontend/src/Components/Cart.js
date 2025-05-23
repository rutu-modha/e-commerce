import { useEffect, useState } from "react"
import Token from "../Token"
export default function Cart() {
    const [cart, setCart] = useState([])
    const token = localStorage.getItem("token")
    const decoded = Token()
    useEffect(() => {
        fetch("http://localhost:5000/cart", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setCart(data)
        })
    }, [])
    return (
        <div className="body">
            <h1>Hi, {decoded.name}!</h1>
            <h2>Here is the product you added to cart:</h2>
            <div className="clist">
            {cart.map((item, index) => (
                <div key={index} className="icard">
                    <img src={item.cartItem[0]} className="cimg"/>
                    <div className="pinfo">
                        <h3>{item.cartItem[1]}</h3>
                        <p className="price">Price: ₹{item.cartItem[2]}</p>
                        <p className="description">{item.cartItem[3]}</p>
                    </div>
                    <div className="a2cBtn">
                        <button className="bodyBtn">Buy Now</button>
                        <button className="bodyBtn ">Remove Item</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}