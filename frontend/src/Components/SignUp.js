import { useState } from "react"
export default function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")
    const verify = async () => {
        if(name==="" || email==="" || password==="" || user === "")
            alert("Please fill up the details properly")
        else if (!email.includes("@") || !email.includes(".com"))
            alert("Please enter a valid email")
        else if (password.length < 8)
            alert("Please enter a strong password")
        else {
            await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    user: user,
                    password: password
                })
            }).then((res)=>{
                return res.json()
            }).then((data)=>{
                alert(data)
            }).catch((err)=>{
                alert("An error occured while signing you up")
                console.log(err)
            })
        }
    }
    return (
        <div className="body">
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
            <button  className="bodyBtn" onClick={verify}>Sign Up</button>
        </div>
    )
}