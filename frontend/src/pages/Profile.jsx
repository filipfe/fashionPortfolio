import { useSelector, useDispatch } from "react-redux"
import { logout } from "../reducers/auth"
import axios from "axios"
import sale from '../assets/sale.svg'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Profile() {
    const { info } = useSelector(state => state.login)
    const { refresh } = useSelector(state => state.login.tokens)
    const ID = info.id
    const dispatch = useDispatch()
    const [saved, setSaved] = useState([])

    const handleLogout = async () => {
        console.log(refresh)
        const resp = await axios.post('/api/logout', refresh, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(err => console.log(err))
        if(resp.status === 200) return dispatch(logout())
    }

    useEffect(() => {
        setSaved([])
        axios.post('/api/favourites/id', JSON.stringify({user_id: ID}), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.data)
        .then(data => data.map(save => save.clothing_id))
        .then(arr =>
            axios.get('/clothing/api')
                .then(res => res.data)
                .then(data => arr.forEach(id => setSaved(prev => [...prev, data.find(cloth => cloth.id === id)])))
        )
    }, [])

    return (
        <section className="padding-y padding-x">
            <h1 className="text-4xl font-bold mb-16">Hi <span className="text-primary">{info.first_name}</span></h1>
            <h2 className="font-bold text-6xl mb-8">Saved</h2>
            <div className='flex flex-col gap-6 md:flex-row'>
                {saved.length > 0 ? saved.map(cloth => <Cloth {...cloth} key={cloth} />) : <p>Nothing's there! Go ahead and <Link className='text-primary font-bold' to='/clothing'>choose some clothing.</Link></p>}
            </div>
            <button onClick={handleLogout} className='text-md text-white bg-red-500 font-bold py-3 px-6 rounded mt-16'>Log Out</button>
        </section>
    )
}

const Cloth = props => {
    return (
        <Link className='block relative no-underline' to={`/clothing/${props.id}`}>
            {props.sale ? <img className="absolute max-w-[3rem] left-3 top-3" src={sale} alt="sale" /> : <></> }
            <div className='h-[4in] md:h-[4.5in] bg-[#F2F2F2] flex justify-center items-center'>
                <img className="max-w-[90%] max-h-[90%]" src={`/images/${props.image.split('/').pop()}`} alt='' />
            </div>
            <h3 className='text-center text-xl my-2'>{props.title}</h3>
        </Link>
    )
}