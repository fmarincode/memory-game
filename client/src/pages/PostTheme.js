import React, {useState, useEffect} from 'react';
import { useFormik } from "formik";
import { createThemeSchema } from '../schemas';
import axios from 'axios';
import {Link} from "react-router-dom"
import BackImg from '../components/BackImg';

export default function PostTheme() {

    const [themeCreation, setThemeCreation] = useState(false)
    const [themeData, setThemeData] = useState([])
    const [themeList, setThemeList] = useState([])
    const [alreadyInList, setAlreadyInList] = useState(false)
    const [newThemeName, setNewThemeName] = useState("")

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/themes/")
        console.log(response.data)
        setThemeData(response.data)
      } catch (error) {
        console.err(error)
      }
    }
    fetchThemeData()
  },[])

  const removeAccent = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

  useEffect(() => {
    if (themeData) {
      const names = themeData.map(theme => removeAccent(theme.name).toLowerCase().replace(/[\s-]/g, '')) // no accent, no space, no -
      setThemeList(names); // Set themeList to the extracted names from themeData
    }
  }, [themeData]);

 
    const onSubmit = async (values, actions) => {
        try {
            const normalizedName = values.name.toLowerCase().replace(/[\s-]/g, '');

            if (themeList.includes(removeAccent(normalizedName))) {
              
                setAlreadyInList(true)
            return; 
      }

          await axios
          .post("http://localhost:8000/themes/", values)
          setThemeCreation(true)
          setNewThemeName(values.name)
          console.log("its ok, theme created")
          actions.resetForm()
          
      } catch (err){
          console.error(err)
      }
    }
      

  const formik = useFormik({
    initialValues:{
        name: "",
        media: "",
        userOwner: "",
    },
    validationSchema: createThemeSchema,
    onSubmit,
})

const handleBool = () => {
    setThemeCreation(false) 
    setAlreadyInList(false)
}

  return (
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)]'>
        <article className='flex flex-col items-center'>
            <h1 className='mb-5'>Ajouter un nouveau thème de jeu</h1>
            {themeCreation && <p>Ton thème a été ajouté ! N'oublie pas d'y ajouter des images</p>}
            <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col justify-center items-center'>
            <div className='py-2'>

                <label htmlFor='name'
                className='pr-5' >
                    Nom de l'oeuvre
                </label>
                <input 
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onMouseUp={handleBool}
                name='name'
                type='name'
                placeholder="Le nom de l'oeuvre"
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
                <label htmlFor='media'
                    className='pr-5' >
                        Type d'oeuvre
                </label>
                <select 
                    value={formik.values.media}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='media'
                    type='text'
                    className={`border-2 rounded-md text-black ${formik.errors.media && formik.touched.media ? "border-[#bd5c5c]" : ""}`}
                >
                    <option
                    value=""
                    label='Select'></option>
                    <option
                    value="Série"
                    label='Série'></option>
                    <option
                    value="Film"
                    label='Film'></option>
                    <option
                    value="Animé"
                    label='Animé'></option>
                    <option
                    value="BD"
                    label='BD'></option>
                    <option
                    value="Autre"
                    label='Autre'></option>
                    </select>
        </div>
            {formik.errors.media && formik.touched.media && ( 
                <p
                className='text-[#bd5c5c]'>
                {formik.errors.media}
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
        <Link to={"/addContent"}
        className='border-2 bg-green-300 text-black font-semibold rounded-md px-4 py-2 cursor-pointer mt-5'>
        Ajouter des images
        </Link>
            {alreadyInList && <p className='mt-3'>Cette oeuvre existe déjà dans notre liste de thèmes, tu peux y ajouter des images ou refaire le thème à ton goût mais en modifiant le nom.</p>}

        </article>
        <hr className='mt-10 mb-10 bg'/>

        {themeCreation && <div><BackImg 
        newThemeName={newThemeName}/></div>}
    </section>
  )
}