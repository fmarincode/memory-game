import React, {useState, useEffect} from 'react'
import SingleCards from './SingleCards'


function Player({theme, difficulty}) {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [backCard, setBackCard]= useState()

  // mix cards
  const mixCards = () => {
    // check the theme
    let themeData;

    if (theme === 'dbz') {
      themeData = require('../themes/dbz.json');

    } else if (theme === 'succession') {
      themeData = require('../themes/succession.json');

    } else if (theme === 'onepiece') {
      themeData = require('../themes/onepiece.json');
    }


     // Convert themeData to an array
  const themeDataArray = Object.values(themeData);

  // mix all imgs of json's file
  const shuffledData = themeDataArray.sort(() => Math.random() - 0.5);

  // Select the nb elements with difficulty choice
  let selectedData
  if (difficulty === "Standard"){
    selectedData = shuffledData.slice(0, 6);
  } else if (difficulty === "Middle"){
    selectedData = shuffledData.slice(0, 8);
  } else if (difficulty === "Hard"){
    selectedData = shuffledData.slice(0, 10);
  }

  // duplicated the selectedData (2x6) & mix
  const mixedCards = [...selectedData, ...selectedData]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(mixedCards)
    setTurns(0)
  }


  useEffect(() => {
    const backCardTheme = require(`../themes/backCards/${theme}Back.json`)
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
              backCard={backCard[0]}
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