import React, {useContext, useEffect, useState} from 'react'
import themeContext from '../Contexts/themeContext'
import {Link, useNavigate} from "react-router-dom"
import AuthContext from '../Contexts/auth/AuthProvider';
import { useCookies } from "react-cookie";
import { FaHome } from "react-icons/fa";

function Navbar() {
  const {theme, setTheme, difficulty, setDifficulty, themeCatalog, updateThemes} = useContext(themeContext);
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"])
  const {auth, setAuth} = useContext(AuthContext)
  const [displayNav, setDisplayNav] = useState(false)

  useEffect(() => {
    updateThemes()
  },[auth])

  const activeRightNav = (e) => {
    e.preventDefault()
    setDisplayNav(!displayNav)
  }

  const navigate = useNavigate()

    useEffect(() => {
      const checkLocalStorage = () => {
        const storedToken = window.localStorage.getItem("access_token");
        const storedUserID = window.localStorage.getItem("userID");
        const storedRole = window.localStorage.getItem("role");
        const storedUsername = window.localStorage.getItem("username");
        const expirationDate = window.localStorage.getItem("expirationDate");

        if (storedToken && storedUserID && storedRole && storedUsername && expirationDate) {
          const currentDateTime = new Date();
          const storedExpirationDate = new Date(expirationDate);

          if (currentDateTime < storedExpirationDate) {
            setAuth({ userID: storedUserID, role: storedRole, token: storedToken, username: storedUsername, expirationDate: expirationDate });
          } else {
            // Clear localStorage if the token has expired
            window.localStorage.removeItem("access_token");
            window.localStorage.removeItem("userID");
            window.localStorage.removeItem("role");
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("expirationDate");
            setAuth({})
          }
        }
      };

      checkLocalStorage();
    }, [cookies]);

const handleClickHome =  (e) => {
  e.preventDefault()
  setTheme("House of the Dragons")
  updateThemes()
  navigate("/")
}



  const handleLogout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("expirationDate");
    navigate("/")
    setAuth({});
  };


  return (
    <>
    <nav className='w-[100%] h-14 fixed bottom-0 md:top-0 left-0 bg-[--firstColor] text-[--secondColor] flex justify-center items-center z-50 md:text-xl'>
      {/* desktop mode */}
          <div className='hidden md:flex md:space-x-10'>

            <button type="button" onClick={handleClickHome} className='border-b-2 border-[--firstColor] hover:border-[--fourthColor]'>Jouer</button>         
            
            <form className='flex space-x-10'>
              <div className='space-x-5'>
                <label for="theme" >Theme :</label>
                <select id='theme' className='bg-[--fourthColor] w-auto cursor-pointer rounded-md text-[--firstColor] font-semibold' 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}>
                  
                {themeCatalog.map((themeName, index) => (
                    <option key={index} value={themeName} className=''>
                        {themeName}
                    </option>
                ))} 

                </select>
              </div>
              <div className='space-x-5'>
                <label for="difficulty" > Difficulté : </label>
                <select id='difficulty' className='bg-[--fourthColor] w-auto cursor-pointer rounded-md text-[--firstColor] font-semibold' 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="Facile">Facile</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Difficile">Difficile</option>
                </select>
              </div>

            </form>

            
           {auth.userID ?
            (
              <ul className='flex space-x-5'>
                <li className='border-b-2 border-[--firstColor] hover:border-[--fourthColor]'><Link to="/dashboard">Dashboard</Link> </li>                        
                <li><button type='button' className='border-b-2 border-[--firstColor] hover:border-[--fourthColor]' onClick={handleLogout}>Déconnecter <span className='text-[--fourthColor] font-semibold'>{auth.username}</span></button> </li>
              </ul>             
            
            ) : (
              <Link to="/userconnect" className='border-b-2 border-[--firstColor] hover:border-[--fourthColor]'>Se connecter</Link> 
            )
            } 
            

          </div>
          {/* mobile mode */}

          <div className="drawer drawer-end md:hidden">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className='flex justify-center'><FaHome className='text-[--fourthColor] text-5xl'/></label>
            </div> 
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-xl">
                {/* Sidebar content here */}
                <li><button type="button" onClick={handleClickHome} className='border-b-2 border-[--firstColor] hover:border-[--fourthColor]'>Jouer</button></li>
                <li>
                <form className='space-y-10'>
                    <div className='space-y-5'>
                      <label for="theme" >Theme : </label>
                      <select id='theme' className='bg-[--fourthColor] w-auto cursor-pointer rounded-md text-[--firstColor] font-semibold' 
                      value={theme} 
                      onChange={(e) => setTheme(e.target.value)}>
                        
                      {themeCatalog.map((themeName, index) => (
                          <option key={index} value={themeName} className=''>
                              {themeName}
                          </option>
                      ))} 

                      </select>
                    </div>
                    </form>
                    <form>
                    <div className='space-y-5'>
                      <label for="difficulty" > Difficulté : </label>
                      <select id='difficulty' className='bg-[--fourthColor] w-auto cursor-pointer rounded-md text-[--firstColor] font-semibold' 
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      >
                        <option value="Facile">Facile</option>
                        <option value="Moyen">Moyen</option>
                        <option value="Difficile">Difficile</option>
                      </select>
                    </div>

                  </form>
                </li>
                {auth.userID ?
                  (
                    <div className='pt-10 space-y-5'>
                    
                      <li className='border-b-2 border-[--firstColor] hover:border-[--fourthColor]'><Link to="/dashboard">Dashboard</Link> </li>                        
                      <li><button type='button' className='border-b-2 border-[--firstColor] hover:border-[--fourthColor]' onClick={handleLogout}>Déconnecter <span className='text-[--fourthColor] font-semibold'>{auth.username}</span></button> </li>
                              
                    </div>
                  
                  ) : (
                    
                    <Link to="/userconnect" className='border-b-2 border-[--firstColor] hover:border-[--fourthColor]'>Se connecter</Link> 
                  )
                } 
                
              </ul>
            </div>
          </div>
    </nav>


            </>
  )
}

export default Navbar