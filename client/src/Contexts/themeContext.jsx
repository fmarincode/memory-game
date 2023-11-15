import React, { createContext, useState, useMemo, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "./auth/AuthProvider";

const themeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('Dragon Ball');
  const [difficulty, setDifficulty] = useState('Standard');
  const [themeCatalog, setThemeCatalog] = useState([]);
  
  const {auth} = useContext(AuthContext)
  // Fonction pour récupérer les thèmes de l'admin
  const fetchThemeData = async () => {
    try {
      const response = await axios.get("https://memorycardgame.onrender.com/themes/Bascom3000");
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
    // Fonction pour récupérer les thèmes de l'utilisateur
    const fetchThemesUser = async () => {
    try {
      const response = await axios.get(`https://memorycardgame.onrender.com/themes/${auth.username}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };


  const updateThemes = async () => {
    try {
      const userThemeData = await fetchThemesUser();
      const globalThemeData = await fetchThemeData();
      const updatedThemeData = [ ...globalThemeData, ...userThemeData];
      const names = updatedThemeData.map(theme => theme.name);
      setThemeCatalog(names);
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
