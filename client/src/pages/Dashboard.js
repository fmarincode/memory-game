import React, { useState } from 'react'
import EditBack from "../components/EditBack";
import DeleteTheme from "../components/DeleteTheme";
import DeleteImg from "../components/DeleteImg";
import AddImgs from "../components/AddImgs";
import AddTheme from "../components/AddTheme";
import { CiWarning } from "react-icons/ci";

function Dashboard() {
   const [selectedOption, setSelectedOption] = useState(null)

   const handleClick = (option) => {
      setSelectedOption(option)
   }

   const displayForm = () => {
      switch (selectedOption){
         case 'addTheme': return <AddTheme />;
         case 'addImgs': return <AddImgs />;
         case 'editBack': return <EditBack />;
         case 'deleteTheme': return <DeleteTheme />;
         case 'deleteImgs': return <DeleteImg />;
         default: return null;
      }
   }

  return (
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-70px)]'>
      <header className='space-y-5'>
         <h1 className='text-center font-semibold text-xl'>Que veux-tu faire ?</h1>
         <div className='flex items-center justify-center space-x-5'><CiWarning className='text-red-700 text-3xl'/>
         <h2 className='text-center font-semibold text-lg'> <span className='font-bold text-red-700'>Important</span> : chaque utilisateur ne peut agir que sur ses propres thèmes.</h2><CiWarning className='text-red-700 text-3xl'/>
         </div>
      </header>
    <article className={`${selectedOption !== null ? "flex flex-row justify-around md:w-full h-[60vh]" : "text-center flex flex-col justify-center items-center md:w-full"}`}>

    <div className='flex flex-row flex-wrap w-1/2 justify-evenly mt-5 '>
        <div className={`border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 m-6 ${selectedOption === "addTheme" ? "" : "shadow-4xl-green" }`} onClick={() => handleClick('addTheme')}>
             <div className='flex justify-center items-center px-2'>
                <p className='hover:underline'>Ajouter un thème</p>
             </div>
        </div>
        <div className={`border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 m-6 ${selectedOption === "addImgs" ? "" : "shadow-4xl-green" }`}
        onClick={() => handleClick('addImgs')}>
             <div className='flex justify-center items-center px-2'>
                <p className=' hover:underline'>Ajouter des images</p>
             </div>
        </div>
        <div className={`border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 m-6 ${selectedOption === "editBack" ? "" : "shadow-4xl-green" }`}
        onClick={() => handleClick('editBack')}>
             <div className='flex justify-center items-center px-2'>
                <p className='text-center hover:underline'>Ajouter / changer l'image au dos des cartes</p>
             </div>
        </div>
        <div className={`border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 m-6 ${selectedOption === "deleteTheme" ? "" : "shadow-4xl-red" }`}
        onClick={() => handleClick('deleteTheme')}>
             <div className='flex justify-center items-center px-2'>
                <p className=' hover:underline'>Supprimer un thème</p>
             </div>
        </div>
        <div className={`border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 m-6 ${selectedOption === "deleteImgs" ? "" : "shadow-4xl-red" }`}
        onClick={() => handleClick('deleteImgs')}>
             <div className='flex justify-center items-center px-2'>
                <p className=' hover:underline'>Supprimer des images</p>
             </div>
        </div>
    </div>
      <article className='w-[50%] mt-10'>
         {displayForm()}
      </article>
    </article>

</section>
  )
}

export default Dashboard

