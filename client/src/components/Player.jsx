import React, {useState, useEffect} from 'react'
import SingleCards from './SingleCards'
import axios from "axios"

function Player({theme, difficulty}) {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [backCard, setBackCard]= useState()
  const [dataImgs, setDataImgs] = useState()

  useEffect(() => {
    const normalizedTheme = theme.toLowerCase().replace(/[\s-]/g, '');
    const getThemeImgs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/images/${normalizedTheme}`);
        setDataImgs(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    getThemeImgs();
  }, [theme]);
  

  // mix cards
  const mixCards = () => {
    if (dataImgs) {
      const shuffledData = dataImgs.sort(() => Math.random() - 0.5);
  
      // Sélectionnez le nombre d'éléments en fonction de la difficulté
      let selectedData;
      if (difficulty === "Standard") {
        selectedData = shuffledData.slice(0, 6);
      } else if (difficulty === "Middle") {
        selectedData = shuffledData.slice(0, 8);
      } else if (difficulty === "Hard") {
        selectedData = shuffledData.slice(0, 10);
      }
  
      // Doublez les données sélectionnées (2x6) et mélangez-les
      const mixedCards = [...selectedData, ...selectedData]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({ ...card, id: index }));
  
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(mixedCards);
      setTurns(0);
    }
  };
  

  useEffect(() => {
    const themeLowerCase = theme.toLowerCase().replace(/[-\s]/g, '');
    const backCardTheme = require(`../themes/backCards/${themeLowerCase}Back.json`);  
    setBackCard(backCardTheme) 
    mixCards() 
  }, [theme, difficulty])

  // handle a choice
  const handleChoice = (card) => {
    // s'active au clic sur une carte dans le coposant singleCards.jsx
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    // si on a deja mis une carte dans le state choiceOne, on le met dans choiceTwo
    // sinon si choiceOne est null, la carte cliquée y est stockée
  }

  // reset choices & incremente turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //compare 2 selected card
  useEffect(() => {
    
    if (choiceOne && choiceTwo){
      setDisabled(true)
      // dès qu'on a deux cartes, on les compare :
      if(choiceOne.src === choiceTwo.src){

        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}

            } else {
              return card
            }

          })
        })

        resetTurn()

      }else{
        setTimeout(() => {
          resetTurn()
        }, 1500);
      }
    }
  }, [choiceOne, choiceTwo])


  return (
      <section className='flex flex-col w-full items-center'>
        <button
            type='button'
            className='border-2 w-32 rounded-md px-4 py-1 hover:bg-green-500 mt-2'
            onClick={mixCards}>NEW GAME
          </button>
        <div className='flex flex-col justify-center items-center w-full mt-5 md:w-6/12 md:grid md:grid-cols-4 md:grid-rows-3'>
              {cards.map(card => (
              <SingleCards 
              key={card.id} 
              card={card}
              backCard={backCard}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}/>
              ) )}
        </div>
        
                <p className='text-xl font-bold text-center'>Turns : {turns}</p>
      </section>

    
  )
}

export default Player