import { useState } from "react"
import Alert from "./Alert"
import { useAlert } from "../AlertContext"
export default function ProductForm(){
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const { showAlert } = useAlert()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("image", image)
    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            showAlert(data[0], data[1])
        }).catch((err) => {
            showAlert("Error", "An error occured while adding the product. Please try again later.")
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
            {alert.length !== 0 && <Alert heading={alert[0]} message={alert[1]}  onClose={() => showAlert("", "")}/>}
        </div>
    )
}