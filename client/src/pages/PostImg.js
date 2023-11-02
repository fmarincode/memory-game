import React from 'react';
import { useFormik } from "formik";
import { createImageSchema } from '../schemas';
import axios from 'axios';

export default function PostImg() {


    const onSubmit = async (values, actions) => {
        const normalizedTitleFrom = values.titleFrom.toLowerCase().replace(/[\s-]/g, ''); //tout en minuscule, sans espace ni tiret.
        try {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('titleFrom', normalizedTitleFrom);
          formData.append('userOwner', values.userOwner);
          formData.append('imageSrc', values.imageSrc);
          formData.append('imageAuthor', values.imageAuthor);
          formData.append('image', values.image); // Le champ "image" est maintenant un FormData
      
          await axios.post("http://localhost:8000/images/add", formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Définissez le type de contenu comme multipart/form-data
            },
          });
      
          console.log("tu as ajouté une image");
          actions.resetForm();
        } catch (err) {
          console.error(err);
        }
      };
      

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue('image', file);
  
    // Créez un objet FormData pour envoyer le fichier
    const formData = new FormData();
    formData.append('image', file);
  
    // Mettez à jour les valeurs de Formik avec FormData (sauf le champ "image")
    formik.setValues((values) => {
      const { image, ...otherValues } = values;
      return otherValues;
    });
  
    // Mettez à jour la valeur du champ "image" dans Formik
    formik.setFieldValue('image', formData.get('image'));
  };
  


  const formik = useFormik({
    initialValues:{
        name: "",
        titleFrom: "",
        image:"",
        userOwner: "",
        imageSrc: "",
        imageAuthor: "",
    },
    validationSchema: createImageSchema,
    onSubmit,
})

  return (
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)]'>
        <article className='flex flex-col items-center'>
            <h1 className='mb-5'>Ajouter des images dans la base de données</h1>
            <form
            onSubmit={formik.handleSubmit}
            encType='multipart/form-data'
            className='flex flex-col justify-center items-center'>
            <div className='py-2'>

                <label htmlFor='name'
                className='pr-5' >
                    Nom de l'image
                </label>
                <input 
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='name'
                type='name'
                placeholder="Le nom de l'image"
                className={`border-2 rounded-md text-black ${formik.errors.name && formik.touched.name ? "border-[#bd5c5c]" : ""}`}
                />
        </div>
        {formik.errors.name && formik.touched.name && ( 
            <p
            className='text-[#bd5c5c]'>
                {formik.errors.name}
            </p>)
        }

        <div className='py-2'>
                <label htmlFor='titleFrom'
                    className='pr-5' >
                        Titre de l'oeuvre
                </label>
                <input 
                    value={formik.values.titleFrom}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='titleFrom'
                    type='text'
                    placeholder="Le nom de l'oeuvre"
                    className={`border-2 rounded-md text-black ${formik.errors.titleFrom && formik.touched.titleFrom ? "border-[#bd5c5c]" : ""}`}
                />
        </div>
            {formik.errors.titleFrom && formik.touched.titleFrom && ( 
                <p
                className='text-[#bd5c5c]'>
                {formik.errors.titleFrom}
                </p>)
            }

        <div className='py-2'>
                    <label htmlFor='userOwner'
                    className='pr-7'>
                        Votre pseudo
                    </label>
                    <input 
                    value={formik.values.userOwner}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='userOwner'
                    type='text'
                    placeholder='Votre pseudo'
                    className={`border-2 rounded-md text-black ${formik.errors.userOwner && formik.touched.userOwner ? "border-[#bd5c5c]" : ""}`}
                    />
        </div>
            {formik.errors.userOwner && formik.touched.userOwner && ( 
                <p
                className='text-[#bd5c5c]'>
                {formik.errors.userOwner}
                </p>)
            }
             <div className='py-2'>

                <label htmlFor='image'
                className='pr-5' >
                    Votre image
                </label>
                <input 
                
                onBlur={formik.handleBlur}
                onChange={(e) => handleImageChange(e, formik.setFieldValue)}
                name='image'
                type='file'
                accept='image/*'
                className={`border-2 rounded-md text-white${formik.errors.image && formik.touched.image ? "border-[#bd5c5c]" : ""}`}
                />
        </div>
        {formik.errors.image && formik.touched.image && ( 
            <p
            className='text-[#bd5c5c]'>
                {formik.errors.image}
            </p>)
        }

        <div className='py-2'>

            <label htmlFor='imageSrc'
            className='pr-5' >
            Lien URL de la source de l'image
            </label>
            <input 
            value={formik.values.imageSrc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='imageSrc'
            type='text'
            placeholder="Lien du site de l'image"
            className={`border-2 rounded-md text-black ${formik.errors.imageSrc && formik.touched.imageSrc ? "border-[#bd5c5c]" : ""}`}
            />
        </div>
        {formik.errors.imageSrc && formik.touched.imageSrc && ( 
            <p
            className='text-[#bd5c5c]'>
            {formik.errors.imageSrc}
            </p>)
        }

        <div className='py-2'>

            <label htmlFor='imageAuthor'
            className='pr-5' >
                Nom de l'auteur à créditer
            </label>
            <input 
            value={formik.values.imageAuthor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='imageAuthor'
            type='text'
            placeholder="Le nom de l'auteur/ site"
            className={`border-2 rounded-md text-black ${formik.errors.imageAuthor && formik.touched.imageAuthor ? "border-[#bd5c5c]" : ""}`}
            />
        </div>
        {formik.errors.imageAuthor && formik.touched.imageAuthor && ( 
            <p
            className='text-[#bd5c5c]'>
            {formik.errors.imageAuthor}
            </p>)
        }

        <div className='flex justify-center mt-5 space-x-5'>
            <button
            id='submitImg'
            type='submit'
            disabled={formik.isSubmitting}
            className='border-2 rounded-md px-4 py-2 cursor-pointer'>
            Soumettre
            </button>
        </div>
            </form>

        </article>
    </section>
  )
}
