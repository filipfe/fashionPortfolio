import { useSelector } from "react-redux"
import { Navigate } from "react-router"

export default function PrivateRoute({children}) {
    const { logged } = useSelector(state => state.login)

    return logged ? children : <Navigate to='/login' />
}