import { useSelector } from "react-redux"

export default function Profile() {
    const { info } = useSelector(state => state.login)

    return (
        <section className="padding-y padding-x">
            <h1 className="text-4xl font-bold">Hi <span className="text-primary">{info.last_name}</span></h1>
        </section>
    )
}