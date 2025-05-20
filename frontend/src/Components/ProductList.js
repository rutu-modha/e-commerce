import Token from "../Token"
import { useEffect, useState } from "react"
export default function ProductList() {
    const [products, setProducts] = useState([])
    const token = Token()
    useEffect(() => {
        fetch("http://localhost:5000/products", {
            method: "GET",
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
    return (
        <div className="body">
            <h1>Hi, {token.name}!</h1>
            <h2>Here is the product listing from our side, which you might find interesting:</h2>
            <div className="plist">
                {products.map((product) => (
                    <div className="pcard">
                        <img src={product.image} className="pimg"/>
                        <h3>{product.name}</h3>
                        <p>Price: ₹{product.price}</p>
                        <button className="bodyBtn">Add to Cart</button>
                        <button className="bodyBtn">Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    )
}