import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../Contexts/auth/AuthProvider';

const RequireAuth = ({ children, requiredRole }) => {
  const { auth } = useContext(AuthContext);

  // Vérifie si l'utilisateur est authentifié
  if (!auth) {
    // Redirige l'utilisateur vers la page d'accueil s'il n'est pas authentifié
    return <Navigate to="/" />;
  }

  // Si l'utilisateur est authentifié et a le rôle requis, affiche le contenu
  if (requiredRole.includes(auth.role)) {
    return children;
  }

  // Redirige l'utilisateur vers la page d'accueil s'il n'a pas le rôle requis
  return <Navigate to="/" />;
};

export default RequireAuth;