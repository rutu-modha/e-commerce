import { useState } from "react"
import Alert from "../CPopUps/Alert"
export default function ProductForm(){
    const [ name, setName] = useState("")
    const [ price, setPrice] = useState("")
    const [ description, setDescription] = useState("")
    const [ image, setImage] = useState(null)
    const [ alertState, setAlertState] = useState([])
    const formData = new FormData()
    formData.append("product", name)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("image", image)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setAlertState([data[0], data[1]])
        }).catch((err) => {
            setAlertState(["Error", "An error occured while adding the product. Please try again later."])
            console.log(err)
        })
    }

    return (
        <div className="body">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
                <br /><br />
                <input type="number" value={price} placeholder="Product Price" onChange={(e) => setPrice(e.target.value)} />
                <br /><br />
                <textarea value={description} placeholder="Product Description" onChange={(e) => setDescription(e.target.value)} />
                <br /><br />
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <br /><br />
                <button className="bodyBtn" type="submit">Add Product</button>
            </form>
            {alertState.length !== 0 && <Alert heading={alertState[0]} message={alertState[1]} />}
        </div>
    )
}