import Cart from '../components/Cart'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import Shipping from '../components/Shipping'
import Payment from '../components/Payment'
import { useState, useEffect } from 'react'

export default function CartPage() {
    const location = useLocation()
    const { info } = useSelector(state => state.login)
    const { cart } = useSelector(state => state.cart)
    const [summary, setSummary] = useState(0)
    const [order, setOrder] = useState({
        user_id: info.id,
        shipping: {
            address: '',
            city: '',
            postal_code: '',
            country: '',
            phone_number: ''
        },
        payment: {

        }
    })

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

    const url = location.pathname.split("/").pop()

    return (
        <section className={url === 'cart' ? 's-cart py-[1.3in]' : 'padding-y padding-x pb0 relative flex flex-col items-center min-h-screen'}>
            {url === 'cart' ? <h2 className="font-bold text-5xl ml-[8vw] md:ml-0">Your cart</h2> : <></>}
            {url === 'cart' ? <Cart summary={summary} /> : url === 'shipping' ? <Shipping setOrder={setOrder} /> : url === 'payment' ? <Payment summary={summary} /> : <></>}
        </section>
    )
}