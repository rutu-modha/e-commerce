import { jwtDecode } from "jwt-decode"
export default function Token() {
    const token = localStorage.getItem("token")
    let decode
    if (token === null) {
        decode = {
            role: "Customer",
            name: "User"
        }
    } else {
        try {
            decode = jwtDecode(token)
            if (decode === null) {
                decode = {
                    role: "Customer",
                    name: "User"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return decode
}