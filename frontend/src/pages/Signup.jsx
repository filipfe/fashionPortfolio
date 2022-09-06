import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const PWD_REGEX = /(?=.*[a-z])(?=.*[0-9])/

export default function Signup() {
    return (
        <section className='padding-x padding-y flex justify-center'>
            <div className='w-full shadow-lg px-6 py-10 text-center rounded-2xl max-w-[3.5in]'>
                <h2 className="text-3xl font-semibold">Sign Up</h2>
                <Form />
            </div>
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
        e.preventDefault()
        if(credentials.password.split('').length < 8) {
            return setAlert({...alert, info: 'Password must have at least 8 characters.'})
        }
        if(!PWD_REGEX.test(credentials.password)) {
            return setAlert({...alert, info: 'Password has to be alphanumeric and contain at least one number.'})
        }
        else {
            const response = await axios.post('/api/signup', JSON.stringify(credentials), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.status === 200) {
                return navigate('/login')
            }
        }
    }

    useEffect(() => {
        if(!PWD_REGEX.test(credentials.password) || credentials.password.split('').length < 8) setAlert({...alert, password: false})
        else setAlert({info:'', password: true})
    }, [credentials]);

    return (
        <form className='flex flex-col gap-4 my-4' onSubmit={handleSubmit}>
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, first_name: e.target.value})} type='text' name='name' placeholder="First Name" />
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, last_name: e.target.value})} type='text' name='last-name' placeholder="Last Name" />
            <input className={inputStyles} required onChange={e => setCredentials({...credentials, email: e.target.value})} type='email' name='email' placeholder="Email" />
            <input className={`${inputStyles} ${!alert.password ? 'focus:border-red-500 focus:border-2': 'focus:border-green-500 focus:border-2'}`} required value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} type='password' name='password' placeholder="Password" />
            {alert.info ? <div className='alert text-lg text-red-500'>{alert.info}</div> : <></>}
            <button className='w-full bg-[#E0AFA0] text-white rounded-md py-2 font-medium'>Create an account</button>
            <span className="text-sm">Already have an account? <Link to='/login' className="text-[#E0AFA0]">Log in</Link></span>
        </form>
    )
}

export const inputStyles = 'bg-darkPrimary bg-opacity-30 py-3 px-4 rounded-md border-[1px] border-[#BDBDBD] outline-none'