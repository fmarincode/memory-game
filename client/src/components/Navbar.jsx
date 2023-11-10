import React, {useContext, useEffect, useState} from 'react'
import themeContext from '../Contexts/themeContext'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import AuthContext from '../Contexts/auth/AuthProvider';
import { useCookies } from "react-cookie";

function Navbar({}) {
  const {theme, setTheme, difficulty, setDifficulty } = useContext(themeContext);
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"])
  const {auth, setAuth} = useContext(AuthContext)
  const [themeData, setThemeData] = useState([])
  const [themeList, setThemeList] = useState([])


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

const handleClickHome = async (e) => {
  e.preventDefault()
  setTheme("Dragon Ball")
  await fetchThemesUser()
  console.log("fetch themes user chargé !")
  navigate("/")
}

const fetchThemeData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/themes/Bascom3000")
    setThemeData(response.data)
  } catch (error) {
    console.err(error)
  }
}
  useEffect(() => {
    fetchThemeData()
  },[])


  const fetchThemesUser = async () => {
    if (auth.username && auth.username !== "Bascom3000") {
      try {
        const response = await axios.get(`http://localhost:8000/themes/${auth.username}`);
        
        // Check if the received data already exists in themeData
        const newData = response.data.filter((newTheme) => {
          return !themeData.some((existingTheme) => existingTheme._id === newTheme._id);
        });

        if (newData.length > 0) {
          setThemeData((prevThemeData) => [...prevThemeData, ...newData]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if (auth.username){
      fetchThemesUser();
    }
  }, [auth.username]);
  
  useEffect(() => {
    if (themeData) {
      const names = themeData.map(theme => theme.name); // Extract names from themeData
      setThemeList(names); // Set themeList to the extracted names
    }
  }, [themeData, auth]);
  
  
  const handleLogout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("expirationDate");
    fetchThemeData()
    navigate("/")
    setAuth({});
  };


  return (
    <nav className='w-[100%] h-14 fixed top-0 left-0 bg-[--firstColor] text-[--secondColor] flex justify-center items-center z-50 md:mr-[17px]'>
          <div className='flex space-x-5'>

            <button type="button" onClick={handleClickHome}>Home</button>         
            
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

            
           {auth.userID ?
            (
              <ul className='flex space-x-5'>
                <li><Link to="/addTheme">Ajouter un thème</Link> </li>
                <li><Link to="/editTheme">Modifier un thème</Link></li>
                <li><Link to="/addContent">Ajouter des images</Link></li>
                <li><button type='button' onClick={handleLogout}>Déconnecter <span className='text-orange-500 font-semibold'>{auth.username}</span></button> </li>
              </ul>             
            
            ) : (
              <Link to="/userconnect">Se connecter</Link> 
            )
            } 
            

          </div>
    </nav>
  )
}

export default Navbar