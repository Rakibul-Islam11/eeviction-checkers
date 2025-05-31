import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer-sec/Footer'
import ScrollToTop from './components/scroll-to-top/ScrollToTop'

function App() {
  return (
    <>
      <div>
        <ScrollToTop></ScrollToTop>
          <Navbar />
          <Outlet />
          <Footer />
        
        
      </div>
    </>
  )
}

export default App
