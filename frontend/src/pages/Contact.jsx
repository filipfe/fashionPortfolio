import { inputStyles } from "./Signup"
import contact from '../assets/contact.png'
import FormHeader from "../components/FormHeader"

export default function Contact() {
    return (
        <section className='padding-x padding-y flex items-center h-screen justify-center lg:justify-start lg:grid lg:grid-cols-2'>
            <div className='flex flex-col gap-6 min-w-[50%] lg:max-w-[70%] relative'>
                <FormHeader />
                <h2 className="text-6xl font-bold">Contact us</h2>
                <p className="font-medium text-xl text-[#707070]">Fill the form in order to send a message.</p>
                <Form />
            </div>
            <img className="hidden lg:block max-w-[50%] object-cover absolute top-0 bottom-0 right-0 h-screen" src={contact} alt='fashionable woman' />
        </section>
    )
}

function Form() {
    return (
        <form className='flex flex-col gap-6 my-4 xl:mt-6'>
            <input className={inputStyles} required type='email' name='email' placeholder="Email" />
            <input className={inputStyles} required type='tel' name='phone' placeholder="Phone Number" />
            <textarea className={`${inputStyles} resize-y min-h-[4rem]`} required placeholder="Message" />
            <button type="submit" className='w-full bg-primary text-white mt-6 rounded-md lg:max-w-[max-content] px-10 py-3 font-medium'>Send message</button>
        </form> 
    ) 
}