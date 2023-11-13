import React, { useState } from 'react'
import EditBack from "../components/EditBack";
import DeleteTheme from "../components/DeleteTheme";
import DeleteImg from "../components/DeleteImg";
import AddImgs from "../components/AddImgs";
import AddTheme from "../components/AddTheme";

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
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)]'>
    <article className='text-center flex flex-col justify-center items-center md:w-full'>

    <h3 className='text-center font-semibold text-lg mb-2'>Que veux-tu faire ?</h3>
    <h2 className='text-center font-semibold text-lg mb-5'>Selon ton choix, il te suffit de retourner la carte !</h2>
    <div className='flex flex-row flex-wrap w-1/2 justify-evenly mt-5 px-10'>
        <div className="border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 shadow-4xl-green m-6"
        onClick={() => handleClick('addTheme')}>
             <div className='flex justify-center items-center px-2'>
                <p className=''>Ajouter un thème</p>
             </div>
        </div>
        <div className="border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 shadow-4xl-green m-6"
        onClick={() => handleClick('addImgs')}>
             <div className='flex justify-center items-center px-2'>
                <p className=''>Ajouter des images</p>
             </div>
        </div>
        <div className="border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 shadow-4xl-green m-6"
        onClick={() => handleClick('editBack')}>
             <div className='flex justify-center items-center px-2'>
                <p className=''>Ajouter / changer l'image au dos des cartes</p>
             </div>
        </div>
        <div className="border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 shadow-4xl-red m-6"
        onClick={() => handleClick('deleteTheme')}>
             <div className='flex justify-center items-center px-2'>
                <p className=''>Supprimer un thème</p>
             </div>
        </div>
        <div className="border-2 border-white rounded-lg cursor-pointer w-3/4 flex justify-center md:w-48 md:h-48 shadow-4xl-red m-6"
        onClick={() => handleClick('deleteImgs')}>
             <div className='flex justify-center items-center px-2'>
                <p className=''>Supprimer des images</p>
             </div>
        </div>
    </div>
    </article>

{displayForm()}
</section>
  )
}

export default Dashboard

