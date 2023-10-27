import React, {useContext} from 'react'
import themeContext from '../Contexts/themeContext'

function Navbar() {
  const {theme, setTheme } = useContext(themeContext);

  console.log("theme dans navbar :", theme)

  return (
    <nav className='w-full h-14 fixed top-0 bg-[--firstColor] text-[--secondColor] flex justify-center items-center z-50'>
          <ul className='flex justify-center w-full space-x-5'>
            <li><button onClick={() => setTheme("succession")}>Succession</button></li>
            <li><button onClick={() => setTheme("dbz")}>DBZ</button></li>
            <li><button onClick={() => setTheme("movies")}>Movies</button></li>
            <li><button onClick={() => setTheme("cities")}>Cities</button></li>                 
          </ul>
    </nav>
  )
}

export default Navbar