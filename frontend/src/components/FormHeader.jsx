import { Link } from "react-router-dom"
import { back } from '../assets/form'

export default function FormHeader() {
    return (
        <header className="flex items-center min-h-[8rem] bg-white padding-x fixed top-0 right-0 left-0">
            <Link className="font-medium flex items-center" to='/'><img className="max-h-[1em] mr-[.6em]" src={back} alt='' />Back</Link>
        </header>
    )
}