import React from 'react'
import Navbar from './Navbar'

 const Layout = ({children}) => {
  return (
    <>
        <Navbar />
        <main className="main">
    {children}
    </main>
    </>
  )
}
export default Layout