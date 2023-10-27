import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const themeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dbz');

  const contextValue = useMemo(
    () => ({
        theme, setTheme
    }),
    [
        theme, setTheme
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
