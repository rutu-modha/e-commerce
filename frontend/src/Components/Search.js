import Alert from "../CPopUps/Alert"
import { SearchContext } from "../SearchContext"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
export default function Search() {
    const [input, setInput] = useState("")
    const [alert, setAlert] = useState([])
    const { setRes } = useContext(SearchContext)
    const navigate = useNavigate()
    const handleSearch = () => {
        navigate("/searchProducts")
        if (input === "" || input === null) {
            setAlert(["Error", "Cannot search for an empty input"])
        } else {
            fetch("http://localhost:5000/searchProducts", {
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
                    Alert(["Error", "No products found"])
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
            {alert.length > 0 && <Alert heading={alert[0]} message={alert[1]} />}
        </div>
    )
}