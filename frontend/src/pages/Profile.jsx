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
            <h1 className="text-4xl font-bold mb-16">Hi <span className="text-primary">{info.first_name.charAt(0).toUpperCase() + info.first_name.slice(1)}</span></h1>
            <h2 className="font-bold text-6xl">Saved</h2>
            <div className='flex flex-col gap-6 md:grid-autoFit'>

            </div>
            <button onClick={handleLogout} className='text-md text-white bg-red-500 font-bold py-3 px-6 rounded mt-16'>Log Out</button>
        </section>
    )
}