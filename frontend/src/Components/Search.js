import Alert from "./Alert"
import { useAlert } from "../AlertContext"
import { SearchContext } from "../SearchContext"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
export default function Search() {
    const [input, setInput] = useState("")
    const { setRes } = useContext(SearchContext)
    const navigate = useNavigate()
    const { showAlert } = useAlert()
    const handleSearch = () => {
        navigate("/searchProducts")
        if (input === "" || input === null) {
            showAlert(["Error", "Cannot search for an empty input"])
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/searchProducts`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    search: input
                })
            }).then((res) => {
                return res.json()
            }).then((data) => {
                if (data === "" || data === null || data === undefined) {
                    showAlert("Error", "No products found")
                } else {
                    setRes(data)
                    setInput("")
                }
            })
        }
    }
    return (
        <div className="search">
            <input type="search" placeholder="Search for products..."  onChange={(e) => { setInput(e.target.value) }} />
            <button className="bodyBtn" onClick={handleSearch}>Search</button>
            {alert.length > 0 && <Alert heading={alert[0]} message={alert[1]}  onClose={() => showAlert("", "")}/>}
        </div>
    )
}
