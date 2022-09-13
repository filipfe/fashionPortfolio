import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { add, remove } from "../reducers/cart"
import buttonStyles from "../utils/buttonStyles"
import done from '../assets/done.svg'

export default function Cart({ summary }) {
    const { cart } = useSelector(state => state.cart)
    const { logged } = useSelector(state => state.login)

    return (
        <div className={`cart flex flex-col md:flex-row md:justify-between md:flex-wrap md:gap-12 ${cart.length > 0 ? 'mt-8 lg:mt-24' : ''}`}>
            {cart.length > 0 ? 
            <div className="relative">
                <div className='hidden lg:flex absolute top-0 left-0 w-full -translate-y-[100%] items-center justify-between px-12 py-4'>
                    <h3 className="font-bold ml-16">Product</h3>
                    <h3 className="font-bold ml-20">Quantity</h3>
                    <h3 className="font-bold">Price</h3>
                </div>
                <div className="flex flex-col relative border-x-[1px] border-b-[1px] border-[#E6E6E6] overflow-x-auto">
                    {cart.map(cloth => <CartItem {...cloth} cart={cart} cloth={cloth} key={cloth} />)}
                </div>
            </div>
             : <></> }
            { summary > 0 ? <Summary logged={logged} summary={summary} /> : <p className="px-[8vw] mt-6 md:px-0">Nothing's there! Go ahead and <Link className='text-primary font-bold' to='/clothing'>choose some clothing.</Link></p>}
        </div>
    )
}

const CartItem = props => {
    const dispatch = useDispatch()

    const index = props.cart.findIndex(item => item.id === props.id)

    return (
        <div className="px-[8vw] py-6 md:px-10 flex justify-between md:gap-[8vw] border-[#E6E6E6] border-t-[1px] even:bg-[#FCFCFC]">
            <div className="flex gap-4">
                <div className='h-[4.5rem] w-[4.5rem] md:h-[5rem] md:w-[5rem] rounded bg-[#F2F2F2] flex justify-center items-center'>
                    <img className="max-w-[80%] max-h-[80%]" src={props.image} alt='' />
                </div>
                <div className="flex flex-col justify-center gap-1 md:gap-2">
                    <h3 className="font-medium text-md md:text-lg">{props.title}</h3>
                    <h3 className="font-medium text-sm md:text-[1rem] sm:min-w-max text-[#A4A4A4]">Available in stock</h3>
                </div>
            </div>
            <div className='flex flex-col items-end md:flex-row-reverse md:items-center justify-center gap-2 md:gap-[8vw]'>
                {props.sale ? <h3 className="text-primary flex items-center font-bold text-md md:text-2xl">${props.sale ? props.price - (props.price * (props.sale / 100)) : props.price}</h3> : <h3 className="text-primary flex items-center font-bold text-md md:text-xl">${props.price}</h3>}
                <div className="flex items-center md:items-center md:grid md:grid-cols-2 gap-2">
                    <button onClick={() => {dispatch(add(props.cloth))}} className="rounded h-8 w-8 text-sm bg-[#F6F6F6] font-bold flex justify-center items-center my-auto">+</button>
                    <h3 className="font-bold text-sm md:col-first md:row-[1/3] md:text-xl justify-self-center flex items-center">{index > -1 ? props.cart.find(item => item.id === props.id).quantity : <></>}</h3>
                    <button onClick={() => {dispatch(remove(props.cloth))}} className="rounded h-8 w-8 text-sm bg-[#F6F6F6] font-bold flex justify-center items-center my-auto">-</button>
                </div>
            </div>
        </div>
    )
}

const Summary = ({ summary, logged }) => {
    return (
        <div className="summary flex flex-col border-[#E6E6E6] md:w-auto md:mx-0 md:border-[1px] md:self-start">
            <h3 className="border-[#E6E6E6] md:border-b-[1px] w-full px-[8vw] md:px-8 py-6 pb-0 md:pb-6 font-bold text-xl">Checkout</h3>
            <div className='border-[#E6E6E6] border-b-[1px] px-[8vw] md:px-8  py-6 flex flex-col gap-2'>
                <div className="flex justify-between items-center font-medium text-sm">
                    <h4 className="text-[#A4A4A4]">Subtotal</h4>
                    <h4>${summary}</h4>
                </div>
                <div className="flex justify-between items-center font-medium text-sm">
                    <h4 className="text-[#A4A4A4]">Shipping</h4>
                    <h4>$0</h4>
                </div>
                <div className="flex justify-between items-center font-medium text-sm">
                    <h3>Got a coupon?</h3>
                    <form className='flex items-center gap-2'>
                        <input className="p-3 max-w-[1.2in] border-[#E6E6E6] border-[1px] bg-[#FAFAFA]" type='text' name='coupon' placeholder="Write it here" />
                        <button className="p-4 border-[#E6E6E6] border-[1px] bg-[#FAFAFA] h-full flex items-center justify-center" type='submit'><img src={done} alt="+" /></button>
                    </form>
                </div>
            </div>
            <div className="flex items-center justify-between md:justify-start px-[8vw] md:px-8 py-4 md:gap-16">
                <strong className="text-xl font-bold text-primary">${summary}</strong>
                <div className="flex items-center gap-4">
                    <Link to='/clothing' className='px-6 py-3 border-[1px] border-primary text-primary rounded-md font-medium text-sm'>Back</Link>
                    <Link to={logged ? '/cart/shipping' : '/login'} className={`${buttonStyles} font-medium text-sm`}>Continue</Link>
                </div>
            </div>
        </div>
    )
}