import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Clothing from "./pages/Clothing"
import CartPage from "./pages/CartPage"

function App() {
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
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
    </>
  )
}

export default App
