import React, {useState, useEffect} from 'react'
import SingleCards from './SingleCards'
import axios from "axios"
import defaultImg from "../default/backdefault.webp"
import {Link} from "react-router-dom"

function Player({theme, difficulty}) {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [backCard, setBackCard]= useState()
  const [dataImgs, setDataImgs] = useState()
  const [errorLoading, setErrorLoading] = useState(false)
  const url = "https://memorycardgame.onrender.com"

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const normalizedTheme = theme.toLowerCase().replace(/[\s-]/g, '');
        const response = await axios.get(`${url}/images/${normalizedTheme}`);
        setDataImgs(response.data);
        setErrorLoading(false)
      } catch (err) {
        setErrorLoading(true)
        console.error(err);
      }
    };

    fetchThemeData();
  }, [theme]);


  const fetchBackImg = async (theme) => {
    try {
      const response = await axios.get(`${url}/themes/`, theme);
      const filteredThemes = response.data.filter(data => data.name === theme); 
      if (filteredThemes.length > 0) {
        const lastBackImage = filteredThemes[0].backImg[filteredThemes[0].backImg.length - 1].backImage; 
        setBackCard(lastBackImage);
      }
    } catch (err) {
      setBackCard(defaultImg)
      console.error(err);
    }
  };

  useEffect(() => {
    if (dataImgs) {
      fetchBackImg(theme)
      mixCards();
    }
  }, [theme, difficulty, dataImgs]);



  const mixCards = () => {
    if (dataImgs) {
      const shuffledData = dataImgs.sort(() => Math.random() - 0.5);
  

      let selectedData;
      if (difficulty === "Facile") {
        selectedData = shuffledData.slice(0, 6);
      } else if (difficulty === "Moyen") {
        selectedData = shuffledData.slice(0, 8);
      } else if (difficulty === "Difficile") {
        selectedData = shuffledData.slice(0, 10);
      }
  

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
    fetchBackImg(theme)  
    mixCards() 
  }, [theme, difficulty])


  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  useEffect(() => {

    if (choiceOne && choiceTwo){
      setDisabled(true)
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
            className='border-2 w-44 rounded-md px-4 py-1 hover:bg-[--fourthColor] hover:text-[--firstColor] font-bold mt-5'
            onClick={mixCards}>NOUVELLE PARTIE
          </button>
          {errorLoading ? (
            <p className='mt-10'>Tu n'as pas encore ajouté d'images à ton thème ! Rends-toi dans ton <Link to="/dashboard">dashboard</Link></p>

          ) : (
            <>
            
              <div className={`flex flex-col w-full justify-center items-center space-y-5 mt-5 md:w-auto md:grid md:space-y-0 md:gap-5
              ${difficulty === "Facile" ? 
              " md:grid-cols-4 md:grid-rows-3" : difficulty === "Moyen" ?
              " md:grid-cols-4 md:grid-rows-4" : " md:grid-cols-5 md:grid-rows-4"}`}>
                    {cards.map(card => (
                    <SingleCards 
                    key={card.id} 
                    card={card}
                    backCard={backCard}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                    difficulty={difficulty}/>
                    ) )}
              </div>
              
                      <p className='text-xl font-bold text-center md:mt-3 mb-24 md:mb-0'>Nombre de tentatives : {turns}</p>
            </>
          )} 
      </section>

    
  )
}

export default Player