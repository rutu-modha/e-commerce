import { SearchContext } from "../SearchContext"
import { useState, useContext } from "react"
import Alert from "../CPopUps/Alert"
export default function Result() {
    const [alert, setAlert] = useState([])
    const { res } = useContext(SearchContext)
        const addToCart = (product) => {
        fetch("http://localhost:5000/cart", {
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
            setAlert([data[0], data[1]])
        }).catch((err) => {
            setAlert(["Error", "Failed to add item to cart"])
            console.log(err)
        })
    }
    return (
        <div className="clist">
            {res.length > 0 &&
                res.map((product, index) => (
                    <div className="icard" key={index}>
                        <img src={product.image} className="cimg" alt={product.name} />
                        <div className="pinfo">
                            <h3>{product.name}</h3>
                            <p className="price">Price: ₹{product.price}</p>
                            <p className="description">{product.description}</p>
                        </div>
                        <div className="a2cBtn">
                            <button className="bodyBtn" onClick={() => { addToCart(product) }}>Add to Cart</button>
                            <button className="bodyBtn">Buy Now</button>
                        </div>
                    </div>
                ))}
                {alert.length > 0 && <Alert heading={alert[0]} message={alert[1]}/>}
        </div>
    )
}