import { useState } from "react"
export default function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")
    return (
        <div>
            <h1>Sign Up</h1>
            <input type="text" value={name} placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
            <br/><br/>
            <input type="email" value={email} placeholder="Enter your e-mail" onChange={(e)=>setEmail(e.target.value)}/>
            <br/><br/>
            <input type="password" value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
            <br/><br/>
            <p>Select as whom shall we register you:</p>
            <select value={user} onChange={(e)=>setUser(e.target.value)}>
                <option></option>
                <option>Consumer</option>
                <option>Retailer</option>
            </select>
            <br/><br/>
            <button>Sign Up</button>
        </div>
    )
}