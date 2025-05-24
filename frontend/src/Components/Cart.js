import { useEffect, useState } from "react"
export default function Cart() {
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/cart", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (data === "" || data === null || data === undefined){
                setCart(["Error", "No item added to cart\nAdd an item to cart to view changes"])
            } else{
                setCart(data)
                console.log(data)
            }
        })
    }, [])
    return (
        <div className="body">
            <h1>Cart Items</h1>
            <h2>Here is the product you added to cart:</h2>
            <div className="clist">
                {cart.cartItem.map((item, index) => (
                    <div key={index} className="icard">
                        <img src={item.image} className="cimg" />
                        <div className="pinfo">
                            <h3>{item.name}</h3>
                            <p className="price">Price: {item.price}</p>
                            <p className="description">Description: {item.description}</p>
                        </div>
                        <div className="a2cBtn">
                            <button className="bodyBtn">Buy Now</button>
                            <button className="bodyBtn">Remove Item</button>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    )
}
