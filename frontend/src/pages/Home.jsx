import { arrow, woman } from "../assets/home"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <section className="landing relative min-h-screen padding-y padding-x lg:grid lg:grid-cols-2">
            <div className='min-h-full flex flex-col lg:mt-[5rem]'>
                <div className='h-[2px] bg-black max-w-[20%] lg:max-w-[10%]' />
                <h1 className='flex flex-col pt-8 gap-[.8em]'>
                    <span className='font-medium text-3xl lg:text-4xl'>Feel trendy. </span>
                    <span className="font-bold text-[2.5rem] lg:text-6xl leading-10">Feel authentic.</span>
                </h1>
                <p className='my-4 font-medium lg:my-8 lg:text-xl'>Wear newest clothes and become friends with fashion</p>
                <Link to='/login' className="bg-primary lg:text-xl lg:py-3 lg:px-8 py-2 px-6 font-semibold mt-4 relative max-w-[12rem] lg:max-w-[2.5in]">Make it happen<div className="bg-black absolute right-0 top-0 bottom-0 w-10 translate-x-full flex items-center justify-center"><img className="max-w-[50%]" src={arrow} alt="" /></div></Link>
            </div>
            <img className="max-h-[50%] absolute bottom-0 right-0 mt-[6in] lg:max-w-[60%] lg:max-h-[100%]" src={woman} alt='Woman buying' />
        </section>
    )
}