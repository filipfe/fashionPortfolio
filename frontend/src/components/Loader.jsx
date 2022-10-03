import loader from '../assets/loader.svg'

export default function Loader() {
    return (
        <div className="absolute animate-spin right-[45%] top-[55%]">
            <img className='w-16' src={loader} alt="Loading..." />
        </div>
    )
}