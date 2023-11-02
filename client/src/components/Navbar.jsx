import React, {useContext, useState} from 'react'
import themeContext from '../Contexts/themeContext'
import {Link} from "react-router-dom"

function Navbar() {
  const {setTheme, difficulty, setDifficulty } = useContext(themeContext);

  return (
    <nav className='w-[100%] h-14 fixed top-0 left-0 bg-[--firstColor] text-[--secondColor] flex justify-center items-center z-50 md:mr-[17px]'>
          <ul className='flex justify-center space-x-5 md:mr-[17px]'>
            <li><Link to="/">Home</Link></li>
            <li><button onClick={() => setTheme("succession")}>Succession</button></li>
            <li><button onClick={() => setTheme("dbz")}>DBZ</button></li>
            <li><button onClick={() => setTheme("onepiece")}>One Piece</button></li>              
            <li><button onClick={() => setTheme("Peaky Blinders")}>Peaky Blinders</button></li>              
          </ul>
          <form >
            <label for="difficulty" > Difficulty : </label>
            <select id='difficulty' className='bg-[--firstColor]' 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            >
              <option className="text-green-500" value="Standard">Standard</option>
              <option value="Middle">Middle</option>
              <option className="text-red-500" value="Hard">Hard</option>
            </select>
          </form>
    </nav>
  )
}

export default Navbar