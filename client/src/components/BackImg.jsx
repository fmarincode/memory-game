import React, {useState} from 'react';
import axios from 'axios';

export default function BackImg({ newThemeName }) {
    const [imageAdded, setImageAdded] = useState(false)

    const [postBackImage, setPostBackImage] = useState( {
        backImageName: "",
        backImage: "",
        backImageSrc: "",
        backImageAuthor: "",
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
      try{
        const newBackImage = {
            backImageName: postBackImage.backImageName,
            backImage: postBackImage.backImage,
            backImageSrc: postBackImage.backImageSrc,
            backImageAuthor: postBackImage.backImageAuthor
          };

        await axios.post(`http://localhost:8000/themes/${newThemeName}/backImages/add`, newBackImage)
        setImageAdded(true)
      }catch(error){
        console.log(error)
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createPost()
      console.log("Uploaded")
    }
  
    const handleFileUploadBackImg = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      console.log(base64)
      setPostBackImage({ ...postBackImage, backImage : base64 })
    }
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostBackImage({ ...postBackImage, [name]: value });
      };
      
  return (

        <article className='flex flex-col items-center'>
          <h2>Ajouter l'image au dos des cartes (optionnel)</h2>
        <form onSubmit={handleSubmit}
           className='flex flex-col justify-center items-center'>
        <div className='py-2 mt-5'>
          <label htmlFor='backImageName'
              className='pr-5' >
                  Nom de l'image
          </label>
          <input 
              value={postBackImage.backImageName}
              onChange={handleChange}
              name='backImageName'
              type='text'
              placeholder="Le nom de l'image"
              className={`border-2 rounded-md text-black`}
          />
          </div>

        <div className='py-2'>

          <label htmlFor='backImage'
          className='pr-5'>
              Votre image
          </label>
          <input 
          type="file"
          lable="backImage"
          name="backImage"
          accept='.jpeg, .png, .jpg, .webp'
          onChange={(e) => handleFileUploadBackImg(e)}
          className={`border-2 rounded-md text-white`}
          />
          </div>

          <div className='py-2'>
              <label htmlFor='backImageSrc'
                  className='pr-5' >
                      Lien URL de l'image
              </label>
              <input 
                  value={postBackImage.backImageSrc}
                  onChange={handleChange}
                  name='backImageSrc'
                  type='text'
                  placeholder="Le lien de l'oeuvre"
                  className={`border-2 rounded-md text-black `}
              />
          </div>

          <div className='py-2'>
              <label htmlFor='backImageAuthor'
                  className='pr-5' >
                      Auteur de l'image
              </label>
              <input 
                  value={postBackImage.backImageAuthor}
                  onChange={handleChange}
                  name='backImageAuthor'
                  type='text'
                  placeholder="Le nom de l'auteur"
                  className={`border-2 rounded-md text-black `}
              />
          </div>

          <div className='flex justify-center mt-5 space-x-5'>
                <button type='submit'
                className='border-2 rounded-md px-4 py-2 cursor-pointer'>Soumettre</button>
            </div>
            {imageAdded && <p> Ton image a bien été ajoutée pour {newThemeName}</p>}
          </form>
        </article>
    
  )
}