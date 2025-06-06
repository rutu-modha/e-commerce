import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Alert from "./Alert"
import { useAlert } from "../AlertContext"
export default function Detail(){
    const { id } = useParams()
    const { showAlert } = useAlert()
    const [product, setProduct] = useState({})
    const [review, setReview] = useState("")
    const [comments, setComments] = useState([])
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
    }, [id])
    const addToCart = async () => {
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
    const postReview = (name) => {
        if (review.length === 0){
            showAlert("Error", "Cannot post the empty comments")
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    regard: name,
                    comment: review
                })
            }).then((res) => {
                return res.json()
            }).then((data) => {
                showAlert(data[0], data[1])
            }).catch((error) => {
                console.log(error)
            })   
        }
    }
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews?name=${encodeURIComponent(product.name)}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setComments(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [product])
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
                <button 
                    className="p-1 w-[150px] rounded-[7px] bg-black text-white" 
                    onClick={async() => {
                        await addToCart(product)
                    }}>
                    Add to Cart
                </button>
                <button className="p-1 w-[150px] rounded-[7px] bg-black text-white">Buy Now</button>
                <br/><br/>
            </div>
            <div>
                <br/><br/>
                <h1>Reviews</h1>
                <textarea placeholder="Write your comment/s about the product here..." onChange={(e) => setReview(e.target.value)}></textarea>
                <br/><br/>
                <button 
                    className="p-1 w-[150px] rounded-[7px] bg-black text-white" 
                    onClick={() => {
                        postReview(product.name)
                    }}>
                    Comment
                </button>
                <h2>See the reviews from our other customers who bought the same product</h2>
                {comments.map((review, index) => (
                    <div key={index} className="comments">
                        <h3>{review.name}</h3>
                        <br/>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
            {alert.length > 0 && 
            <Alert 
                heading = { alert[0] } 
                message = { alert[1] } 
                onClose = { () => {
                    showAlert("", "")
                }}/>}
        </div>
    )
}