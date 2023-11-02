import React, {useState} from 'react'


function SingleCards({card, backCard, handleChoice, flipped, disabled}) {

    const [cardSrc, setCardSrc] = useState(null);

    const handleClick = () => {
        // dès qu'on clique sur une carte, on va keep la card et l'utiliser pour lancer la fonction handleChoice de app.js
        if (!disabled){
            setCardSrc(card.src); // Chargez l'image au moment du clic
            handleChoice(card);
            handleChoice(card)
        }
    }


  return (

    <div key={card.id} className='bg-[#cccccc] border-2 border-white rounded-lg shadow-md my-5 mx-5 cursor-pointer hover:scale-105 hover:shadow-xl w-3/4 flex justify-center md:w-48'>
    <div className='relative flex justify-center items-center w-[188px] h-[188px]'>

        {flipped ? (
            <>
                <img src={cardSrc} alt='card front' className='[transform:rotateY(0deg)] delay-0 rounded-lg h-full w-full'/>
                <img src={backCard[0].src} alt='card back' className='[transform:rotateY(90deg)] delay-0 absolute' onClick={handleClick}/>
            </>
        ) :
        (
            <>
                <img src={backCard[0].src} alt='card front' className='[transform:rotateY(90deg) scale-50] ease-in duration-500 rounded-lg filter blur-2xl'/>
                <img src={backCard[0].src} alt='card back' className='[transform:rotateY(0deg)] delay-200 ease-in duration-200 absolute h-full w-full' onClick={handleClick}/>
            </>
        )}


    </div>
  </div>
  )
}

export default SingleCards