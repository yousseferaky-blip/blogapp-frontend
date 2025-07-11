import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Footer from '../Component/Footer/Footer'
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
     <>
        <Navbar />
          <Outlet />
        <Footer />
    </>
  )
}

export default Layout