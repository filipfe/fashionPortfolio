import { Link, useLocation, useNavigate } from "react-router-dom"
import { inputStyles } from "./Signup"
import { login } from "../reducers/auth"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { auth } from '../assets/form'
import axios from "axios"
import FormHeader from "../components/FormHeader"

export default function Login() {
    return (
        <section className='padding-x padding-y flex items-center h-screen justify-center lg:justify-start lg:grid lg:grid-cols-2'>
            <div className='flex flex-col gap-6 min-w-[50%] lg:max-w-[70%] relative'>
                <FormHeader />
                <h2 className="text-6xl font-bold">Log in</h2>
                <p className="font-medium text-xl text-[#707070]">And start exploring newest offerts</p>
                <Form />
            </div>
            <img className="hidden lg:block max-w-[50%] object-cover absolute top-0 bottom-0 right-0 h-screen" src={auth} alt='fashionable woman' />
        </section>
    )
}

function Form() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const info = useSelector(state => state.login)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()
        const response = await axios.post('/api/login', JSON.stringify(credentials), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.status === 200) {
            const user = await axios.get('/api/user')
                .then(res => res.data)
                .then(data => dispatch(login(data)))
            return navigate('/profile')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 my-4 xl:mt-6'>
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, email: e.target.value})} type='email' name='email' placeholder="Email" />
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, password: e.target.value})} type='password' name='password' placeholder="Password" />
            <span className="text-sm font-medium">Don't have an account? <Link to='/signup' className="text-primary font-bold">Sign up</Link></span>
            <button type="submit" className='w-full bg-primary text-white mt-6 rounded-md lg:max-w-[max-content] px-10 py-3 font-medium'>Log in</button>
        </form> 
    ) 
}