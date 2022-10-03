import { Link} from "react-router-dom"
import arrow from '../assets/arrow-left.svg'
import ShippingNav from "./ShippingNav"
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react"

export default function Summary(props) {
    return (
            <div className='flex flex-col gap-6 w-full lg:w-[6in] relative sm:flex-1'>
                <ShippingNav active={'Summary'} />
                <Info {...props}  />
            </div>
    )
}

function Info(props) {
    let price = 0;
    useEffect(() => {
        props.cart.forEach(item => item.sale ? price += (item.price - (item.price * (item.sale / 100))) * item.quantity : price += item.price * item.quantity)
    }, [])
    
    return (
        <div className='sm:border-[1px] sm:border-[#E6E6E6] sm:p-6 md:p-10 sm:rounded sm:mt-6 sm:flex-1'>
            <h3 className="mb-6 md:mb-10 font-bold hidden sm:block text-2xl">Your order</h3>
            <div className="flex flex-col gap-6 my-4 sm:gap-8">
                <div className="flex flex-col">
                    {props.cart.map(item => <Item {...item} key={item} />)}
                </div>
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">Total</h3>
                    <h3 className="text-primary text-2xl font-bold">${props.summary}</h3>
                </div>
                <Link to='/cart/payment' className='text-primary col-[1/3] px-6 py-3 max-w-max flex items-center justify-center border-[1px] border-primary rounded-md font-medium mt-6 sm:mt-0'><img className="mr-[.8em] max-h-[.8em]" src={arrow} alt='' />Back</Link>
                <div className="relative z-0">
                    <PayPalButtons createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: price
                                }
                            }]
                        })
                    }} />
                </div>
            </div>
        </div>
    ) 
}

const Item = (props) => {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <h3 className="font-medium">x{props.quantity} {props.title}</h3>
            <h3 className="font-medium">${props.sale ? props.price - (props.price * (props.sale / 100)) : props.price}</h3>
        </div>
    )
}