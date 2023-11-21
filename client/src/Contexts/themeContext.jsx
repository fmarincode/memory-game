import React, { createContext, useState, useMemo, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "./auth/AuthProvider";

const themeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('House of the Dragons');
  const [difficulty, setDifficulty] = useState('Facile');
  const [themeCatalog, setThemeCatalog] = useState([]);
  const url = "https://memorycardgame.onrender.com"
  
  const {auth} = useContext(AuthContext)

  // Fonction pour récupérer les thèmes de l'admin
  const fetchThemeData = async () => {
    try {
      const response = await axios.get(`${url}/themes/Bascom3000`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
    // Fonction pour récupérer les thèmes de l'utilisateur
    const fetchThemesUser = async () => {
      if (auth.username !== undefined){
        try {
          const response = await axios.get(`${url}/themes/${auth.username}`);
          return response.data;
        } catch (error) {
          console.error(error);
          return [];
        }
      }
  };


  const updateThemes = async () => {
    try {
      const userThemeData = await fetchThemesUser();
      const globalThemeData = await fetchThemeData();
      if (globalThemeData && userThemeData){

        const updatedThemeData = [ ...globalThemeData, ...userThemeData];
        const names = updatedThemeData.map(theme => theme.name);
        setThemeCatalog(names);
      }else if(globalThemeData && !userThemeData){
        const updatedThemeData = [ ...globalThemeData];
        const names = updatedThemeData.map(theme => theme.name);
        setThemeCatalog(names);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const contextValue = useMemo(
    () => ({
        theme, setTheme, difficulty, setDifficulty, themeCatalog,  updateThemes
    }),
    [
        theme, setTheme, difficulty, setDifficulty,  themeCatalog,  updateThemes
    ]
  );

  return (
    <themeContext.Provider value={contextValue}>
      {children}
    </themeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default themeContext;
