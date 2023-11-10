import React, {useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom"
import axios from "axios";
import themeContext from '../Contexts/themeContext';


function DeleteImg({auth}) {
  const { updateThemes } = useContext(themeContext);
    const [imageDeleted, setImageDeleted] = useState(false)
    const [userImgList, setUserImgList] = useState([])
    const [themeData, setThemeData] = useState([])
    const [themeList, setThemeList] = useState([])
    const [formDelete, setFormDeleted] = useState({
      titleFrom : "",
      imageName: "",
    })


    //fetch User's Theme
    useEffect(() => {
      const fetchThemeData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/themes/${auth.username}`)
          setThemeData(response.data)
        } catch (error) {
          console.err(error)
        }
      }
      fetchThemeData()
    },[])

    useEffect(() => {
      if (themeData) {
        const names = themeData.map(theme => theme.name); // Extract names from themeData
        setThemeList(names); // Set themeList to the extracted names
      }
    }, [themeData, auth]);

    //HandleChange FormDelete
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormDeleted({ ...formDelete, [name]: value });
    };

    //HandleSubmit image delete
    const handleSubmit = async (e) => {
      e.preventDefault()
      const normalizedTheme = formDelete.titleFrom.toLowerCase().replace(/[\s-]/g, '');

      try {
        await axios.delete(`http://localhost:8000/images/${normalizedTheme}/${formDelete.imageName}/delete`)
        setImageDeleted(true)       
        setUserImgList((prevImgList) => prevImgList.filter(imageName => imageName !== formDelete.imageName));// regarde la liste precedente, filtre, pour chaque imageName il renvoie imageName tant qu'elle est différente de celle qui vient d'ê delete
        updateThemes();
      } catch (error) {
        console.error(error)
      }
    }


    //fetch user's imgs
    const fetchUserImgs = async () => {
      try {
        const normalizedTheme = formDelete.titleFrom.toLowerCase().replace(/[\s-]/g, '');
        
        const response = await axios.get(`http://localhost:8000/images/img/${auth.username}/${normalizedTheme}`)
        console.log(response.data)
         // Filtrer les images en fonction du thème
        const filteredImages = response.data.filter(element => element.titleFrom === normalizedTheme);
        // Extraire les noms des images filtrées
        const namesArray = filteredImages.map(img => img.name);

        setUserImgList(namesArray);

      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      if(auth.username && formDelete.titleFrom !== ""){
        fetchUserImgs()
      }
    },[formDelete.titleFrom])
    


  return (
    <section className='flex flex-col justify-center items-center'>

      <article className=" mt-5 flex justify-center">
          <h3 className='text-center font-semibold text-lg mb-5'>Choix du thème</h3>
            
            <form>
            <label htmlFor='titleFrom'
                className='md:inline-block md:text-right md:w-40' >
                    Titre de l'oeuvre :
            </label>
            <select
            id='titleFrom'
            name='titleFrom'
            className='bg-[--firstColor] w-auto cursor-pointer ml-5 border-2 border-[--secondColor] rounded-md'
            value={formDelete.titleFrom}
            onChange={handleChange} >

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
            </form>
            </article>
            <article>

            
      <div className='border-2 border-[#ccc1c1] p-5 rounded-lg'>
      <h2 className='text-center'>CHOIX 3 : Supprimer une image du thème</h2>
            <form onSubmit={handleSubmit}
            className='flex flex-col justify-center items-start mt-2'>
              <div className='py-2'>

              <label htmlFor='imageName'
                  className='md:inline-block md:text-right md:w-40' >
                      Choisi ton image :
              </label>
              
              <select
                  id='imageName'
                  value={formDelete.imageName}
                  onChange={handleChange} 
                  name='imageName'
                  className='bg-[--firstColor] w-auto cursor-pointer ml-5 border-2 border-[--secondColor] rounded-md'
                  >

                      <option
                      value=""
                      label='Select'>
                      </option>

                  {userImgList.map((img, index) => (
                    <option key={index} value={img}>
                        {img}
                    </option>
                ))} 

                  </select>

              </div>

            <p>Tu peux retrouver le nom de l'image dans la page copyright en <Link to="/copyright">cliquant ici</Link></p>

            

            
              <div className='flex self-center mt-2'>
                  <button type='submit'
                  className='border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-green-500'>Supprimer</button>
              </div>
              {imageDeleted && <p className='flex self-center mt-1'>Image supprimée !</p>}
                  </form>
              </div>
      </article>
    </section>
  )
}

export default DeleteImg