import React, {useState} from 'react';
import axios from 'axios';

export default function BackImg() {

    const [postBackImage, setPostBackImage] = useState( {
        backImageName: "",
        backImageTitleFrom: "",
        backImage: "",
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
      const normalizedTheme = postBackImage.backImageTitleFrom.toLowerCase().replace(/[\s-]/g, '');
      try{
        const newBackImage = {
            backImageName: postBackImage.backImageName,
            backImageTitleFrom: normalizedTheme,
            backImage: postBackImage.backImage
          };

        await axios.post("http://localhost:8000/backImages/add", newBackImage)
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
              <label htmlFor='backImageTitleFrom'
                  className='pr-5' >
                      Titre de l'oeuvre
              </label>
              <input 
                  value={postBackImage.backImageTitleFrom}
                  onChange={handleChange}
                  name='backImageTitleFrom'
                  type='text'
                  placeholder="Le nom de l'oeuvre"
                  className={`border-2 rounded-md text-black `}
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
          <div className='flex justify-center mt-5 space-x-5'>
                <button type='submit'
                className='border-2 rounded-md px-4 py-2 cursor-pointer'>Soumettre</button>
            </div>
          </form>
        </article>
    
  )
}