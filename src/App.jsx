
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home-page/Home'
import Footer from './components/footer-sec/Footer'

function App() {


  return (
    <>
      <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Home></Home>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
