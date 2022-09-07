import { Link, useLocation, useNavigate } from "react-router-dom"
import { inputStyles } from "./Signup"
import { login, logout } from "../reducers/auth"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Login() {
    return (
        <section className='padding-x padding-y justify-center flex'>
            <div className='w-full shadow-lg px-6 py-10 text-center rounded-2xl max-w-[3.5in]'>
                <h2 className="text-3xl font-semibold">Log In</h2>
                <Form />
            </div>
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

    useEffect(() => {
        console.log(info)
    }, [info]);
    useEffect(() => {
        console.log(location)
    }, [location]);

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-4'>
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, email: e.target.value})} type='email' name='email' placeholder="Email" />
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, password: e.target.value})} type='password' name='password' placeholder="Password" />
            <button type="submit" className='w-full bg-[#E0AFA0] text-white rounded-md py-2 font-medium'>Log in</button>
            <span className="text-sm">Don't have an account? <Link to='/signup' className="text-[#E0AFA0]">Sign up</Link></span>
        </form> 
    ) 
}