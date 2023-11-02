import React from 'react'
import { useFormik } from "formik";
import { loginSchema } from '../schemas';
import axios from 'axios';
import { useCookies } from "react-cookie";
import {Link} from "react-router-dom"

function AdminLog() {



  const [cookies, setCookies] = useCookies(["access_token"])

    const onSubmit = async (values, actions) => {
      try {
        const response = await axios
        .post("http://localhost:8000/adminlogin", values)
        console.log("you're logged")

        setCookies("access_token", response.data.token)
        window.localStorage.setItem("userID", response.data.userID)
        actions.resetForm()
        
    } catch (err){
        console.error(err)
    }
}
    
    const formik = useFormik({
        initialValues:{
            username: "",
            password: "",
            confirmPassword:"",
        },
        validationSchema: loginSchema,
        onSubmit,
    })


    return (
    <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)]'>
        <article>

        <h3 className='text-center font-semibold text-lg mb-5'>Admin connexion</h3>
        <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-center items-center'>
            <div className='py-2'>

                <label htmlFor='username'
                className='pr-5' >
                    Username
                </label>
                <input 
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='username'
                type='username'
                placeholder='Votre username'
                className={`border-2 rounded-md text-black ${formik.errors.username && formik.touched.username ? "border-[#bd5c5c]" : ""}`}
                />
            </div>
            {formik.errors.username && formik.touched.username && ( 
            <p
            className='text-[#bd5c5c]'>
                {formik.errors.username}
            </p>)}
                <div className='py-2'>
                    <label htmlFor='password'
                    className='pr-5' >
                        Password
                    </label>
                    <input 
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='password'
                    type='password'
                    placeholder='Votre password'
                    className={`border-2 rounded-md text-black ${formik.errors.password && formik.touched.password ? "border-[#bd5c5c]" : ""}`}
                    />
                </div>
            {formik.errors.password && formik.touched.password && ( 
            <p
            className='text-[#bd5c5c]'>
                {formik.errors.password}
            </p>)}

                <div className='py-2'>
                    <label htmlFor='confirmPassword'
                    className='pr-7'>
                        Confirm
                    </label>
                    <input 
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirmez votre password'
                    className={`border-2 rounded-md text-black ${formik.errors.confirmPassword && formik.touched.confirmPassword ? "border-[#bd5c5c]" : ""}`}
                    />
                </div>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && ( 
            <p
            className='text-[#bd5c5c]'>
                {formik.errors.confirmPassword}
            </p>)}

                <div className='flex justify-center mt-5 space-x-5'>
                    <button
                    id='submitAdminLogBtn'
                    type='submit'
                    disabled={formik.isSubmitting}
                    className='border-2 rounded-md px-4 py-2 cursor-pointer'>
                        Se connecter
                    </button>
                    {cookies && 

                        <Link
                        to={"/addContent"}
                        className='border-2 bg-green-300 text-black font-semibold rounded-md px-4 py-2 cursor-pointer'>
                            Ajouter du contenu
                        </Link>
                    }
                </div>
        </form>
        </article>

    </section>
  )
}

export default AdminLog