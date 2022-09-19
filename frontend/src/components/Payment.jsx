import buttonStyles from "../utils/buttonStyles"
import { inputStyles } from "../pages/Signup"
import { Link} from "react-router-dom"
import arrow from '../assets/arrow-left.svg'
import { useNavigate } from "react-router-dom"
import menu from '../assets/menu.svg'
import ShippingNav from "./ShippingNav"
import { useState } from "react"

export default function Payment(props) {
    return (
        <div className='flex flex-col gap-6 w-full lg:w-[6in] relative sm:flex-1'>
            <ShippingNav active={'Payment'} />
            <Form {...props} />
        </div>
    )
}

const methods = [
    'Credit card',
    'Blik',
    'Cash-on-delivery'
]

function Form({ setOrder }) {
    const [method, setMethod] = useState('Credit card')
    const navigate = useNavigate()

    const Menu = () => {
        const [active, setActive] = useState(false)
        return (
            <div className="relative flex items-center">
                <div className={`${inputStyles} w-full`} onClick={() => setActive(prev => !prev)}>{method}</div>
                <img className="absolute right-6" src={menu} alt="" />
                {active ? <div className='flex flex-col absolute bottom-0 rounded overflow-hidden translate-y-full right-0 left-0 border-x-[1px] border-[#E6E6E6]'>
                    {methods.map(m => <div onClick={() => setMethod(m)} className={`even:bg-[#FBFBFB] cursor-pointer bg-white border-b-[1px] border-[#E6E6E6] w-full py-3 px-6 ${method === m ? 'text-primary font-medium' :  'hover:text-primary'}`} key={m}>{m}</div>)}
                </div> : <></>}
            </div>
        )
    }

    const handleSubmit = e => {
        e.preventDefault()
        setOrder(prev => {
            return {
                ...prev,
                payment: {
                    method: method
                }
            }
        })
        return navigate('/cart/summary')
    }

    return (
        <div className='sm:border-[1px] sm:border-[#E6E6E6] sm:p-6 md:p-10 sm:rounded sm:mt-6 sm:flex-1'>
            <h3 className="mb-6 md:mb-10 font-bold hidden sm:block text-2xl">Payment method</h3>
            <form className="flex flex-col gap-6 my-4 sm:gap-8" onSubmit={handleSubmit}>
                <Menu />
                {method === 'Credit card' ? <div className='bg-[#FBFBFB] rounded-md font-medium flex justify-center items-center min-h-[1in] border-[#E6E6E6] border-[1px]'>+ Add card</div> : <></>}
                <div className="flex flex-col-reverse sm:flex-row gap-6 sm:items-center sm:mt-6 col-[1/3]">
                    <button type="submit" className={`${buttonStyles} px-10 sm:w-max font-medium`}>Payment</button>
                    <Link to='/cart/shipping' className='text-primary px-6 py-3 flex items-center justify-center border-[1px] border-primary rounded-md font-medium mt-6 sm:mt-0'><img className="mr-[.8em] max-h-[.8em]" src={arrow} alt='' />Back</Link>
                </div>
            </form>
        </div> 
    ) 
}