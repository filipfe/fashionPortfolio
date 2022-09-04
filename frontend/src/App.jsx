import { Route, Routes } from "react-router"
import PrivateRoute from "./utils/PrivateRoute"
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
import { useState, useEffect } from "react"
import axios from "axios"

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))

export default function App() {
  const { cart } = useSelector(state => state.cart)
  const [api, setApi] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  useEffect(() => {
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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />\
          <Route path='/profile/*' element={<PrivateRoute><Profile /></PrivateRoute>} />
          {api.map(item => <Route key={item.id} path={`/clothing/${item.id}`} element={<Cloth {...item} cloth={item} />} />)}
        </Routes>
      </main>
    </>
  )
}
