import React, {useContext, useEffect, useState} from 'react'
import themeContext from '../Contexts/themeContext'
import {Link} from "react-router-dom"
import axios from 'axios';

function Navbar() {
  const {theme, setTheme, difficulty, setDifficulty } = useContext(themeContext);

  const [themeData, setThemeData] = useState([])
  const [themeList, setThemeList] = useState([])
  
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/themes/")
        setThemeData(response.data)
      } catch (error) {
        
      }
    }

    fetchThemeData()

  },[])
  

  
  useEffect(() => {
    if (themeData) {
      const names = themeData.map(theme => theme.name); // Extract names from themeData
      setThemeList(names); // Set themeList to the extracted names
    }
  }, [themeData]);
  

  return (
    <nav className='w-[100%] h-14 fixed top-0 left-0 bg-[--firstColor] text-[--secondColor] flex justify-center items-center z-50 md:mr-[17px]'>
          <div className='flex space-x-5'>

            <Link to="/" onClick={() => setTheme("Dragon Ball")}>Home</Link>         
            
            <form>
              <label for="theme" className='pr-1'>Theme :</label>
              <select id='theme' className='bg-[--firstColor] w-auto cursor-pointer' 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}>
                
              {themeList.map((themeName, index) => (
                  <option key={index} value={themeName}>
                      {themeName}
                  </option>
              ))} 

              </select>

              <label for="difficulty" className='pl-5'> Difficulté : </label>
              <select id='difficulty' className='bg-[--firstColor] w-auto cursor-pointer' 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              >
                <option className="text-green-500" value="Standard">Standard</option>
                <option value="Middle">Middle</option>
                <option className="text-red-500" value="Hard">Hard</option>
              </select>
            </form>

            <Link to="/userconnect">Se connecter</Link> 

          </div>
    </nav>
  )
}

export default Navbar