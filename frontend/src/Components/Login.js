import { useState } from "react"
import Alert from "../CPopUps/Alert"
export default function Authorize(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alertState, setAlertState] = useState([])
    const token = localStorage.getItem("token")
    const verify = async () => {
        if (email === "" || password === "")
            setAlertState(["Error", "Please fill up the details properly"])
        else if (!email.includes("@") || !email.includes(".com"))
            setAlertState(["Error", "Please enter a valid email"])
        else if (password.length < 8)
            setAlertState(["Error", "Please enter a strong password"])
        else {
            await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((res) => {
                return res.json()
            }).then((data) => {
                setAlertState([data[0], data[1]])
            }).catch((err) => {
                setAlertState(["Error", "An error occured while logging you in. Please try again later."])
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
            {alertState.length !== 0 && <Alert heading={alertState[0]} message={alertState[1]} />}
        </div>
    )
}