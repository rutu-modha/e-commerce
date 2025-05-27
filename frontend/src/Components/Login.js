import { useState } from "react"
import Alert from "./Alert"
import { useAlert } from "../AlertContext"
export default function Authorize(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { showAlert } = useAlert()
    const verify = () => {
        if (email === "" || password === "")
            showAlert("Error", "Please fill up the details properly")
        else if (!email.includes("@") || !email.includes(".com"))
            showAlert("Error", "Please enter a valid email")
        else if (password.length < 8)
            showAlert("Error", "Please enter a strong password")
        else {
            fetch("http://localhost:5000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((res) => {
                return res.json()
            }).then((data) => {
                showAlert("Success", "You have logged in successfully")
            }).catch((err) => {
                showAlert("Error", "An error occured while logging you in. Please try again later.")
                console.log(err)
            })
        }
    }
    return (
        <div className="body">
            <h1>Log In</h1>
            <input type="email" value={email} placeholder="Enter your e-mail" onChange={(e) => setEmail(e.target.value)} />
            <br /><br />
            <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <br /><br />
            <button className="bodyBtn" onClick={verify}>Log In</button>
            {alert.length !== 0 ? <Alert heading={alert[0]} message={alert[1]}  onClose={() => showAlert("", "")}/> : null}
        </div>
    )
}