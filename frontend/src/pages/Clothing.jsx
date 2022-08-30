import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import axios from 'axios'

export default function Clothing() {
    const [clothes, setClothes] = useState([])
    const location = useLocation()

    useEffect(() => {
        let lastPath = location.pathname.split('/').pop()
        axios.get('/clothing/api')
            .then(res => console.log(res.data))
            .then(data => lastPath === 'trending' ? data.filter(cloth => cloth.trending) : lastPath === 'new' ? data.filter(cloth => cloth.new) : data.filter(cloth => cloth.sex === lastPath))
            .then(clothes => setClothes(clothes))
            .catch(error => console.log([error.message]))
    }, [location]) 

    return (
        <section className="padding-x padding-y">
            <h1 className="font-bold text-2xl">Our {location.pathname === '/clothing/new' ? 'new ' : location.pathname === '/clothing/trending' ? 'trending ' : ''}clothing {location.pathname === "/clothing/men" ? 'for men' : location.pathname === "/clothing/women" ? 'for women' : location.pathname === "/clothing/collection" ? 'collection' : '' }</h1>
            <div className='clothes-wrapper'>
                <div className='clothes-grid grid'>
                    {clothes.map(cloth => <Cloth {...cloth} key={cloth} />)}
                </div>
            </div>
        </section>
    )
}

const Cloth = (props) => {
    return (
        <div>
            <div className='h-[4in]'>
                <img className="max-w-[90%] max-h-[90%]" src='' alt='' />
            </div>
            <h3>{props.title}</h3>
            {props.sale ? <p><s>{props.price}</s></p> : <p>{props.price}</p>}
            {props.sale ? <p>{props.price * (props.sale / 100)}<strong className='text-red'>{`(-${props.sale}%)`}</strong></p> : {}}
        </div>
    )
}