import React, {useEffect, useState} from 'react'


function SingleCards({card, backCard, handleChoice, flipped, disabled, difficulty}) {

    const [cardSrc, setCardSrc] = useState(null);
    const [backCardSrc, setBackCardSrc] = useState(null);

    useEffect(() => {
        if (backCard) {
          setBackCardSrc(backCard);
        }
      }, [backCard]);


    const handleClick = () => {

        if (!disabled){
            setCardSrc(card.src); 
            handleChoice(card);
            
        }
    }



  return (

    <div key={card.id} className={`bg-[#cccccc] border-2 border-white rounded-lg shadow-md cursor-pointer hover:scale-105 hover:shadow-xl w-3/4 flex justify-center 
    ${difficulty === "Facile" ? 
    "md:w-48" : difficulty === "Moyen" ?
    "md:w-36" : "md:w-36"}`}>
    <div className={`relative flex justify-center items-center 
    ${difficulty === "Facile" ?
    "w-[188px] h-[188px]" : difficulty === "Moyen" ?
    "w-[144px] h-[144px]" : "w-[144px] h-[144px]"}`}>

        {flipped ? (
            <>
                <img src={cardSrc} alt='card front' className='[transform:rotateY(0deg)] delay-0 rounded-lg h-full w-full'/>
                <img src={backCardSrc} alt='card back' className='[transform:rotateY(90deg)] delay-0 absolute' onClick={handleClick}/>
            </>
        ) :
        (
            <>
                <img src={backCardSrc} alt='card front' className='[transform:rotateY(90deg) scale-50] ease-in duration-500 rounded-lg filter blur-2xl'/>
                <img src={backCardSrc} alt='card back' className='[transform:rotateY(0deg)] delay-200 ease-in duration-200 absolute h-full w-full rounded-lg ' onClick={handleClick}/>
            </>
        )}


    </div>
  </div>
  )
}

export default SingleCards