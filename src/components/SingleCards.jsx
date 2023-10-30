import React from 'react'


function SingleCards({card, backCard, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        // dès qu'on clique sur une carte, on va keep la card et l'utiliser pour lancer la fonction handleChoice de app.js
        if (!disabled){
            handleChoice(card)
        }
        

    }

    console.log("backCard dans single card :", backCard.src)
    console.log("card dans single card :", card.src)
  return (
    <div key={card.id} className='bg-[#cccccc] border-2 border-white rounded-lg shadow-md my-5 mx-5 cursor-pointer hover:scale-105 hover:shadow-xl w-3/4 flex justify-center md:w-48'>
    <div className='relative flex justify-center items-center w-[188px] h-[188px]'>

        {flipped ? (
            <>
                <img src={card.src} alt='card front' className='[transform:rotateY(0deg)] delay-0 rounded-lg h-full w-full'/>
                <img src={backCard.src} alt='card back' className='[transform:rotateY(90deg)] delay-0 absolute ' onClick={handleClick}/>
            </>
        ) :
        (
            <>
                <img src={card.src} alt='card front' className='[transform:rotateY(90deg)] ease-in duration-200 rounded-lg'/>
                <img src={backCard.src} alt='card back' className='[transform:rotateY(0deg)] delay-200 ease-in duration-200 absolute h-full w-full' onClick={handleClick}/>
            </>
        )}


    </div>
  </div>
  )
}

export default SingleCards