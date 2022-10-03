import { arrow, main, dots } from "../assets/home"
import { Link } from "react-router-dom"
import buttonStyles from "../utils/buttonStyles"

export default function Home() {
    return (
        <section className="landing relative min-h-screen padding-y padding-x lg:grid lg:gap-4 lg:grid-cols-2 bg-[linear-gradient(180deg, rgba(53, 82, 220, 0.0043) -4.68%, rgba(53, 82, 220, 0.0258) 102.57%)]">
            <div className='min-h-full flex flex-col gap-4 lg:gap-2 lg:mt-[5vh]'>
                <span className="text-primary tracking-wider font-medium text-sm lg:text-lg">FIND YOUR OWN STYLE</span>
                <h1 className='text-4xl sm:leading-tight font-extrabold sm:text-5xl xl:leading-[1.2em] xl:text-6xl'>Explore modern<br/> fashion trends<br /> just for you.</h1>
                <p className='font-medium text-[#707070] lg:py-4 lg:max-w-[5in] lg:text-md leading-loose'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id turpis posuere pulvinar eget pellentesque.</p>
                <div className="flex flex-wrap items-center mt-4 gap-8">
                    <Link to='/clothing' className={`${buttonStyles} flex items-center text-sm max-w-max`}>Explore offers <img className='max-h-[.8em] ml-[1.2em]' src={arrow} alt='' /></Link>
                    <Link to='/signup' className="text-primary font-medium text-sm">Create account</Link>
                </div>
            </div>
            <img className='main-image lg:left-auto mt-24 lg:mt-[5vh] absolute lg:max-w-[52vw] right-0 self-center' src={main} alt="clothing" />
            <img className="hidden lg:block max-h-[1.4in] absolute left-0 bottom-[1rem]" src={dots} alt="" />
        </section>
    )
}