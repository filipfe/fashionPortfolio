import { Route, Navigate } from "react-router";
import { useState } from "react";

export default function PrivateRoute({children, ...rest}) {
    const [authorized, setAuthorized] = useState(false)
    return authorized ? children : <Navigate to='/login' />
}