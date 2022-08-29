import { useLocation } from "react-router"

export default function Clothing({ type }) {
    const location = useLocation()


    return (
        <section className="padding-x padding-y">
            <h1 className="font-bold text-2xl">Our {location.pathname === '/clothing/new' ? 'new ' : location.pathname === '/clothing/trending' ? 'trending ' : ''}clothing {location.pathname === "/clothing/men" ? 'for men' : location.pathname === "/clothing/women" ? 'for women' : location.pathname === "/clothing/collection" ? 'collection' : '' }</h1>
            <div className='clothes-wrapper'>
                <div className='clothes-grid'>

                </div>
            </div>
        </section>
    )
}