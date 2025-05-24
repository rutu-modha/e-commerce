import { useState } from "react"
import Alert from "../CPopUps/Alert"
export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [alertState, setAlertState] = useState([])
    const verify = () => {
        if (name === "" || email === "" || password === "" || role === "")
            setAlertState(["Error", "Please fill up the details properly"])
        else if (!email.includes("@") || !email.includes(".com"))
            setAlertState(["Error", "Please enter a valid email"])
        else if (password.length < 8)
            setAlertState(["Error", "Please enter a strong password"])
        else {
            fetch("http://localhost:5000/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    role: role,
                    password: password
                })
            }).then((res) => {
                return res.json()
            }).then((data) => {
                setAlertState([data[0], data[1]])
                setName("")
                setEmail("")
                setPassword("")
                setRole("")
            }).catch((err) => {
                setAlertState(["Error", "An error occured while signing you up. Please try again later."])
                console.log(err)
            })
        }
    }
    return (
        <div className="body">
            <h1>Sign Up</h1>
            <input type="text" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            <br /><br />
            <input type="email" value={email} placeholder="Enter your e-mail" onChange={(e) => setEmail(e.target.value)} />
            <br /><br />
            <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <br /><br />
            <p>Select as whom shall we register you:</p>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option></option>
                <option>Consumer</option>
                <option>Retailer</option>
            </select>
            <br /><br />
            <button className="bodyBtn" onClick={verify}>Sign Up</button>
            {alertState.length !== 0 && <Alert heading={alertState[0]} message={alertState[1]} />}
        </div>
    )
}
