import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import sale from '../assets/sale.svg'
import arrow from '../assets/arrow-down.svg'
import clear from '../assets/x.svg'
import Loader from "../components/Loader"

const filters = [
    'Jackets',
    'Shoes',
    'Tshirts',
    'Hoodies',
    'Trousers'
]

const sorts = {
    price: ['Ascending', 'Descending']
}

export default function Clothing() {
    const [clothes, setClothes] = useState([])
    const [sort, setSort] = useState({
        price: ''
    })
    const [filtered, setFiltered] = useState({
        filter: '',
        clothes: []
    })

    const location = useLocation()

    // sorting logic

    useEffect(() => {
        if(sort.price === 'Ascending') filtered.clothes.length === 0 ? setFiltered({...filtered, clothes: clothes.sort((a, b) => a.price - b.price)}) : setFiltered({...filtered, clothes: filtered.clothes.sort((a, b) => a.price - b.price)})
        if(sort.price === 'Descending') filtered.clothes.length === 0 ? setFiltered({...filtered, clothes: clothes.sort((a, b) => b.price - a.price)}) : setFiltered({...filtered, clothes: filtered.clothes.sort((a, b) => b.price - a.price)})
    }, [sort])

    // fetching api

    useEffect(() => {
        setFiltered({clothes: [], filter: ''})
        let lastPath = location.pathname.split('/').pop()
        axios.get('/clothing/api')
            .then(res => res.data)
            .then(data => lastPath === 'trending' ? data.filter(cloth => cloth.trending) : lastPath === 'new' ? data.filter(cloth => cloth.new) : lastPath === 'collection' ? data.filter(cloth => cloth.collection) : lastPath !== 'clothing' ? data.filter(cloth => cloth.sex === lastPath) : data)
            .then(data => setClothes(data))
            .catch(error => console.log(error.message))
    }, [location])

    // filter

    const AsideFilter = () => {
        return (
            <aside className="hidden md:block">
                <h2 className="text-3xl font-bold mb-8">Filters</h2>
                <nav className="flex flex-col gap-4 mb-8">
                    {filters.map(filter => <a className={`${filtered.filter === filter ? 'text-primary font-bold' : 'hover:text-primary'} cursor-pointer`} key={filter} onClick={() => setFiltered({filter: filter, clothes: clothes.filter(cloth => cloth.type === filter.toLowerCase())})}>{filter}</a>)}
                </nav>
                <a className="text-primary cursor-pointer font-medium flex items-center" onClick={() => setFiltered({clothes: [], filter: ''})}><img className="max-h-[1em] mr-2" src={clear} alt='x' />Clear</a>
            </aside>
        )
    }

    // sorter

    const Sort = () => {
        const [active, setActive] = useState(false)
        const Arrow = () => <img className={`${active ? 'rotate-90' : ''} transition-all ml-2`} src={arrow} alt="" />
        return ( 
            <div className="relative">
                <h3 className="font-bold cursor-pointer flex items-center" onClick={() => setActive(prev => !prev)}>Sort by <Arrow /></h3>
                {active ? <div className='absolute left-0 lg:left-auto lg:right-0 mt-2 rounded p-4 flex flex-col bg-white gap-4 border-[1px] border-[#E6E6E6]'>
                    <h4 className="font-bold">Price</h4>
                    <ul className="text-[#8B8B8B] flex flex-col font-medium gap-1">
                        {sorts.price.map(price => <li className={`cursor-pointer ${sort.price === price ? 'text-primary font-bold' : 'hover:text-primary'}`} onClick={() => setSort({...sort, price: price})}>{price}</li>)}
                    </ul>
                </div> : <></>}
            </div>
        )
    }

    return (
        <section className="padding-x padding-y">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-0 relative z-10">
                <h1 className="font-bold text-4xl lg:text-5xl first-letter:capitalize">{location.pathname.split("/").pop()}</h1>
                <SearchBar />
                <Sort />
            </div>
            <div className='md:grid-cols-clothes md:grid mt-8 md:mt-20'>
                <AsideFilter />
                <div className='clothes-grid flex flex-col gap-8 md:grid grid-cols-mobileAutoFit md:grid-cols-autoFit md:pl-8 md:border-l-[1px] md:border-[#BDBDBD]'>
                    {clothes.length === 0 || filtered.clothes === 0 ?  <Loader /> : <></>}
                    {filtered.clothes.length === 0 ? clothes.map(cloth => <Cloth {...cloth} key={cloth} cloth={cloth} />) :
                    filtered.clothes.map(cloth => <Cloth {...cloth} key={cloth} cloth={cloth} />)}
                </div>
            </div>
        </section>
    )
}

const Cloth = (props) => {
    return (
        <Link className='block relative no-underline' to={`/clothing/${props.id}`}>
            {props.sale ? <img className="absolute max-w-[3rem] left-3 top-3" src={sale} alt="sale" /> : <></> }
            <div className='h-[4in] md:h-[4.5in] bg-[#F2F2F2] flex justify-center items-center'>
                <img className="max-w-[90%] max-h-[90%]" src={`/images/${props.image.split('/').pop()}`} alt='' />
            </div>
            <h3 className='text-center text-xl my-2'>{props.title}</h3>
            {props.sale > 0 ? 
            <>  
                <p className='text-center'><del>${props.price}</del></p>
                <p className='text-center'><strong>${props.price - (props.price * (props.sale / 100))} <strong className='text-red-500'>{`(-${props.sale}%)`}</strong></strong></p>
            </>
            : <p className='text-center font-bold'>${props.price}</p>}
        </Link>
    )
}