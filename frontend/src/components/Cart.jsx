import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Cart() {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const [items, setItems] = useState([])
    const [summary, setSummary] = useState(0)

    useEffect(() => {
        setItems(cart)
    }, [cart])

    useEffect(() => {
        items.forEach(cloth => setSummary(prev => cloth.sale ? prev += cloth.price - (cloth.price * (cloth.sale / 100)) : prev += cloth.price))
    }, [items])

    return (
        <div className="cart flex flex-col lg:max-w-[max-content]">
            {items.map(cloth => <CartItem {...cloth} key={cloth} />)}
            { summary > 0 ? 
            <>
                <h2 className="border-t-2 text-xl border-[#BDBDBD] font-bold pt-8">Summary</h2>
                <strong className="text-2xl">${summary}</strong>
            </> : <p>Nothing there! Go ahead and <Link className='text-darkPrimary' to='/clothing'>choose some clothing.</Link></p>
            }
        </div>
    )
}

const CartItem = props => {
    return (
        <div className="p-4 flex gap-6 border-t-2 border-[#BDBDBD]">
            <div className='h-[3rem] w-[3rem] bg-[#BDBDBD]'>
                <img className="max-w-[3rem] max-h-[3rem]" src={props.image} alt='' />
            </div>
            <h3>{props.title}</h3>
            {props.sale ? <strong>${props.price - (props.price * (props.sale / 100))}</strong> : <strong>${props.price}</strong>}
        </div>
    )
}