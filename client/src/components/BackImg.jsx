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
          <div className='border-2 border-[#ccc1c1] p-5 rounded-lg'>

        <form onSubmit={handleSubmit}
           className='flex flex-col justify-center items-start'>
        <div className='py-2'>
          <label htmlFor='backImageName'
              className='md:inline-block md:text-right md:w-40' >
                  Nom de l'image
          </label>
          <input 
              value={postBackImage.backImageName}
              onChange={handleChange}
              name='backImageName'
              type='text'
              placeholder="Le nom de l'image"
              className="border-2 rounded-md text-black ml-5"
          />
          </div>

          <div className='py-2'>
          <label htmlFor='name'
              className='md:inline-block md:text-right md:w-40' >
                  Titre de l'oeuvre
          </label>
          <input 
              value={postBackImage.name}
              onChange={handleChange}
              name='name'
              type='text'
              placeholder="Le nom de l'oeuvre"
              className="border-2 rounded-md text-black ml-5"
          />
          </div>

        <div className='py-2'>

          <label htmlFor='backImage'
          className='md:inline-block md:text-right md:w-40'>
              Votre image
          </label>
          <input 
          type="file"
          lable="backImage"
          name="backImage"
          accept='.jpeg, .png, .jpg, .webp'
          onChange={(e) => handleFileUploadBackImg(e)}
          className="border-2 rounded-md text-white ml-5"
          />
          </div>

          <div className='py-2'>
              <label htmlFor='backImageSrc'
                  className='md:inline-block md:text-right md:w-40' >
                      Lien URL de l'image
              </label>
              <input 
                  value={postBackImage.backImageSrc}
                  onChange={handleChange}
                  name='backImageSrc'
                  type='text'
                  placeholder="Le lien de l'image"
                  className="border-2 rounded-md text-black ml-5"
              />
          </div>

          <div className='py-2'>
              <label htmlFor='backImageAuthor'
                  className='md:inline-block md:text-right md:w-40' >
                      Auteur de l'image
              </label>
              <input 
                  value={postBackImage.backImageAuthor}
                  onChange={handleChange}
                  name='backImageAuthor'
                  type='text'
                  placeholder="Le nom de l'auteur"
                  className="border-2 rounded-md text-black ml-5"
              />
          </div>

          <div className='flex self-center mt-5 space-x-5'>
                <button type='submit'
                className='border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-green-500'>Ajouter</button>
            </div>
            {imageAdded && <p> Ton image a bien été ajoutée pour {newThemeName}</p>}
          </form>
          </div>
        </article>
    
  )
}