import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {motion} from "motion/react";

function Navigation (){
  return (
      <ul className='nav-ul'>
        <li className='nav-li'><Link className='nav-link' to="/">Home</Link></li>
        <li className='nav-li'><Link className='nav-link' to="/about">About</Link></li>
        <li className='nav-li'><Link className='nav-link' to="/services">Services</Link></li>
        <li className='nav-li'><Link className='nav-link' to="/contact">Contact</Link></li>
      </ul>
  )
}

function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className=' inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40'>
      <div className='mx-auto c-space max-w-7xl'>
        <div className="flex items-center justify-between py-2 sm:py-0">
          <Link to="/" className="text-lg font-bold text-neutral-400 hover:text-white">Kisan</Link>

          <button onClick={()=>{setisOpen(!isOpen)}} className="flex cursor-pointer text-neutral-400 hover:text-white sm:hidden">
           <img src={isOpen ? "./assets/close.svg" : "./assets/menu.svg"} alt="toggle" className='w-6 h-6' />
           </button>
           <nav className='hidden sm:flex'>
            <Navigation />
           </nav>
        </div>

      </div>
        {isOpen && (<motion.div  className="block overflow-hidden text-center sm:hidden" initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{ backgroundColor: "rgba(3, 4, 18, 0.4)" }}
          transition={{ duration:  0.5, ease: "easeInOut" }}>
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>)}
    </div>
  )
}

export default Navbar