import React, {useContext} from 'react'
import themeContext from '../Contexts/themeContext'
import Player from '../components/Player';

function Home() {
    const {theme, difficulty} = useContext(themeContext);

  return (
    <body className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:h-[calc(100vh-40px)]'>
      <main className='flex flex-col w-full items-center'>
          <header className='text-center w-full -mt-2'>
            <h1 className='text-3xl font-bold'>Magic Match</h1>
          </header>
          <Player 
          theme={theme}
          difficulty={difficulty}/>
      </main>
    </body>
  )
}

export default Home