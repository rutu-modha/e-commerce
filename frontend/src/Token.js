import { jwtDecode } from "jwt-decode"
export default function Token() {
    const token = localStorage.getItem("token")
    let decode
    if (token === null || token === undefined) {
        decode = {
            role: "Customer",
            name: "User"
        }
        return decode
    } else {
        try {
            decode = jwtDecode(token)
        } catch (error) {
            if (decode === null || decode === undefined) {
                decode = {
                    role: "Customer",
                    name: "User"
                }
                return decode
            }
        }
    }
    return decode
}