import { useState } from "react";
export default function Alert({ message }){
    return (
        <div className="alert">
            <h2 style={{color: "white"}}>Alert</h2>
            <p style={{color: "white"}}>{message}</p>
        </div>
    )
}