import { Link } from "react-router-dom"
import { inputStyles } from "./Signup"

export default function Login() {
    return (
        <section className='padding-x padding-y'>
            <form>
                <div className='w-full shadow-lg flex flex-col px-6 py-10 text-center gap-4 rounded-2xl'>
                    <h2 className="text-3xl font-semibold">Log In</h2>
                    <input className={inputStyles} type='email' name='email' placeholder="Email" />
                    <input className={inputStyles} type='password' name='password' placeholder="Password" />
                    <button className='w-full bg-[#E0AFA0] text-white rounded-md py-2 font-medium'>Log in</button>
                    <span className="text-sm">Don't have an account? <Link to='/signup' className="text-[#E0AFA0]">Sign up</Link></span>
                </div>
            </form>
        </section>
    )
}