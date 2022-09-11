import buttonStyles from "../utils/buttonStyles";
import arrow from '../assets/arrow-left.svg'
import { Link } from "react-router-dom";

export default function Payment({ summary }) {
    return (
        <div className='flex flex-col gap-6 w-full lg:w-[6in] relative'>
            <h2 className="text-6xl font-bold">Payment method</h2>
            <p className="font-medium text-xl text-[#707070]">Choose the payment method you prefer.</p>
            <div className="flex flex-col sm:grid sm:items-center sm:grid-cols-payment gap-6 py-8">
                <Form />
                <div className='flex flex-col gap-2'>
                    <h2 className="text-xl font-bold">Total</h2>
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
        <form className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <input type="radio" name='payment' id='card' />
                <label htmlFor="card">Credit Card</label>
            </div>
            <div className="flex items-center gap-2">
                <input type="radio" name='payment' id='blik' />
                <label htmlFor="blik">Blik</label>
            </div>
            <div className="flex items-center gap-2">
                <input type="radio" name='payment' id='delivery' />
                <label htmlFor="delivery">Cash-on-delivery</label>
            </div>
        </form>
    )
}