import { useParams } from "react-router"
import { useEffect, useState } from "react"
export default function Detail(){
    const { id } = useParams()
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "Application/json"
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setProduct(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <div className="body">
            <div>
                <h1>{product.name}</h1>
                <img src={product.image} className="productImg"/>
                <div className="productInfo">
                    <p><b>Price:</b> ₹{product.price}</p>
                    <p><b>Description:</b> {product.description}</p>
                </div>
                <br/><br/>
                <button className="bodyBtn">Add to Cart</button>
                <button className="bodyBtn">Buy Now</button>
                <br/><br/>
            </div>
            <div>
                <br/><br/>
                <h1>Reviews</h1>
                <textarea placeholder="Write your comment/s about the product here..."></textarea>
                <br/><br/>
                <button className="bodyBtn">Comment</button>
                <h2>See the reviews from our other customers who bought the same product</h2>
                {/*Reviews will be fetched and displayed here from the database soon*/}
            </div>
        </div>
    )
}