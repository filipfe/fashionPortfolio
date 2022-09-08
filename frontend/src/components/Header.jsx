import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { cartImg, profile, heart, searchImg } from '../assets/navbar'
import { useSelector } from 'react-redux/es/exports'

const pages = [
    'Women',
    'Men',
    'Collection',
    'Trending',
    'New'
]

export default function Header() {
    const [nav, setNav] = useState(false)
    const [authorized, setAuthorized] = useState(false)
    const login = useSelector(state => state.login.value)
    const { cart } = useSelector(state => state.cart)
    const location = useLocation()
    const [quantity, setQuantity] = useState(0)

    const disableNav = () => setNav(false)

    const NavLink = ({ children, path }) => {
        const activePath = useResolvedPath(path)
        const isActive = useMatch({ path: `${activePath.pathname}/*`, end: true })
        return <Link className={isActive ? 'text-primary font-bold lg:text-sm' : 'hover:text-primary lg:text-sm lg:font-medium'} to={path} onClick={disableNav}>{children}</Link>
    }

    useEffect(() => {
        let q = 0;
        cart.forEach(item => q += item.quantity)
        setQuantity(q)
    }, [cart])


    return (
        <header className={`flex justify-between items-center min-h-[5rem] lg:min-h-[6rem] bg-white padding-x shadow-sm fixed top-0 right-0 left-0 ${location.pathname.split('/').pop() === "login" || location.pathname.split('/').pop() === "signup" || location.pathname.split('/').pop() === "contact" ? 'hidden' : 'z-10'}`}>
            <div className='logo font-medium'>
                <Link className='font-bold' to='/' onClick={disableNav}><span className='text-primary'>Fashionist</span>Icons</Link>
            </div>
            <nav className={`navbar flex gap-6 absolute top-0 left-[100%] xl:gap-10 lg:relative lg:justify-end lg:flex-row lg:h-auto lg:left-auto lg:transform-none lg:opacity-100 h-screen w-screen bg-white items-center flex-col opacity-0 justify-center ${nav ? '-translate-x-full opacity-100' : ''} transition duration-500`}>
                {pages.map(page => <NavLink key={page} path={`/clothing/${page.toLowerCase()}`}>{page}</NavLink>)}
                <NavLink path='/contact'>Contact us</NavLink>
                <div className='flex items-center gap-4 my-4 lg:my-0 2xl:gap-8 2xl:ml-[2vw] relative'>
                    {/* <NavLink path='/profile/favourite'><img src={heart} alt='favourite' /></NavLink>
                    <NavLink path='/profile'><img src={profile} alt='profile' /></NavLink> */}
                    <NavLink path='/cart'>
                        <img src={cartImg} alt="cart" />
                        {quantity > 0 ? <div className='rounded-[50%] flex justify-center items-center bg-primary absolute h-[1.2rem] w-[1.2rem] text-sm bottom-[-4px] right-[-4px] text-white'>{quantity}</div> : <></>}
                    </NavLink>
                </div>
                <div className='login flex flex-col gap-4 items-center lg:flex-row'>
                    <Link className='border-primary rounded-md border-[1px] text-sm py-3 px-6 text-primary font-bold min-w-[max-content]' to='/login'>Log In</Link>
                    <Link className='bg-primary rounded-md py-3 px-6 text-sm text-white font-bold min-w-[max-content]' to='/signup'>Create Account</Link>
                </div>
            </nav>
            <div className='burger flex flex-col relative lg:hidden h-5 w-7 justify-between cursor-pointer' onClick={() => setNav(prev => !prev)}>
                <div style={nav ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(45deg)'} : {}} className={lineStyle}></div>
                <div style={nav ? {display: 'none'} : {}} className={lineStyle}></div>
                <div style={nav ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(-45deg)'} : {}} className={lineStyle}></div>
            </div>
        </header>
    )
}

const lineStyle = 'h-[2px] w-full bg-black transition-transform'

