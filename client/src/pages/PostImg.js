import React, {useState} from 'react';
import axios from 'axios';
import BackImg from '../components/BackImg';


export default function PostImg() {

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
            userOwner: postImage.userOwner,
            imageSrc: postImage.imageSrc,
            imageAuthor: postImage.imageAuthor,
          };

        await axios.post("http://localhost:8000/images/add", newImage)
      }catch(error){
        console.log(error)
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createPost()
      console.log("Uploaded")
    }
  
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      console.log(base64)
      setPostImage({ ...postImage, image : base64 })
    }

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostImage({ ...postImage, [name]: value });
      };
      
  return (
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)]'>
        <article className='flex flex-col items-center'>
            <h1 className='mb-5'>Ajouter des images dans la base de données</h1>

           <form onSubmit={handleSubmit}
           className='flex flex-col justify-center items-center'>
            <div className='py-2'>

            <label htmlFor='name'
                className='pr-5' >
                    Nom de l'image
            </label>
            <input 
                value={postImage.name}
                onChange={handleChange}
                name='name'
                type='name'
                placeholder="Le nom de l'image"
                className={`border-2 rounded-md text-black`}
            />
            </div>

            <div className='py-2'>
                <label htmlFor='titleFrom'
                    className='pr-5' >
                        Titre de l'oeuvre
                </label>
                <input 
                    value={postImage.titleFrom}
                    onChange={handleChange}
                    name='titleFrom'
                    type='text'
                    placeholder="Le nom de l'oeuvre"
                    className={`border-2 rounded-md text-black `}
                />
            </div>

            <div className='py-2'>
                    <label htmlFor='userOwner'
                    className='pr-7'>
                        Votre pseudo
                    </label>
                    <input 
                    value={postImage.userOwner}
                    onChange={handleChange}
                    name='userOwner'
                    type='text'
                    placeholder='Votre pseudo'
                    className={`border-2 rounded-md text-black`}
                    />
            </div>

            <div className='py-2'>
                <label htmlFor="file-upload" className='custom-file-upload'>
                <img src={postImage.image} alt="" />
                Votre image
                </label>
                
                <input 
                type="file"
                lable="Image"
                name="image"
                accept='.jpeg, .png, .jpg, .webp'
                onChange={(e) => handleFileUpload(e)}
                className={`border-2 rounded-md text-white`}
                />

            </div>
            <div className='py-2'>

                <label htmlFor='imageSrc'
                className='pr-5' >
                Lien URL de la source de l'image
                </label>
                <input 
                value={postImage.imageSrc}
                onChange={handleChange}
                name='imageSrc'
                type='text'
                placeholder="Lien du site de l'image"
                className={`border-2 rounded-md text-black`}
                />
            </div>

            <div className='py-2'>

                <label htmlFor='imageAuthor'
                className='pr-5'>
                    Nom de l'auteur à créditer
                </label>
                <input 
                value={postImage.imageAuthor}
                onChange={handleChange}
                name='imageAuthor'
                type='text'
                placeholder="Le nom de l'auteur/ site"
                className={`border-2 rounded-md text-black `}
                />
            </div>

           
            <div className='flex justify-center mt-5 space-x-5'>
                <button type='submit'
                className='border-2 rounded-md px-4 py-2 cursor-pointer'>Soumettre</button>
            </div>

                </form>
        </article>
        <hr className='mt-10 mb-10'/>
        <BackImg />
    </section>
  )
}