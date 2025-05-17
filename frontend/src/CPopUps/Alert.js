export default function Alert({ heading, message }){
    return (
        <div className="alert">
            <h1 style={{color: "white"}}>{heading}</h1>
            <p style={{color: "white"}}>{message}</p>
            <button className="alertBtn" onClick={() => window.location.reload()}>OK</button>
        </div>
    )
}
