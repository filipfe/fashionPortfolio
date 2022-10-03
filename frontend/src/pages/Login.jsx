import { Link, useLocation, useNavigate } from "react-router-dom"
import { inputStyles } from "./Signup"
import buttonStyles from "../utils/buttonStyles"
import { login } from "../reducers/auth"
import jwtDecode from 'jwt-decode'
import { useDispatch } from "react-redux"
import { useState } from "react"
import { auth } from '../assets/form'
import axios from "axios"
import FormHeader from "../components/FormHeader"
import Loader from "../components/Loader"
import Recovery from "../components/Recovery"
import ChangePwd from "../components/ChangePwd"

export default function Login() {
    const location = useLocation()
    let url = location.pathname.split("/").pop()
    return (
        <section className='padding-x padding-y bg-white flex items-center h-screen justify-center lg:justify-start lg:grid lg:grid-cols-2'>
            <div className='flex flex-col gap-6 min-w-[50%] lg:max-w-[70%] relative'>
                <FormHeader />
                <h2 className="text-6xl font-bold">{ url === 'login' ? 'Log in' : 'Reset password' }</h2>
                <p className="font-medium text-xl text-[#707070]">And start exploring newest offerts</p>
                {url === 'login' ? <Form /> : url === 'recovery' ? <Recovery /> : <ChangePwd />}
            </div>
            <img className="hidden lg:block max-w-[50%] object-cover absolute top-0 bottom-0 right-0 h-screen" src={auth} alt='fashionable woman' />
        </section>
    )
}

function Form() {
    const dispatch = useDispatch()
    const [alert, setAlert] = useState('')
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()
        setAlert('loading')
        try {
            const response = await axios.post('/api/login', JSON.stringify(credentials), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.status === 200) {
                let user = jwtDecode(response.data.access)
                dispatch(login({
                    info: user,
                    tokens: [response.data.access, response.data.refresh]
                }))
            }
        } catch (err) {
            setAlert(err.response?.data?.detail)
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col bg-white gap-6 my-4 xl:mt-6'>
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, email: e.target.value})} type='email' name='email' placeholder="Email" />
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, password: e.target.value})} type='password' name='password' placeholder="Password" />
            <div className="flex items-center flex-wrap justify-between gap-2">
                <span className="text-sm font-medium">Don't have an account? <Link to='/signup' className="text-primary font-bold">Sign up</Link></span>
                <Link to='/login/recovery' className="text-primary text-sm font-bold">Forgot password?</Link>
            </div>
            {alert !== 'loading' && alert ? <div className='alert text-lg text-red-500'>{alert}</div> : <></>}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0 md:justify-between">
                <button type="submit" className={`${buttonStyles} mt-6 px-10 max-w-max font-medium`}>Log in</button>
                {alert === 'loading' ? <Loader /> : <></>}
            </div>
        </form> 
    ) 
}