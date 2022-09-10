import { Route, Routes } from "react-router"
import PrivateRoute from "./utils/PrivateRoute"
import PublicRoute from './utils/PublicRoute'
import Home from "./pages/Home"
import Header from "./components/Header"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Clothing from "./pages/Clothing"
import CartPage from "./pages/CartPage"
import Profile from "./pages/Profile"
import Cloth from "./pages/Cloth"
import { useSelector, useDispatch } from "react-redux"
import { add } from "./reducers/cart"
import { login, logout } from "./reducers/auth"
import { useState, useEffect } from "react"
import axios from "axios"

const cartFromLocalStorage = localStorage.getItem('cart') === '[]' ? [] : JSON.parse(localStorage.getItem('cart'))
const loginFromLocalStorage = localStorage.getItem('login') === 'undefined' || localStorage.getItem('login') === '{}' ? 'undefined' : JSON.parse(localStorage.getItem('login'))

export default function App() {
  const { cart } = useSelector(state => state.cart)
  const { info } = useSelector(state => state.login)
  const { logged } = useSelector(state => state.login)
  const [api, setApi] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  useEffect(() => {
    if(logged) localStorage.setItem('login', JSON.stringify(info))
    else localStorage.setItem('login', 'undefined')
  }, [info])

  useEffect(() => {
    if(loginFromLocalStorage !== 'undefined') dispatch(login(loginFromLocalStorage))
    else dispatch(logout())
    cartFromLocalStorage.forEach(item => dispatch(add(item)))
    axios.get('/clothing/api')
      .then(res => res.data)
      .then(data => setApi(data))
      .catch(error => console.log(error.message))
  }, [])

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clothing/*' element={<Clothing />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login/*' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          {api.map(item => <Route key={item.id} path={`/clothing/${item.id}`} element={<Cloth {...item} cloth={item} />} />)}
        </Routes>
      </main>
    </>
  )
}
