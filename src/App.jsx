
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home-page/Home'

function App() {


  return (
    <>
      <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Home></Home>
      </div>
    </>
  )
}

export default App
