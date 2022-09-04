import { useDispatch } from "react-redux"
import { add } from "../reducers/cart"

export default function Cloth(props) {
    return (
        <section className="padding-x padding-y min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:grid md:grid-cols-2 md:items-center">
                <img className="mx-auto max-w-[90%]" src={`/images/${props.image.split('/').pop()}`} alt={props.title} />
                <div className='info flex flex-col gap-4'>
                    <h2 className="text-center text-2xl mt-4">{props.title}</h2>
                    {props.sale > 0 ? 
                    <>  
                        <div>
                            <p className='text-center'><del>${props.price}</del></p>
                            <p className='text-center text-2xl'><strong>${props.price - (props.price * (props.sale / 100))} <strong className='text-red-500'>{`(-${props.sale}%)`}</strong></strong></p>
                        </div>
                        <AddToCart cloth={props.cloth} />
                    </>
                    : 
                    <>
                        <p className='text-center text-2xl font-bold'>${props.price}</p>
                        <AddToCart cloth={props.cloth} />
                    </>}
                </div>
            </div>
        </section>
    )
}

const AddToCart = ({ cloth }) => {
    const dispatch = useDispatch()
    return <button className="bg-darkPrimary mx-auto text-white text-lg font-bold max-w-[max-content] py-2 px-6" onClick={() => dispatch(add({...cloth, quantity: 1}))}>Add to cart</button>
} 