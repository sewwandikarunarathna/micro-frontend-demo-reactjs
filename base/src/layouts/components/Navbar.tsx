import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
       <nav className="flex flex-row w-full h-14 justify-between items-center z-50 px-5 py-2 mb-4 bg-gray-200 gap-4 fixed top-0">
            <Link to="/">Welcome</Link>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/authLogin">Login</Link>
            <Link to="/table">Table Features</Link>
            <Link to="/userTable">Users Table</Link>
            <Link to="/rowActionsTable">Row Actions Table</Link>
            <Link to="/logout">Logout</Link> 
          </nav>
    </div>
  )
}

export default Navbar
