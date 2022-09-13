import { useState } from "react"
import buttonStyles from "../utils/buttonStyles"
import { inputStyles } from "../pages/Signup"
import { Link, useNavigate } from "react-router-dom"
import arrow from '../assets/arrow-left.svg'
import Loader from "./Loader"
import ShippingNav from "./ShippingNav"
import { useSelector } from "react-redux"

export default function Shipping(props) {
    return (
        <div className='flex flex-col gap-6 w-full lg:w-[8in] relative sm:flex-1'>
            <ShippingNav active={'Details'} />
            <Form {...props} />
        </div>
    )
}

function Form({ setOrder }) {
    const navigate = useNavigate()
    const { first_name } = useSelector(state => state.login.info)
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
        <div className='sm:border-[1px] sm:border-[#E6E6E6] sm:p-6 md:p-10 sm:rounded sm:mt-6 sm:flex-1'>
            <h3 className="mb-6 md:mb-10 font-bold hidden sm:block text-2xl">Shipping details</h3>
            <form className="flex flex-col gap-6 my-4 sm:grid sm:grid-cols-2 sm:gap-8" onSubmit={handleSubmit}>
                <input className={inputStyles} required defaultValue={first_name} type='text' name='name' placeholder="Name" />
                <input className={inputStyles} onChange={e => setAddress({...address, address: e.target.value})} required type='text' name='address' placeholder="Address" />
                <input className={`${inputStyles} min-w-0`} onChange={e => setAddress({...address, city: e.target.value})} required type='text' name='city' placeholder="City" />
                <input className={`${inputStyles} min-w-0`} onChange={e => setAddress({...address, postal_code: e.target.value})} required type='text' name='postal-code' placeholder="Postal Code" />
                <input className={inputStyles} onChange={e => setAddress({...address, country: e.target.value})} required type='text' name='country' placeholder="Country" />
                <input className={inputStyles} onChange={e => setAddress({...address, phone_number: e.target.value})} required type='tel' name='phone' placeholder="Phone Number" />
                <div className="col-[1/3] flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-4">
                        <input type='checkbox' name='vat' id='vat' />
                        <label className="font-medium text-md" htmlFor="vat">Send me VAT invoice</label>
                    </div>
                    <span className="text-md text-[#8B8B8B] font-medium">*Required field</span>
                </div> 
                <div className="flex flex-col-reverse sm:flex-row gap-6 sm:items-center sm:mt-6 col-[1/3]">
                    <button type="submit" className={`${buttonStyles} px-10 sm:w-max font-medium`}>Payment</button>
                    <Link to='/cart' className='text-primary px-6 py-3 flex items-center justify-center border-[1px] border-primary rounded-md font-medium mt-6 sm:mt-0'><img className="mr-[.8em] max-h-[.8em]" src={arrow} alt='' />Back</Link>
                </div>
            </form>
            {loading ? <Loader /> : <></>}
        </div> 
    ) 
}