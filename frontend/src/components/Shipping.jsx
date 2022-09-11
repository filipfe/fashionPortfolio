import { useState } from "react"
import buttonStyles from "../utils/buttonStyles"
import { inputStyles } from "../pages/Signup"
import { Link, useNavigate } from "react-router-dom"
import arrow from '../assets/arrow-left.svg'
import Loader from "./Loader"

export default function Shipping(props) {
    return (
        <div className='flex flex-col gap-6 w-full lg:w-[6in] relative'>
            <h2 className="text-6xl font-bold">Shipping details</h2>
            <p className="font-medium text-xl text-[#707070]">Fill the form in order to order your products.</p>
            <Form {...props} />
        </div>
    )
}

function Form({ setOrder }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState({
        address: '',
        city: '',
        postal_code: '',
        country: '',
        phone_number: ''
    })

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        setOrder(prev => {
            return {
                ...prev,
                shipping: {...address}
            }
        })
        return navigate('/cart/payment')
    }

    return (
        <form className='flex flex-col gap-6 my-4 xl:mt-6' onSubmit={handleSubmit}>
            <input className={inputStyles} onChange={e => setAddress({...address, address: e.target.value})} required type='text' name='address' placeholder="Address" />
            <div className='flex flex-col sm:grid sm:grid-cols-payment gap-6 w-full'>
                <input className={`${inputStyles} min-w-0`} onChange={e => setAddress({...address, city: e.target.value})} required type='text' name='city' placeholder="City" />
                <input className={`${inputStyles} min-w-0`} onChange={e => setAddress({...address, postal_code: e.target.value})} required type='text' name='postal-code' placeholder="Postal Code" />
            </div>
            <input className={inputStyles} onChange={e => setAddress({...address, country: e.target.value})} required type='text' name='country' placeholder="Country" />
            <input className={inputStyles} onChange={e => setAddress({...address, phone_number: e.target.value})} required type='tel' name='phone' placeholder="Phone Number" />
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                <button type="submit" className={`${buttonStyles} mt-6 px-10 font-medium`}>Move to the payment</button>
                <Link to='/cart' className='text-primary px-6 py-3 flex items-center w-max font-medium sm:mt-6'><img className="mr-[.8em] max-h-[.8em]" src={arrow} alt='' />Back</Link>
            </div>
            {loading ? <Loader /> : <></>}
        </form> 
    ) 
}