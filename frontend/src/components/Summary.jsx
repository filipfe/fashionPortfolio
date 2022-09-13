import buttonStyles from "../utils/buttonStyles"
import { Link} from "react-router-dom"
import arrow from '../assets/arrow-left.svg'
import { useNavigate } from "react-router-dom"
import ShippingNav from "./ShippingNav"
import cart from "../reducers/cart"

export default function Summary(props) {
    return (
        <div className='flex flex-col gap-6 w-full lg:w-[6in] relative sm:flex-1'>
            <ShippingNav active={'Summary'} />
            <Info {...props} />
        </div>
    )
}

function Info(props) {
    const navigate = useNavigate()

    
    return (
        <div className='sm:border-[1px] sm:border-[#E6E6E6] sm:p-6 md:p-10 sm:rounded sm:mt-6 sm:flex-1'>
            <h3 className="mb-6 md:mb-10 font-bold hidden sm:block text-2xl">Your order</h3>
            <div className="flex flex-col gap-6 my-4 sm:gap-8">
                <div className="flex flex-col">
                    {props.cart.map(item => <h3 className="font-medium">x{item.quantity} {item.title}</h3>)}
                </div>
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">Total</h3>
                    <h3 className="text-primary text-2xl font-bold">${props.summary}</h3>
                </div>
                <div className="flex flex-col-reverse sm:flex-row gap-6 sm:items-center sm:mt-6 col-[1/3]">
                    <button onClick={handleSubmit} className={`${buttonStyles} px-10 sm:w-max font-medium`}>Submit</button>
                    <Link to='/cart/shipping' className='text-primary px-6 py-3 flex items-center justify-center border-[1px] border-primary rounded-md font-medium mt-6 sm:mt-0'><img className="mr-[.8em] max-h-[.8em]" src={arrow} alt='' />Back</Link>
                </div>
            </div>
        </div> 
    ) 
}