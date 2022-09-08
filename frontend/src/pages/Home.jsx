import { arrow, main, dots } from "../assets/home"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <section className="landing relative min-h-screen padding-y padding-x lg:grid lg:grid-cols-2 bg-[linear-gradient(180deg, rgba(53, 82, 220, 0.0043) -4.68%, rgba(53, 82, 220, 0.0258) 102.57%)]">
            <div className='min-h-full flex flex-col gap-8 lg:mt-[5vh] lg:gap-2'>
                <div className='h-[2px] bg-primary max-w-[20%] lg:mb-4' />
                <h1 className='text-4xl sm:leading-tight font-bold sm:text-5xl xl:leading-[1.2em] xl:text-6xl'>Explore modern<br/> fashion trends<br /> become well dressed.</h1>
                <p className='font-medium text-[#707070] lg:my-8 lg:text-xl'>Wear newest clothes and become friends with fashion</p>
                <Link to='/clothing' className="bg-primary rounded-md text-white lg:text-md py-3 px-10 font-medium mt-4 flex items-center relative max-w-[max-content]">Explore offers <img className='max-h-[.8em] ml-[1.2em]' src={arrow} alt='' /></Link>
            </div>
            <img className='mt-24 lg:mt-[5vh]' src={main} alt="clothing" />
            <img className="hidden lg:block max-h-[1.4in] absolute left-0 bottom-[1rem]" src={dots} alt="" />
        </section>
    )
}