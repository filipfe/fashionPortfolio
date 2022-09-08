import { useState, useRef, useEffect } from "react"
import x from '../assets/x.svg'
import { Link } from "react-router-dom"
import axios from "axios"

export default function SearchBar() {
    const input = useRef()
    const [search, setSearch] = useState({
        active: false,
        items: [],
        filtered: [],
        input: ''
    })

    useEffect(() => {
        if(search.active) {
            input.current.focus()
            axios.get('/clothing/api')
                .then(res => res.data)
                .then(items => setSearch({...search, items: items, filtered: items, input: ''}))
        }
    }, [search.active])

    const handleInput = e => {
        let filter = search.items.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearch({...search, filtered: filter, input: e.target.value})
    }

    return (
        <>
            <div className="relative max-w-[max-content]">
                <input ref={input} value={search.input} onChange={handleInput} style={{backgroundPosition: '1.5rem center', backgroundSize: '1em'}} className='relative font-medium placeholder:font-normal w-full lg:w-auto border-[1px] bg-search bg-no-repeat border-[#E6E6E6] px-16 py-2 pr-[6vw] rounded-md' type='text' placeholder='Search for clothes' />
                {search.input.split("").length > 0 ? <img onClick={() => setSearch({...search, input: ''})} className="absolute cursor-pointer right-[1.5rem] translate-y-[50%] bottom-[50%] max-h-[1em]" src={x} alt="" /> : <></>}
            </div>
            {search.active ? <div className='absolute right-0 left-0 mt-2 flex flex-col max-h-[6rem] overflow-auto'>
                {search.filtered.map(cloth => <SearchItem key={cloth} {...cloth} cloth={cloth} />)}
            </div> : <></> }
        </>
    )
}

const SearchItem = props => {
    return (
        <Link to={`/clothing/${props.id}`} className='cursor-pointer p-2 flex gap-2 bg-white'>
            <div className='h-[2rem] w-[2rem] bg-[#BDBDBD]'>
                <img className="max-w-[2rem] max-h-[2rem]" src={props.image} alt='' />
            </div>
            <h3>{props.title}</h3>
            {props.sale ? <strong>${props.sale ? props.price - (props.price * (props.sale / 100)) : props.price} <span className="text-red-500">{`-(${props.sale}%)`}</span></strong> : <strong>${props.price}</strong>}
        </Link>
    )
}