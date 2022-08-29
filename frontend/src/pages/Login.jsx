import { Link } from "react-router-dom"
import { inputStyles } from "./Signup"
import { login, logout } from "../reducers/auth"
import { useDispatch, useSelector } from "react-redux"

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
    const isLogged = useSelector(state => state.value.logged)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()  
        dispatch(login())
    }

    return (
        !isLogged ? <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-4'>
                        <input className={inputStyles} type='email' name='email' placeholder="Email" />
                        <input className={inputStyles} type='password' name='password' placeholder="Password" />
                        <button type="submit" className='w-full bg-[#E0AFA0] text-white rounded-md py-2 font-medium'>Log in</button>
                        <span className="text-sm">Don't have an account? <Link to='/signup' className="text-[#E0AFA0]">Sign up</Link></span>
                    </form> :
                    <div className="gap-4 mt-4 flex-col flex">
                        Thanks for logging!
                        <button onClick={() => dispatch(logout())}>Log Out</button>
                    </div>
    ) 
}