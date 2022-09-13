
const links = [
    'Details',
    'Payment',
    'Summary'
]

export default function ShippingNav({active}) {
    return (
        <div className='flex justify-between items-end sm:justify-start sm:gap-8'>
            {links.map(link => <h2 className={`after:block after:rounded after:mt-2 after:h-1 after:w-[60%] ${active === link ? 'text-4xl sm:text-6xl font-bold after:bg-primary' : 'text-xl sm:text-2xl text-[#989898] font-medium after:bg-[#F0F0F0]'}`} key={link}>{link}</h2>)}
        </div>
    )
}