import Cart from '../components/Cart'
import { useLocation } from 'react-router'
import Shipping from '../components/Shipping'
import Payment from '../components/Payment'

export default function CartPage() {
    const location = useLocation()
    const url = location.pathname.split("/").pop()
    return (
        <section className="padding-y padding-x lg:flex lg:items-center lg:flex-col">
            {url === 'cart' ? <h2 className="font-bold text-2xl lg:text-3xl mb-4">Your cart</h2> : <></>}
            {url === 'cart' ? <Cart /> : url === 'shipping' ? <Shipping /> : url === 'payment' ? <Payment /> : <></>}
        </section>
    )
}