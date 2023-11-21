import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
/* import EditBack from "../components/EditBack" */
import AuthContext from '../Contexts/auth/AuthProvider';
import themeContext from '../Contexts/themeContext';

export default function AddImgs() {
  const {updateThemes} = useContext(themeContext)
  const [themeData, setThemeData] = useState([])
  const [themeList, setThemeList] = useState([])
  const {auth} = useContext(AuthContext)
  const url = "https://memorycardgame.onrender.com"

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response = await axios.get(`${url}/themes/${auth.username}`)
        setThemeData(response.data)
      } catch (error) {
        
      }
    }
    fetchThemeData()
  },[])
  

  useEffect(() => {
    if (themeData) {
      const names = themeData.map(theme => theme.name); // Extract names from themeData
      setThemeList(names); // Set themeList to the extracted names
    }
  }, [themeData]);


  const [imageAdded, setImageAdded] = useState(false)
    const [postImage, setPostImage] = useState( {
        name : "",
        titleFrom : "", 
        image : "",
        userOwner : "",
        imageSrc : "",
        imageAuthor : "",
    })

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result)
          };
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }

    const createPost = async () => {
      const normalizedTheme = postImage.titleFrom.toLowerCase().replace(/[\s-]/g, '');
      try{
        const newImage = {
            name: postImage.name,
            titleFrom: normalizedTheme,
            image: postImage.image,
            userOwner: auth.username,
            imageSrc: postImage.imageSrc,
            imageAuthor: postImage.imageAuthor,
          };

        await axios.post(`${url}/images/add`, newImage)
        setImageAdded(true)
        
      }catch(error){
        console.error(error)
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createPost()
      updateThemes()

    }
  
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, image : base64 })
    }

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostImage({ ...postImage, [name]: value });
      };
      
  return (
    
        <>
          <article className='md:flex md:flex-col md:items-center md:space-y-5'>
            <div className='border-2 border-[#ccc1c1] p-5 rounded-lg'>
            <h1 className='mb-1 text-center'>Ajouter une image dans la base de données</h1>
            <h2 className='mb-3 text-center'>La taille idéale des images est de : 660px * 660px</h2>
           <form onSubmit={handleSubmit}
           className='flex flex-col justify-center items-start'>
            <div className='py-2'>

            <label htmlFor='name'
                className='md:inline-block md:text-right md:w-40' >
                    Nom de l'image :
            </label>
            <input 
                value={postImage.name}
                onChange={handleChange}
                name='name'
                type='name'
                onMouseEnter={(e) => setImageAdded(false)}
                placeholder="Le nom de l'image"
                className="border-2 rounded-md text-black ml-5"
            />
            </div>

            <div className='py-2'>
                <label htmlFor='titleFrom'
                    className='md:inline-block md:text-right md:w-40' >
                        Titre de l'oeuvre :
                </label>
                <select
                id='titleFrom'
                name='titleFrom'
                className='bg-[--firstColor] w-auto cursor-pointer ml-5 border-2 border-[--secondColor] rounded-md'
                value={postImage.titleFrom}
                onChange={handleChange}>

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

            <div className='py-2'>
                <label htmlFor="file-upload" className='md:inline-block md:text-right md:w-40'>
                Votre image :
                </label>
                
                <input 
                type="file"
                lable="Image"
                name="image"
                accept='.jpeg, .png, .jpg, .webp'
                onChange={(e) => handleFileUpload(e)}
                className="border-2 rounded-md text-white ml-5"
                />

            </div>
            <div className='py-2'>

                <label htmlFor='imageSrc'
                className='md:inline-block md:text-right md:w-40' >
                Lien URL de la source de l'image :
                </label>
                <input 
                value={postImage.imageSrc}
                onChange={handleChange}
                name='imageSrc'
                type='text'
                placeholder="Lien du site de l'image"
                className="border-2 rounded-md text-black ml-5"
                />
            </div>

            <div className='py-2'>

                <label htmlFor='imageAuthor'
                className='md:inline-block md:text-right md:w-40'>
                    Nom de l'auteur à créditer :
                </label>
                <input 
                value={postImage.imageAuthor}
                onChange={handleChange}
                name='imageAuthor'
                type='text'
                placeholder="Le nom de l'auteur/ site"
                className="border-2 rounded-md text-black ml-5"
                />
            </div>

           
            <div className='flex self-center mt-2'>
                <button type='submit'
                className='border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-[--fourthColor] hover:text-[--firstColor] font-bold '>Ajouter</button>
            </div>
            {imageAdded && <p className='flex self-center mt-1'>Image ajoutée !</p>}
                </form>
            </div>
            <h2>Aperçu de l'image choisie</h2>
        {postImage.image && <img src={postImage.image} alt="your uploaded" className='md:max-h-40 md:max-w-40'/>}
        </article>
        <article className='md:flex md:flex-col md:w-1/2 md:items-center md:space-y-5'>
{/*             <EditBack 
            themeList = {themeList}/> */}
        </article>
        </>

  )
}