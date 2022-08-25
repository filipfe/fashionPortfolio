import { Link } from 'react-router-dom'
import { useState } from 'react'
import { cart, profile, heart, search } from '../assets/navbar'

export default function Header() {
    const [nav, setNav] = useState(false)
    const [authorized, setAuthorized] = useState(false)

    const disableNav = () => setNav(false)

    const NavLink = ({ children, path }) => <Link to={path} onClick={disableNav}>{children}</Link>

    return (
        <header className='flex justify-between items-center min-h-[5rem] padding-x shadow-md fixed top-0 right-0 left-0 z-10'>
            <div className='logo font-medium'>
                <Link to='/' onClick={disableNav}>fashionPortfolio.</Link>
            </div>
            <div className={`navbar flex gap-8 absolute top-0 left-[100%] h-screen w-screen bg-white items-center flex-col opacity-0 justify-center ${nav ? '-translate-x-full opacity-100' : ''} transition duration-500`}>
                <NavLink path='/clothing'>WOMEN</NavLink>
                <NavLink path='/clothing'>MEN</NavLink>
                <NavLink path='/contact'>COLLECTION</NavLink>
                <NavLink path='/contact'>TRENDING</NavLink>
                <NavLink path='/contact'>NEW</NavLink>
                <NavLink path='/contact'>CONTACT US</NavLink>
                <div className='flex items-center gap-8 mt-4'>
                    <NavLink path='/search'><img src={search} alt='search' /></NavLink>
                    <NavLink path='/favourite'><img src={heart} alt='favourite' /></NavLink>
                    <NavLink path={authorized ? '/profile' : '/login'}><img src={profile} alt='profile' /></NavLink>
                    <NavLink path='/cart'><img src={cart} alt='cart' /></NavLink>
                </div>
            </div>
            <div className='burger flex flex-col relative h-6 w-8 justify-between cursor-pointer' onClick={() => setNav(prev => !prev)}>
                <div style={nav ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(45deg)'} : {}} className={lineStyle}></div>
                <div style={nav ? {display: 'none'} : {}} className={lineStyle}></div>
                <div style={nav ? {position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(-45deg)'} : {}} className={lineStyle}></div>
            </div>
        </header>
    )
}

const lineStyle = 'h-[2px] w-full bg-black transition-transform'