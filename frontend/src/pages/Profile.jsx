import { useSelector, useDispatch } from "react-redux"
import { logout } from "../reducers/auth"
import axios from "axios"

export default function Profile() {
    const { info } = useSelector(state => state.login)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        const resp = await axios.post('/api/logout')
                .catch(err => console.log(err))
        if(resp.status === 200) return dispatch(logout())
    }

    return (
        <section className="padding-y padding-x">
            <h1 className="text-4xl font-bold">Hi <span className="text-primary">{info.first_name}</span></h1>
            <button onClick={handleLogout} className='text-md text-white bg-red-500 font-bold py-3 px-6 rounded mt-16'>Log Out</button>
        </section>
    )
}