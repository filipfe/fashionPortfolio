import { Link } from "react-router-dom"

export default function Signup() {
    return (
        <section className='padding-x padding-y'>
            <form>
                <div className='w-full shadow-lg flex flex-col px-6 py-10 text-center gap-4 rounded-2xl'>
                    <h2 className="text-3xl font-semibold">Sign Up</h2>
                    <input className={inputStyles} type='text' name='name' placeholder="First Name" />
                    <input className={inputStyles} type='text' name='last-name' placeholder="Last Name" />
                    <input className={inputStyles} type='email' name='email' placeholder="Email" />
                    <input className={inputStyles} type='password' name='password' placeholder="Password" />
                    <button className='w-full bg-[#E0AFA0] text-white rounded-md py-2 font-medium'>Log in</button>
                    <span className="text-sm">Already have an account? <Link to='/login' className="text-[#E0AFA0]">Log up</Link></span>
                </div>
            </form>
        </section>
    )
}

export const inputStyles = 'bg-darkPrimary bg-opacity-30 py-3 px-4 rounded-md border-[1px] border-[#BDBDBD]'