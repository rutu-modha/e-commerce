import { useState } from "react"
import Alert from "./Alert"
import { useAlert } from "../AlertContext"
export default function ProductForm() {
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
            <input
                type="text"
                value={name}
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
                className="mt-2.5 mr-2.5 p-1 border border-black rounded-[20px] w-[260px]" />
            <br /><br />
            <input
                type="number"
                value={price}
                placeholder="Product Price"
                onChange={(e) => {
                    setPrice(e.target.value)
                }} 
                className="mt-2.5 mr-2.5 p-1 border border-black rounded-[20px] w-[260px]" />
            <br /><br />
            <textarea
                value={description}
                placeholder="Product Description"
                onChange={(e) => {
                    setDescription(e.target.value)
                }} 
                className="mt-2.5 mr-2.5 p-1 border border-black rounded-[20px] w-[260px] h-[130px]" />
            <br /><br />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => { setImage(e.target.files[0]) }}
                className="mt-2.5 mr-2.5 p-1 border border-black rounded-[20px] w-[260px]" />
            <br /><br />
            <button 
                className="p-1 w-[150px] rounded-[7px] bg-black text-white" 
                onClick={handleSubmit}>
                Add Product
            </button>
            {alert.length !== 0 && 
            <Alert 
                heading={alert[0]} 
                message={alert[1]} 
                onClose={() => showAlert("", "")} 
            />}
        </div>
    )
}