import React, {useContext} from 'react'
import themeContext from '../Contexts/themeContext'
import {Link} from "react-router-dom"

function Navbar() {
  const {theme, setTheme } = useContext(themeContext);

  console.log("theme dans navbar :", theme)

  return (
    <nav className='w-[100%] h-14 fixed top-0 left-0 bg-[--firstColor] text-[--secondColor] flex justify-center items-center z-50 md:mr-[17px]'>
          <ul className='flex justify-center space-x-5 md:mr-[17px]'>
            <li><Link to="/">Home</Link></li>
            <li><button onClick={() => setTheme("succession")}>Succession</button></li>
            <li><button onClick={() => setTheme("dbz")}>DBZ</button></li>
            <li><button onClick={() => setTheme("onepiece")}>One Piece</button></li>
            <li><button onClick={() => setTheme("cities")}>Cities</button></li>                 
          </ul>
    </nav>
  )
}

export default Navbar