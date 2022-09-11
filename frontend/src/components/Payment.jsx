import buttonStyles from "../utils/buttonStyles"
import { inputStyles } from "../pages/Signup"
import { Link } from "react-router-dom"
import arrow from '../assets/arrow-left.svg'

export default function Payment() {
    return (
        <div className='flex flex-col gap-6 w-full lg:w-[6in] relative'>
            <h2 className="text-6xl font-bold">Shipping details</h2>
            <p className="font-medium text-xl text-[#707070]">Fill the form in order to order your products.</p>
            <Form />
        </div>
    )
}

function Form() {
    return (
        <form className='flex flex-col gap-6 my-4 xl:mt-6'>
            <input className={inputStyles} required type='text' name='address' placeholder="Address" />
            <div className='flex flex-col sm:grid sm:grid-cols-payment gap-6 w-full'>
                <input className={`${inputStyles} min-w-0`} required type='text' name='city' placeholder="City" />
                <input className={`${inputStyles} min-w-0`} required type='text' name='postal-code' placeholder="Postal Code" />
            </div>
            <input className={inputStyles} required type='text' name='country' placeholder="Country" />
            <input className={inputStyles} required type='tel' name='phone' placeholder="Phone Number" />
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                <button type="submit" className={`${buttonStyles} mt-6 px-10 font-medium`}>Move to the payment</button>
                <Link to='/cart' className='text-primary px-6 py-3 flex items-center w-max font-medium sm:mt-6'><img className="mr-[.8em] max-h-[.8em]" src={arrow} alt='' />Back</Link>
            </div>
        </form> 
    ) 
}