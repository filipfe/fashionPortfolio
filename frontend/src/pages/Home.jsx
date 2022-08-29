import { arrow } from "../assets/home"

export default function Home() {
    return (
        <section className="landing h-screen relative">
            <div className='padding-y padding-x min-h-full'>
                <div className='h-[2px] bg-black max-w-[20%]' />
                <h1 className='flex flex-col pt-8 gap-[.8em]'>
                    <span className='font-medium text-3xl'>Feel trendy. </span>
                    <span className="font-bold text-[2.5rem] leading-10">Feel authentic.</span>
                </h1>
                <p className='my-4 font-medium'>Wear newest clothes and become friends with fashion</p>
                <button className="bg-primary py-2 px-6 font-semibold mt-4 relative">Make it happen<div className="bg-black absolute right-0 top-0 bottom-0 w-10 translate-x-full flex items-center justify-center"><img className="max-w-[50%]" src={arrow} alt="" /></div></button>
            </div>
        </section>
    )
}