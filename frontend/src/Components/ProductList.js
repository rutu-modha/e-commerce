import Token from "../Token"
import { useEffect, useState } from "react"
import Alert from "../CPopUps/Alert"
export default function ProductList() {
    const [products, setProducts] = useState([])
    const [alert, setAlert] = useState([])
    const decoded = Token()
    const token = localStorage.getItem("token")
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
    const addtoCart = (product) => {
        fetch("http://localhost:5000/cart", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: decoded.name,
                cartItem: [product.image, product.name, product.price, product.description] 
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setAlert([data[0], data[1]])
        })
    }
    return (
        <div className="body">
            <h1>Hi, {decoded.name}!</h1>
            <h2>Here is the product listing from our side, which you might find interesting:</h2>
            <div className="plist">
                {products.map((product) => (
                    <div className="pcard">
                        <img src={product.image} className="pimg"/>
                        <h3>{product.name}</h3>
                        <p>Price: ₹{product.price}</p>
                        <button className="bodyBtn" onClick={() => addtoCart (product)}>Add to Cart</button>
                        <button className="bodyBtn">Buy Now</button>
                    </div>
                ))}
                {alert.length > 0 && <Alert heading={alert[0]} message={alert[1]} />}
            </div>
        </div>
    )
}