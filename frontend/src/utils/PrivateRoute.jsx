import { useSelector } from "react-redux"
import { Navigate } from "react-router"

export default function PrivateRoute({children}) {
    const { logged } = useSelector(state => state.login)
    console.log(logged)
    return logged ? children : <Navigate to='/login' />
}