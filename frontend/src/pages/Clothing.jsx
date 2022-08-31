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

    const AsideFilter = () => {
        return (
            <aside className="pt-[3rem] md:pt-[1in] flex justify-center">
                <nav>
                    <ul className="flex flex-col gap-4">
                        {filters.map(filter => <li onClick={() => setFiltered(prev => prev.filter(cloth => cloth.type === filter))}>{filter}</li>)}
                    </ul>
                </nav>
            </aside>
        )
    }

    return (
        <section className="padding-x padding-y">
            <div className='grid-cols-clothes grid'>
                <AsideFilter />
                <div className='clothes-wrapper pl-10'>
                    <h1 className="font-bold text-2xl mb-8 lg:text-3xl">Our {location.pathname === '/clothing/new' ? 'new ' : location.pathname === '/clothing/trending' ? 'trending ' : ''}clothing {location.pathname === "/clothing/men" ? 'for men' : location.pathname === "/clothing/women" ? 'for women' : location.pathname === "/clothing/collection" ? 'collection' : '' }</h1>
                    <div className='clothes-grid grid md:grid-cols-autoFit gap-8 border-l-[1px] border-black'>
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
        <div onClick={() => dispatch(add(props.cloth))}>
            <div className='h-[4in] bg-[#BDBDBD]'>
                <img className="max-w-[90%] max-h-[90%]" src={props.image} alt='' />
            </div>
            <h3 className='text-center my-2'>{props.title}</h3>
            {props.sale > 0 ? 
            <>  
                <p className='text-center'><del>${props.price}</del></p>
                <p className='text-center'>${props.price - (props.price * (props.sale / 100))} <strong className='text-red'>{`(-${props.sale}%)`}</strong></p>
            </>
            : <p className='text-center font-bold'>${props.price}</p>}
        </div>
    )
}
