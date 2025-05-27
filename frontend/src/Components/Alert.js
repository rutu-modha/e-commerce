import { useState, useEffect } from "react"
export default function Alert({ heading, message, onClose }) {
    const [fade, setFade] = useState(true);
    useEffect(() => {
        const t1 = setTimeout(() => {
            setFade(false);
        }, 2000)
        const t2 = setTimeout(() => {
            onClose();
        }, 3000)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
        }
    }, [onClose])
    return (
        <div className={`alert ${fade ? "fadeIn" : "fadeOut"}`}>
            <h1 style={{color: "white"}}>{heading}</h1>
            <p style={{color: "white"}}>{message}</p>
        </div>
    )
}