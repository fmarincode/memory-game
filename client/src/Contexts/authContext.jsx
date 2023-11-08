import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const authContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  const contextValue = useMemo(
    () => ({
        isLogged, setIsLogged
    }),
    [
        isLogged, setIsLogged
    ]
  );

  return (
    <authContext.Provider value={contextValue}>
      {children}
    </authContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default authContext;