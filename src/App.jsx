import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import Contact from "./pages/Contact"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
