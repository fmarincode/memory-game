import React, {useContext, useEffect } from 'react'
import AuthContext from '../Contexts/auth/AuthProvider';
import {Link} from "react-router-dom"
import DeleteImg from '../components/DeleteImg';
import DeleteTheme from '../components/DeleteTheme';


function EditTheme() {

    const {auth, setAuth} = useContext(AuthContext)


    useEffect(() => {
      // Lors du chargement de la page, vérifiez le stockage local
      const storedToken = window.localStorage.getItem("access_token");
      const storedUserID = window.localStorage.getItem("userID");
      const storedRole = window.localStorage.getItem("role");
      const storedUsername = window.localStorage.getItem("username");
  
      if (storedToken && storedUserID && storedRole && storedUsername) {
        setAuth({ userID: storedUserID, role: storedRole, token: storedToken, username : storedUsername });
      }
    }, []);

    


  return (
    
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)]'>
            <article className='text-center flex flex-col justify-center items-center md:w-full'>
    
              
                <p> Que souhaites-tu faire ?</p>
                <p> <span className='font-bold text-xl'>Choix 1</span> : Si tu veux changer l'image sur la face au dos des cartes tu peux le faire en <Link to="/addContent" className='underline'>cliquant ici</Link>, ta nouvelle image sera utilisée.<span className='text-xl text-green-500'> OK</span></p>
                <p> <span className='font-bold text-xl'>Choix 2</span> : Si tu veux ajouter des images faces cachées tu peux le faire en <Link to="/addContent" className='underline'>cliquant ici</Link>, ta nouvelle image sera aléatoirement utilisée.<span className='text-xl text-green-500'> OK</span></p>
                <p> <span className='font-bold text-xl'>Choix 3</span> : Si tu veux supprimer une des images faces cachées tu peux le faire en <Link to="" className='underline'>cliquant ici</Link>, l'action est irréversible. <span className='text-xl text-green-500'> OK mais afficher l'aperçu de l'image ?</span></p>
                <p> <span className='font-bold text-xl'>Choix 4</span> : Si tu veux supprimer un thème entièrement tu peux le faire en <Link to="" className='underline'>cliquant ici</Link>, les images de ce thème disparaitront également, l'action est irréversible.</p>
                
            </article>
                    <DeleteTheme
                    auth={auth}/>
        </section>
  )
}

export default EditTheme