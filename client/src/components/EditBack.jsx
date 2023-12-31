import React, { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import AuthContext from '../Contexts/auth/AuthProvider';

export default function EditBack() {

  const {auth} = useContext(AuthContext);
  const [userThemes, setUserThemes] = useState([])
    const [imageAdded, setImageAdded] = useState(false)
    const [postBackImage, setPostBackImage] = useState( {
        name:"",
        backImageName: "",
        backImage: "",
        backImageSrc: "",
        backImageAuthor: "",
    })
    const url = "https://memorycardgame.onrender.com"

    useEffect(() => {
      const fetchThemesUser = async () => {
        try {
          const response = await axios.get(`${url}/themes/${auth.username}`);

          const names = response.data.map(theme => theme.name);
          setUserThemes(names);
        } catch (error) {
          console.error(error);
          return [];
        }
      };
      fetchThemesUser()
    },[])

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
      try{
        const newBackImage = {
            backImageName: postBackImage.backImageName,
            backImage: postBackImage.backImage,
            backImageSrc: postBackImage.backImageSrc,
            backImageAuthor: postBackImage.backImageAuthor
          };

        await axios.post(`${url}/themes/${postBackImage.name}/backImages/add`, newBackImage)
        setImageAdded(true)
      }catch(error){
        console.error(error)
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createPost()

    }
  
    const handleFileUploadBackImg = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPostBackImage({ ...postBackImage, backImage : base64 })
    }
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostBackImage({ ...postBackImage, [name]: value });
      };
      
  return (

        <article className='flex flex-col items-center md:space-y-5'>
          <div className='border-2 border-[#ccc1c1] p-5 rounded-lg'>
          <h2 className='mb-5 text-center'>Ajouter l'image au dos des cartes </h2>
          <h2 className='mb-3 text-center'>La taille idéale des images est de : 660px * 660px</h2>
        <form onSubmit={handleSubmit}
           className='flex flex-col justify-center items-start'>
        <div className='py-2 flex flex-col self-center md:block md:self-start'>
          <label htmlFor='backImageName'
              className='text-center md:inline-block md:text-right md:w-40' >
                  Nom de l'image
          </label>
          <input 
              value={postBackImage.backImageName}
              onChange={handleChange}
              name='backImageName'
              type='text'
              placeholder="Le nom de l'image"
              className="border-2 text-center rounded-md text-white md:ml-5"
          />
          </div>

          <div className='py-2 flex flex-col self-center md:block md:self-start'>
          <label htmlFor='name'
              className='text-center md:inline-block md:text-right md:w-40' >
                  Titre de l'oeuvre
          </label>
          <select 
          id='name' 
          name='name'
          className='bg-[--firstColor] w-auto text-center cursor-pointer md:ml-5 border-2 border-[--secondColor] rounded-md'
          value={postBackImage.name}
          onChange={handleChange}>
                    <option
                    value=""
                    label='Select'>
                      
                    </option>
            {userThemes.map((themeName, index) => (
                  <option key={index} value={themeName}>
                      {themeName}
                  </option>
              ))} 
          </select>
          
          </div>

        <div className='py-2 flex flex-col self-center md:block md:self-start'>

          <label htmlFor='backImage'
          className='text-center md:inline-block md:text-right md:w-40'>
              Votre image
          </label>
          <input 
          type="file"
          lable="backImage"
          name="backImage"
          accept='.jpeg, .png, .jpg, .webp'
          onChange={(e) => handleFileUploadBackImg(e)}
          className="border-2 rounded-md text-white md:ml-5"
          />
          </div>

          <div className='py-2 flex flex-col self-center md:block md:self-start'>
              <label htmlFor='backImageSrc'
                  className='text-center md:inline-block md:text-right md:w-40' >
                      Lien URL de l'image
              </label>
              <input 
                  value={postBackImage.backImageSrc}
                  onChange={handleChange}
                  name='backImageSrc'
                  type='text'
                  placeholder="Le lien de l'image"
                  className="border-2 rounded-md text-white text-center md:ml-5"
              />
          </div>

          <div className='py-2 flex flex-col self-center md:block md:self-start'>
              <label htmlFor='backImageAuthor'
                  className='text-center md:inline-block md:text-right md:w-40' >
                      Auteur de l'image
              </label>
              <input 
                  value={postBackImage.backImageAuthor}
                  onChange={handleChange}
                  name='backImageAuthor'
                  type='text'
                  placeholder="Le nom de l'auteur"
                  className="border-2 rounded-md text-white text-center md:ml-5"
              />
          </div>

          <div className='flex self-center mt-5 space-x-5'>
                <button type='submit'
                className='border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-[--fourthColor] hover:text-[--firstColor] font-bold '>Ajouter</button>
            </div>
            {imageAdded && <p> Ton image a bien été ajoutée pour {postBackImage.name}</p>}
          </form>
          </div>
          <h2>Aperçu de l'image choisie</h2>
        {postBackImage.backImage && <img src={postBackImage.backImage} alt="image uploaded" className='m-auto pb-1 max-h-40 max-w-40'/>}
        </article>
    
  )
}