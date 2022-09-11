import { useState, useEffect } from "react";
import buttonStyles from "../utils/buttonStyles";
import arrow from '../assets/arrow-left.svg'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Payment() {
    const [summary, setSummary] = useState(0)
    const { cart } = useSelector(state => state.cart)

    useEffect(() => {
        let summaryPrice = 0;
        cart.forEach(cloth => {
            let item = cart.find(item => item.id === cloth.id)
            if(cloth.sale) {
                summaryPrice += (cloth.price - (cloth.price * (cloth.sale / 100))) * item.quantity
            } else {
                summaryPrice += cloth.price * item.quantity
            }
        })
        setSummary(summaryPrice)
    }, [cart])

    return (
        <div className='flex flex-col gap-6 w-full lg:w-[8in] relative'>
            <h2 className="text-6xl font-bold">Payment method</h2>
            <p className="font-medium text-xl text-[#707070]">Choose the payment method you prefer.</p>
            <div className="flex flex-col sm:grid sm:grid-cols-payment gap-6">
                <Form />
                <div className='flex flex-col gap-2'>
                    <h2 className="text-xl font-bold pt-8">Total</h2>
                    <strong className="text-2xl col-first">${summary}</strong>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                <button type="submit" className={`${buttonStyles} mt-6 px-10 font-medium`}>Summary</button>
                <Link to='/cart/shipping' className='text-primary px-6 py-3 flex items-center w-max font-medium sm:mt-6'><img className="mr-[.8em] max-h-[.8em]" src={arrow} alt='' />Back</Link>
            </div>
        </div>     
    )
}

const Form = () => {
    return (
        <form>

        </form>
    )
}