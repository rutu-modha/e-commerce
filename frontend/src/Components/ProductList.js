import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
export default function ProductList() {
    const [products, setProducts] = useState([])
    const token = localStorage.getItem("token")
    let user
    try {
        const decode = jwtDecode(token)
        user = decode.name || "User"
    } catch (error) {
        console.log(error)
    }
    useEffect(async () => {
        await fetch("http://localhost:5000/products", {
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
            <h1>Hi, {user}!</h1>
            <h2>Here is the product listing from our side, which you might find interesting:</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div className="product-card">
                        <img src={product.image} height={200} width={200} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}