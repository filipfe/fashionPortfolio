import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { cartImg, profile, heart, search } from '../assets/navbar'
import { useSelector } from 'react-redux/es/exports'

const pages = [
    'Women',
    'Men',
    'Collection',
    'Trending',
    'New'
]

const ui = [
    heart,
    profile
]

export default function Header() {
    const [nav, setNav] = useState(false)
    const [authorized, setAuthorized] = useState(false)
    const login = useSelector(state => state.login.value)
    const { cart } = useSelector(state => state.cart)
    const [quantity, setQuantity] = useState(0)

    const disableNav = () => setNav(false)

    const NavLink = ({ children, path }) => <Link to={path} onClick={disableNav}>{children}</Link>

    useEffect(() => {
        setAuthorized(login)
    }, [login])

    useEffect(() => {
        setQuantity(cart.length)
    }, [cart])

    return (
        <header className='flex justify-between items-center min-h-[5rem] bg-white padding-x shadow-md sticky top-0 w-full z-10'>
            <div className='logo font-medium'>
                <Link to='/' onClick={disableNav}>fashionPortfolio.</Link>
            </div>
            <div className={`navbar flex gap-8 absolute top-0 left-[100%] lg:relative lg:justify-end lg:flex-row lg:h-auto lg:left-auto lg:transform-none lg:opacity-100 h-screen w-screen bg-white items-center flex-col opacity-0 justify-center ${nav ? '-translate-x-full opacity-100' : ''} transition duration-500`}>
                {pages.map(page => <NavLink key={page} path={`/clothing/${page.toLowerCase()}`}>{page}</NavLink>)}
                <NavLink path='/contact'>Contact us</NavLink>
                <div className='flex items-center gap-4 mt-4 lg:mt-0 lg:gap-8 lg:ml-[8vw]'>
                    <div><img src={search} alt='search' /></div>
                    {ui.map(i => <NavLink key={i} path={authorized ? '/profile' : '/login'}><img src={i} alt='profile' /></NavLink>)}
                    <NavLink path='/cart' className='relative'>
                        <img src={cartImg} alt="cart" />
                        {quantity > 0 ? <div className='rounded-[50%] flex justify-center items-center bg-darkPrimary absolute h-[1.2rem] w-[1.2rem] text-sm bottom-[-4px] right-[-4px] text-white'>{quantity}</div> : <></>}
                    </NavLink>
                </div>
            </div>
            <div className='burger flex flex-col relative lg:hidden h-5 w-7 justify-between cursor-pointer' onClick={() => setNav(prev => !prev)}>
                <div style={nav ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(45deg)'} : {}} className={lineStyle}></div>
                <div style={nav ? {display: 'none'} : {}} className={lineStyle}></div>
                <div style={nav ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(-45deg)'} : {}} className={lineStyle}></div>
            </div>
        </header>
    )
}

const lineStyle = 'h-[2px] w-full bg-black transition-transform'