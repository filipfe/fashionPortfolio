import Cart from '../components/Cart'

export default function CartPage() {
    return (
        <section className="padding-y padding-x lg:flex lg:items-center lg:flex-col">
            <h2 className="font-bold text-2xl lg:text-3xl mb-4">Your cart</h2>
            <Cart />
        </section>
    )
}