import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const themeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('Dragon Ball');
  const [difficulty, setDifficulty] = useState('Standard');

  const contextValue = useMemo(
    () => ({
        theme, setTheme, difficulty, setDifficulty
    }),
    [
        theme, setTheme, difficulty, setDifficulty
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
