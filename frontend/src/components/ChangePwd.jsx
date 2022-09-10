import { inputStyles } from "../pages/Signup"
import buttonStyles from "../utils/buttonStyles"
import Loader from "./Loader"
import { useLocation } from "react-router"
import axios from "axios"
import { useState } from "react"

export default function ChangePwd() {
    const [password, setPassword] = useState({
        pwd: '',
        confPwd: ''
    })
    const [alert, setAlert] = useState()
    const location = useLocation()

    const PWD_URL = location.pathname.split('/').pop()

    const handleSubmit = async e => {
        e.preventDefault()
        setAlert('loading')
        if(password.pwd !== password.confPwd) return setAlert("Passwords didn't match!")
        const response = await axios.patch(`/api/login/recovery/complete`, JSON.stringify({
            password: password.pwd,
            token: PWD_URL,
            uidb64: 'MQ'
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200) setAlert('Password has been successfully changed!')
        else setAlert("There was an error.")
    }

    return (
        <form className='flex flex-col gap-6 my-4 xl:mt-6'>
            <input className={inputStyles} onChange={e => setPassword({...password, pwd: e.target.value})} required type='password' name='password' placeholder="Password" />
            <input className={inputStyles} onChange={e => setPassword({...password, confPwd: e.target.value})} required type='password' name='confirm-password' placeholder="Confirm password" />
            {alert && alert !== 'loading' ? <div className={`alert text-lg ${alert === 'Password has been successfully changed!' ? 'text-green-500' : 'text-red-500' }`}>{alert}</div> : <></>}
            <button type='submit' onClick={handleSubmit} className={`${buttonStyles} mt-6 px-10 font-medium`}>Change password</button>
            {alert === 'loading' ? <Loader /> : <></>}
        </form>
    )
}