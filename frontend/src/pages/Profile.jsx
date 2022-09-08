import { useSelector, useDispatch } from "react-redux"
import { logout } from "../reducers/auth"

export default function Profile() {
    const { info } = useSelector(state => state.login)
    const dispatch = useDispatch()

    return (
        <section className="padding-y padding-x">
            <h1 className="text-4xl font-bold">Hi <span className="text-primary">{info.last_name}</span></h1>
            <button onClick={() => dispatch(logout())} className='text-md text-white bg-red-500 font-bold py-3 px-6 rounded mt-16'>Log Out</button>
        </section>
    )
}