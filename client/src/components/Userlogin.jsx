import React from 'react'
import { useFormik } from "formik";
import { loginSchema } from '../schemas';
import axios from 'axios';
import { useCookies } from "react-cookie";
import {Link} from "react-router-dom"

function UserLogin() {

    const [cookies, setCookies, removeCookie] = useCookies(["access_token"])

    const onSubmit = async (values, actions) => {
      try {
        const response = await axios
        .post("http://localhost:8000/user/userlogin", values)
        console.log("you're logged")

        setCookies("access_token", response.data.token, { expires: new Date(Date.now() + 7200000) });
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

    
  const handleLogout = () => {
    // Supprime le cookie "access_token" pour se déconnecter
    removeCookie('access_token');
  };

    return (
        <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)]'>
            <article className='text-center flex flex-col justify-center items-center'>

            <div className='border-2 border-[#ccc1c1] p-5 rounded-lg md:w-96 md:h-64'>
                <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col justify-center items-start'>
                    <div className='py-2'>
        
                        <label htmlFor='username'
                        className='md:inline-block md:text-right md:w-28' >
                            Username
                        </label>
                        <input 
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='username'
                        type='username'
                        placeholder='Votre username'
                        className={`border-2 rounded-md text-black ml-5 ${formik.errors.username && formik.touched.username ? "border-[#bd5c5c]" : ""}`}
                        />
                    </div>
                    {formik.errors.username && formik.touched.username && ( 
                    <p
                    className='text-[#bd5c5c]'>
                        {formik.errors.username}
                    </p>)}
                        <div className='py-2'>
                            <label htmlFor='password'
                            className='md:inline-block md:text-right md:w-28' >
                                Password
                            </label>
                            <input 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='password'
                            type='password'
                            placeholder='Votre password'
                            className={`border-2 rounded-md text-black ml-5 ${formik.errors.password && formik.touched.password ? "border-[#bd5c5c]" : ""}`}
                            />
                        </div>
                    {formik.errors.password && formik.touched.password && ( 
                    <p
                    className='text-[#bd5c5c]'>
                        {formik.errors.password}
                    </p>)}
        
                        <div className='py-2'>
                            <label htmlFor='confirmPassword'
                            className='md:inline-block md:text-right md:w-28'>
                                Confirm
                            </label>
                            <input 
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirmez votre password'
                            className={`border-2 rounded-md text-black ml-5 ${formik.errors.confirmPassword && formik.touched.confirmPassword ? "border-[#bd5c5c]" : ""}`}
                            />
                        </div>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && ( 
                    <p
                    className='text-[#bd5c5c]'>
                        {formik.errors.confirmPassword}
                    </p>)}
        
                        <div className='flex self-center mt-5 space-x-5'>
                            <button
                            id='submitAdminLogBtn'
                            type='submit'
                            disabled={formik.isSubmitting}
                            className='border-2 rounded-md px-4 py-2 cursor-pointer'>
                                Se connecter
                            </button>
                        </div>
                </form>
            </div>
                            {cookies.access_token &&
                            <div className='mt-3 space-x-5'>
                                <button
                                onClick={handleLogout}
                                className="border-2 bg-red-300 text-black font-semibold rounded-md px-4 py-2 cursor-pointer"
                                >
                                Se déconnecter
                                </button>
                            
                                <Link
                                to="/addContent"
                                className="border-2 bg-green-300 text-black font-semibold rounded-md px-4 py-2 cursor-pointer"
                                >
                                Ajouter du contenu
                                </Link>
                            </div>
                            }
            </article>
    
        </section>
      )
    }

export default UserLogin