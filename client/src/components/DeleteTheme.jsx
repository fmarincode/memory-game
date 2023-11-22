import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import AuthContext from '../Contexts/auth/AuthProvider';

function DeleteTheme() {

    const [themeDeleted, setThemeDeleted] = useState(false)
    const [themeData, setThemeData] = useState([])
    const [themeList, setThemeList] = useState([])
    const [themeToDelete, setThemeToDelete] = useState("")
    const {auth} = useContext(AuthContext)
    const url = "https://memorycardgame.onrender.com"

    useEffect(() => {
      const fetchThemeData = async () => {
        try {
          const response = await axios.get(`${url}/themes/${auth.username}`)
          setThemeData(response.data)
        } catch (error) {
          console.error(error)
        }
      }
      fetchThemeData()
    },[])

    useEffect(() => {
      if (themeData) {
        const names = themeData.map(theme => theme.name);
        setThemeList(names); 
      }
    }, [themeData, auth]);


    const deleteThemesImg = async () => {
      const normalizedTheme = themeToDelete.toLowerCase().replace(/[\s-]/g, '');
      try {

        await axios.delete(`${url}/images/img/delete/${normalizedTheme}`)

      } catch (error) {
        console.error(error)
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        await axios.delete(`${url}/themes/${themeToDelete}/delete`)
        setThemeDeleted(true)
        setThemeList((prevImgList) => prevImgList.filter(theme => theme !== themeToDelete));
        deleteThemesImg()
      } catch (error) {
        console.error(error)
      }
    } 

  return (
    <section className='flex flex-col justify-center items-center'>

    <article >
        <div className='border-2 border-[#ccc1c1] p-5 rounded-lg'>
            <h2 className='text-center'>Supprimer un thème</h2>
            <p className='text-center'>Toutes les données du thèmes, dont les images, seront également supprimées.</p>
                <form 
                onSubmit={handleSubmit}
                className='flex flex-col justify-center items-center space-y-5 mt-2'>
                    <div className='py-2 flex flex-col self-center md:block md:self-start'>

                        <label htmlFor='titleFrom'
                            className='text-center md:inline-block md:text-right md:w-40' >
                                Thème à supprimer :
                        </label>
                            <select
                            id='titleFrom'
                            name='titleFrom'
                            className='bg-[--firstColor] w-auto text-center cursor-pointer md:ml-5 border-2 border-[--secondColor] rounded-md'
                            value={themeToDelete}
                            onChange={(e) => setThemeToDelete(e.target.value)} >

                                <option
                                value=""
                                label='Select'>
                                </option>

                            {themeList.map((themeName, index) => (
                            <option key={index} value={themeName}>
                                {themeName}
                            </option>
                        ))} 

                            </select>
                    </div>
                    <div className='flex self-center mt-2'>
                        <button type='submit'
                        className='border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-[--fourthColor] hover:text-[--firstColor] font-bold '>Supprimer</button>
                    </div>
                    
                    {themeDeleted && <p className='flex self-center mt-1'>Thème supprimé !</p>}
                 
                </form>
        </div>
    </article>
    </section>
  )
}

export default DeleteTheme