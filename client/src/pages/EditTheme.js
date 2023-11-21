import React, {useContext, useEffect, useState } from 'react'
import AuthContext from '../Contexts/auth/AuthProvider';
import {Link} from "react-router-dom"
import DeleteImg from '../components/DeleteImg';
import DeleteTheme from '../components/DeleteTheme';
import {AiOutlineEdit, AiOutlinePlusSquare} from "react-icons/ai";
import {ImBin} from "react-icons/im";

function EditTheme() {

    const {auth, setAuth} = useContext(AuthContext)
    const [chooseEditor, setChooseEditor] = useState("")

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
                <div className='md:p-8 md:border-2 md:border-white md:auto md:flex md:justify-around md:items-center md:mt-5'>
                  <div className='flex flex-col space-y-3'>
                      <p> 4 choix sont possibles pour toi </p>
                    <div className='flex space-x-5'>
                      <p>Si tu veux changer l'image sur la face au dos des cartes <Link to="/addContent" className='underline'>clique ici</Link></p> 
                      <AiOutlineEdit className='text-2xl'/>
                    </div>
                    <div className='flex space-x-5'>
                      <p>Si tu veux ajouter des images faces cachées à l'un de tes thèmes <Link to="/addContent" className='underline'>clique ici</Link></p> 
                      <AiOutlinePlusSquare className='text-2xl'/>
                    </div>
                    <div className='flex space-x-5'>
                      <p>Si tu veux supprimer une des images faces cachées <button type="button" onClick={() => setChooseEditor("DeleteImg")} className='underline'>clique ici</button></p> 
                      <ImBin className='text-2xl'/>
                    </div>
                    <div className='flex space-x-5'>
                      <p>Si tu veux supprimer un thème entièrement <button type="button" onClick={() => setChooseEditor("DeleteTheme")} className='underline'>clique ici</button></p> 
                      <ImBin className='text-2xl'/>
                    </div>
                  </div>
                </div>

           
                
            </article>
            <article className='mt-5'>
              {chooseEditor === "DeleteTheme" ?( 
              <DeleteTheme auth={auth}/>)
              : chooseEditor === "DeleteImg" ? (
                <DeleteImg auth={auth}/>
              ) : ""
              }
            </article>
                    
                    
        </section>
  )
}

export default EditTheme