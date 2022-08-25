import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
    const [nav, setNav] = useState(false)

    return (
        <header className='flex justify-between items-center min-h-[5rem] padding-x shadow-md fixed top-0 right-0 left-0 z-10'>
            <div className='logo'>
                <Link to='/' onClick={() => setNav(false)}>fashionPortfolio.</Link>
            </div>
            <div className={`flex gap-8 absolute top-0 right-0 h-screen left-0 bg-white items-center flex-col justify-center ${!nav ? 'translate-x-full' : ''} transition duration-500`}>
                <Link to='/clothing' onClick={() => setNav(false)}>WOMEN</Link>
                <Link to='/clothing' onClick={() => setNav(false)}>MEN</Link>
                <Link to='/contact' onClick={() => setNav(false)}>COLLECTION</Link>
                <Link to='/contact' onClick={() => setNav(false)}>TRENDING</Link>
                <Link to='/contact' onClick={() => setNav(false)}>NEW</Link>
                <Link to='/contact' onClick={() => setNav(false)}>CONTACT US</Link>
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