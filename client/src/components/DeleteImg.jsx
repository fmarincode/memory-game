import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import themeContext from '../Contexts/themeContext';
import AuthContext from '../Contexts/auth/AuthProvider';

function DeleteImg() {
  const { updateThemes } = useContext(themeContext);
  const {auth} = useContext(AuthContext)
    const [imageDeleted, setImageDeleted] = useState(false)
    const [userImgList, setUserImgList] = useState([])
    const [themeData, setThemeData] = useState([])
    const [themeList, setThemeList] = useState([])
    const [formDelete, setFormDeleted] = useState({
      titleFrom : "",
      imageName: "",
    })
    const [image, setImage] = useState()
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


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormDeleted({ ...formDelete, [name]: value });
    };


    const handleSubmit = async (e) => {
      e.preventDefault()
      const normalizedTheme = formDelete.titleFrom.toLowerCase().replace(/[\s-]/g, '');

      try {
        await axios.delete(`${url}/images/${normalizedTheme}/${formDelete.imageName}/delete`)
        setImageDeleted(true)       
        setUserImgList((prevImgList) => prevImgList.filter(imageName => imageName !== formDelete.imageName));
        updateThemes();
      } catch (error) {
        console.error(error)
      }
    }



    const fetchUserImgs = async () => {
      try {
        const normalizedTheme = formDelete.titleFrom.toLowerCase().replace(/[\s-]/g, '');
        
        const response = await axios.get(`${url}/images/img/${auth.username}/${normalizedTheme}`)

        const filteredImages = response.data.filter(element => element.titleFrom === normalizedTheme);

        const namesArray = filteredImages.map(img => img.name);
        setUserImgList(namesArray);

        const imagesArray = filteredImages.map(img => ({ image: img.image, name: img.name }));
        setImage(imagesArray);

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
           <article>
      <div className='border-2 border-[#ccc1c1] p-5 rounded-lg'>
      <h2 className='text-center'>Supprimer une image du thème</h2>
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
              <div className='flex self-center mt-2'>
                  <button type='submit'
                  className='border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-[--fourthColor] hover:text-[--firstColor] font-bold '>Supprimer</button>
              </div>
              {imageDeleted && <p className='flex self-center mt-1'>Image supprimée !</p>}
                  </form>
              </div>
              <article className='flex flex-col justify-center items-center space-y-5'>
              <p>Aperçu de l'image à supprimer </p>
              {image && (
                <img src={image.find(img => img.name === formDelete.imageName)?.image} alt={formDelete.imageName} className='md:max-h-40 md:max-w-40'/>
              )}
            </article>
      </article>
      
    </section>
  )
}

export default DeleteImg