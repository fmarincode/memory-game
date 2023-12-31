import React, {useState, useEffect, useContext} from 'react';
import { useFormik } from "formik";
import { createThemeSchema } from '../schemas';
import axios from 'axios';
import AuthContext from '../Contexts/auth/AuthProvider';


export default function AddTheme() {
    const [themeCreation, setThemeCreation] = useState(false)
    const [themeData, setThemeData] = useState([])
    const [themeList, setThemeList] = useState([])
    const [alreadyInList, setAlreadyInList] = useState(false)
    const [newThemeName, setNewThemeName] = useState("")
    const {auth} = useContext(AuthContext)
    const url = "https://memorycardgame.onrender.com"

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response = await axios.get(`${url}/themes/`)
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
      const names = themeData.map(theme => removeAccent(theme.name).toLowerCase().replace(/[\s-]/g, ''))
      setThemeList(names); 
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
          .post(`${url}/themes/`, values)
          setThemeCreation(true)
          setNewThemeName(values.name)
          actions.resetForm()
          
      } catch (err){
          console.error(err)
      }
    }
      

  const formik = useFormik({
    initialValues:{
        name: "",
        media: "",
        userOwner: auth.username,
    },
    validationSchema: createThemeSchema,
    onSubmit,
})

const handleBool = () => {
    setThemeCreation(false) 
    setAlreadyInList(false)
}



  return (
    
    <>
    <article className='md:flex md:flex-col md:items-center md:space-y-5'>
            {themeCreation && <p>Ton thème a été ajouté ! N'oublie pas d'y ajouter des images</p>}
            <div className='border-2 border-[#ccc1c1] p-5 rounded-lg'>
            <h1 className='mb-5 text-center'>Ajouter un nouveau thème de jeu</h1>
            <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col justify-center items-start'>
            <div className='py-2 flex flex-col self-center md:block md:self-start'>

                <label htmlFor='name'
                className='text-center md:inline-block md:text-right md:w-40'>
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
                className={`border-2 rounded-md text-white text-center md:ml-5 ${formik.errors.name && formik.touched.name ? "border-[#bd5c5c]" : ""}`}
                />
        </div>
        {formik.errors.name && formik.touched.name && ( 
            <p
            className='text-[#bd5c5c]'>
                {formik.errors.name}
            </p>)
        }
        

        <div className='py-2 flex flex-col self-center md:block md:self-start'>
                <label htmlFor='media'
                    className='text-center md:inline-block md:text-right md:w-40' >
                        Type d'oeuvre
                </label>
                <select 
                    value={formik.values.media}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='media'
                    type='text'
                    className={`border-2 rounded-md text-center text-white md:ml-5 ${formik.errors.media && formik.touched.media ? "border-[#bd5c5c]" : ""}`}
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
                    value="Musique"
                    label='Musique'></option>
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

        

        <div className='flex self-center mt-5 space-x-5'>
            <button
            id='submitImg'
            type='submit'
            disabled={formik.isSubmitting}
            className='border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-[--fourthColor] hover:text-[--firstColor] font-bold '>
            Soumettre
            </button>
        </div>
            </form>
            </div>
            {alreadyInList && <>
              <p className='mt-3 text-center w-96'>Cette oeuvre existe déjà dans notre liste de thèmes. </p>
              <p className='mt-3 text-center w-96'>Pour refaire le thème à ton goût, tu dois en créer un nouveau en modifiant le nom.</p>
              </>}
            
        </article>

</>
  
  )
}
