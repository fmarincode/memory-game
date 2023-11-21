import { useContext } from "react";
import AuthContext from "../Contexts/auth/AuthProvider"

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;