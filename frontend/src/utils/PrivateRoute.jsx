import { useState } from "react"
import { Navigate } from "react-router"

export default function PrivateRoute({children}) {
    const [authorized, setAuthorized] = useState(false)
    return authorized ? children : <Navigate to='/login' />
}