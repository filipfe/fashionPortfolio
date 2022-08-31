import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { add, remove } from "../reducers/cart"

export default function Cart() {
    const { cart } = useSelector(state => state.cart)
    const [items, setItems] = useState([])
    const [summary, setSummary] = useState(0)

    useEffect(() => {
        setItems(cart)
    }, [cart])

    useEffect(() => {
        let summaryPrice = 0;
        items.forEach(cloth => {
            if(cloth.sale) {
                summaryPrice += cloth.price - (cloth.price * (cloth.sale / 100)) 
            } else {
                summaryPrice += cloth.price
            }
        })
        setSummary(summaryPrice)
    }, [items])

    return (
        <div className="cart flex flex-col lg:max-w-[max-content]">
            {items.map(cloth => <CartItem {...cloth} setSummary={setSummary} cloth={cloth} key={cloth} />)}
            { summary > 0 ? 
            <>
                <h2 className="border-t-2 text-xl border-[#BDBDBD] font-bold pt-8">Summary</h2>
                <strong className="text-2xl">${summary}</strong>
            </> : <p>Nothing's there! Go ahead and <Link className='text-darkPrimary' to='/clothing'>choose some clothing.</Link></p>
            }
        </div>
    )
}

const CartItem = props => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(props.sale ? props.price - (props.price * (props.sale / 100)) : props.price)

    useEffect(() => {
        setPrice(quantity * props.sale ? props.price - (props.price * (props.sale / 100)) : props.price)
        setSummary()
    }, [quantity])

    return (
        <div className="p-4 flex gap-6 border-t-2 border-[#BDBDBD]">
            <div className='h-[3rem] w-[3rem] bg-[#BDBDBD]'>
                <img className="max-w-[3rem] max-h-[3rem]" src={props.image} alt='' />
            </div>
            <h3>{props.title}</h3>
            {props.sale ? <strong>${props.sale ? props.price - (props.price * (props.sale / 100)) : props.price} <span className="text-red-500">{`-(${props.sale}%)`}</span></strong> : <strong>${props.price}</strong>}
            <button onClick={() => quantity === 1 ? dispatch(remove(props.cloth)) : setQuantity(prev => prev - 1)} className="rounded-[50%] h-8 w-8 text-xl border-black border-[1px] bg-transparent flex justify-center items-center my-auto">-</button>
            <button onClick={() => setQuantity(prev => prev + 1)} className="rounded-[50%] h-8 w-8 text-xl border-black border-[1px] bg-transparent flex justify-center items-center my-auto">+</button>
            <h3 className="font-bold text-3xl flex items-center">{quantity}</h3>
        </div>
    )
}