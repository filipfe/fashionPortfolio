import axios from "axios"
import { Link } from "react-router-dom"
import { inputStyles } from "../pages/Signup"
import buttonStyles from "../utils/buttonStyles"
import Loader from "./Loader"
import { useState } from "react"

export default function Recovery() {
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        setAlert('loading')
        const response = await axios.post('/api/login/recovery', email, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200) setAlert('An email has been sent!')
        else setAlert("There was an error.")
    }

    return (
        <form className='flex flex-col gap-6 my-4 xl:mt-6'>
            <input className={inputStyles} onChange={e => setEmail(e.target.value)} required type='email' name='email' placeholder="Email" />
            {alert && alert !== 'loading' ? <div className={`alert text-lg ${alert === 'An email has been sent!' ? 'text-green-500' : 'text-red-500' }`}>{alert}</div> : <></>}
            <Link to='/login' className="text-primary font-bold">Remember password?</Link>
            <button type='submit' onClick={handleSubmit} className={`${buttonStyles} mt-6 px-10 font-medium max-w-max`}>Send message</button>
            {alert === 'loading' ? <Loader /> : <></>}
        </form>
    )
}