import { useSelector } from "react-redux"
import { Navigate } from "react-router"

export default function PublicRoute({children}) {
    const { logged } = useSelector(state => state.login)
    return logged ? <Navigate to='/profile' /> : children
}