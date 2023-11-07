import React, {useState} from 'react';
import axios from 'axios';
import BackImg from "../components/BackImg"


export default function PostImg() {

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
            userOwner: postImage.userOwner,
            imageSrc: postImage.imageSrc,
            imageAuthor: postImage.imageAuthor,
          };

        await axios.post("http://localhost:8000/images/add", newImage)
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
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)] md:flex-row'>
        <article className='md:flex md:flex-col md:w-1/2 md:items-center md:space-y-5'>
        <h2>Aperçu de l'image</h2>
        {postImage.image && <img src={postImage.image} alt="image uploaded" />}
        </article>
        <article className='md:flex md:flex-col md:w-1/2 md:items-center md:space-y-5'>
            <h1 className='mb-5'>Ajouter une image dans la base de données</h1>
            <div className='border-2 border-[#ccc1c1] p-5 rounded-lg'>
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
                <input 
                    value={postImage.titleFrom}
                    onChange={handleChange}
                    name='titleFrom'
                    type='text'
                    placeholder="Le nom de l'oeuvre"
                    className="border-2 rounded-md text-black ml-5"
                />
            </div>

            <div className='py-2'>
                    <label htmlFor='userOwner'
                    className='md:inline-block md:text-right md:w-40'>
                        Votre pseudo :
                    </label>
                    <input 
                    value={postImage.userOwner}
                    onChange={handleChange}
                    name='userOwner'
                    type='text'
                    placeholder='Votre pseudo'
                    className="border-2 rounded-md text-black ml-5"
                    />
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
                className='border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-green-500'>Ajouter</button>
            </div>
            {imageAdded && <p className='flex self-center mt-1'>Image ajoutée !</p>}
                </form>
            </div>
            <BackImg />
        </article>

    </section>
  )
}