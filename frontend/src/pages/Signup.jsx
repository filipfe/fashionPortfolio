import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from '../assets/form'
import buttonStyles from "../utils/buttonStyles"
import axios from "axios"
import FormHeader from "../components/FormHeader"
import Loader from "../components/Loader"

const PWD_REGEX = /(?=.*[a-z])(?=.*[0-9])/

export default function Signup() {
    return (
        <section className='padding-x padding-y flex items-center h-screen justify-center lg:justify-start lg:grid lg:grid-cols-2'>
            <div className='flex flex-col gap-6 min-w-[50%] lg:max-w-[70%] relative'>
                <FormHeader />
                <h2 className="text-6xl relative z-10 font-bold">Create account</h2>
                <p className="font-medium text-xl text-[#707070]">And join over 100,000 active users all over the world!</p>
                <Form />
            </div>
            <img className="hidden lg:block max-w-[50%] object-cover absolute bottom-0 right-0 h-screen" src={auth} alt='fashionable woman' />
        </section>
    )
}

function Form() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState({
        password: false,
        info: ''
    })
    const [credentials, setCredentials] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async e => {
        setAlert({...alert, info: 'loading'})
        e.preventDefault()
        if(credentials.password.split('').length < 8) {
            return setAlert({...alert, info: 'Password must have at least 8 characters.'})
        }
        if(!PWD_REGEX.test(credentials.password)) {
            return setAlert({...alert, info: 'Password has to be alphanumeric and contain at least one number.'})
        }
        else {
            try {
                const response = await axios.post('/api/signup', JSON.stringify(credentials), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.status === 200) {
                    return navigate('/login')
                }
            } catch(err) {
                let error = err.response.data
                if('email' in error) setAlert({...alert, info: error.email[0].charAt(0).toUpperCase() + error.email[0].slice(1)})
                
            }
        }
    }

    useEffect(() => {
        if(!PWD_REGEX.test(credentials.password) || credentials.password.split('').length < 8) setAlert({...alert, password: false})
        else setAlert({info:'', password: true})
    }, [credentials]);

    return (
        <form className='flex flex-col gap-6 my-4 xl:mt-6' onSubmit={handleSubmit}>
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, first_name: e.target.value})} type='text' name='name' placeholder="First Name" />
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, last_name: e.target.value})} type='text' name='last-name' placeholder="Last Name" />
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, email: e.target.value})} type='email' name='email' placeholder="Email" />
            <input className={`${inputStyles} ${!alert.password ? 'focus:border-red-500 focus:border-2': 'focus:border-green-500 focus:border-2'}`} required value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} type='password' name='password' placeholder="Password" />
            {alert.info && alert.info !== 'loading' ? <div className='alert text-lg text-red-500'>{alert.info}</div> : <></>}
            <span className="text-sm">Already have an account? <Link to='/login' className="text-primary font-bold">Log in</Link></span>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0 md:justify-between">
                <button type="submit" className={`${buttonStyles} mt-6 px-10 font-medium`}>Create an account</button>
                {alert.info === 'loading' ? <Loader /> : <></> }
            </div>
        </form>
    )
}

export const inputStyles = 'bg-[#FBFBFB] py-3 px-6 sm:px-10 max-w-full rounded-md border-[1px] border-[#E6E6E6] outline-none'