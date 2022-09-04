import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { add } from "../reducers/cart"
import axios from 'axios'

const filters = [
    'Jacket',
    'Shoes',
    'Tshirt',
    'Hoodies',
    'Trousers'
]

export default function Clothing() {
    const [clothes, setClothes] = useState([])
    const [filtered, setFiltered] = useState([])
    const location = useLocation()

    useEffect(() => {
        let lastPath = location.pathname.split('/').pop()
        axios.get('/clothing/api')
            .then(res => res.data)
            .then(data => lastPath === 'trending' ? data.filter(cloth => cloth.trending) : lastPath === 'new' ? data.filter(cloth => cloth.new) : lastPath === 'collection' ? data.filter(cloth => cloth.collection) : lastPath !== 'clothing' ? data.filter(cloth => cloth.sex === lastPath) : data)
            .then(data => setClothes(data))
            .catch(error => console.log(error.message))
    }, [location])

    useEffect(() => {
        console.log(filtered)
    }, [filtered])

    const AsideFilter = () => {
        return (
            <aside className="hidden pt-[3rem] md:pt-[1in] md:block">
                <nav className="flex flex-col gap-4">
                    {filters.map(filter => <a className="cursor-pointer" key={filter} onClick={() => setFiltered(clothes.filter(cloth => cloth.type === filter.toLowerCase()))}>{filter}</a>)}
                </nav>
            </aside>
        )
    }

    return (
        <section className="padding-x padding-y">
            <div className='md:grid-cols-clothes md:grid'>
                <AsideFilter />
                <div className='clothes-wrapper'>
                    <h1 className="font-bold text-2xl mb-8 lg:text-3xl">Our {location.pathname === '/clothing/new' ? 'new ' : location.pathname === '/clothing/trending' ? 'trending ' : ''}clothing {location.pathname === "/clothing/men" ? 'for men' : location.pathname === "/clothing/women" ? 'for women' : location.pathname === "/clothing/collection" ? 'collection' : '' }</h1>
                    <div className='clothes-grid gap-8 grid grid-cols-mobileAutoFit md:grid-cols-autoFit md:pl-8 md:border-l-[1px] md:border-[#BDBDBD]'>
                        {filtered.length === 0 ? clothes.map(cloth => <Cloth {...cloth} key={cloth} cloth={cloth} />) :
                        filtered.map(cloth => <Cloth {...cloth} key={cloth} cloth={cloth} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}

const Cloth = (props) => {
    const dispatch = useDispatch()

    return (
        <div onClick={() => dispatch(add({...props.cloth, quantity: 1}))}>
            <div className='h-[4in] md:h-[4.5in] bg-[#BDBDBD] flex justify-center items-center'>
                <img className="max-w-[90%] max-h-[90%]" src={`/images/${props.image.split('/').pop()}`} alt='' />
            </div>
            <h3 className='text-center text-xl my-2'>{props.title}</h3>
            {props.sale > 0 ? 
            <>  
                <p className='text-center'><del>${props.price}</del></p>
                <p className='text-center'><strong>${props.price - (props.price * (props.sale / 100))} <strong className='text-red-500'>{`(-${props.sale}%)`}</strong></strong></p>
            </>
            : <p className='text-center font-bold'>${props.price}</p>}
        </div>
    )
}
