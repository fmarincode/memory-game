import React, { useState } from 'react'
import { useFormik } from "formik";
import { registerSchema } from '../schemas';
import axios from 'axios';


function UserRegister() {
   
    const [registered, setRegistered] = useState(false)

    const onSubmit = async (values, actions) => {
      try {
        await axios
        .post("https://memorycardgame.onrender.com/user/userregister", values)
        actions.resetForm()
        setRegistered(true)
        
    } catch (err){
        console.error(err)
    }
}
    
    const formik = useFormik({
        initialValues:{
            username: "",
            password: "",
            role: "User"
        },
        validationSchema: registerSchema,
        onSubmit,
    })

    

    return (
        <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20'>
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
        
                        <div className='flex self-center mt-5 space-x-5'>
                            <button
                            type='submit'
                            disabled={formik.isSubmitting}
                            className='border-2 rounded-md px-4 py-2 cursor-pointer'>
                                S'inscrire
                            </button>
                           
                        </div>
                        {registered && <p className='mt-2'>Tu es bien enregistré ! Tu peux maintenant te connecter</p>}
                </form>
            </div>
            </article>
    
        </section>
      )
    }

export default UserRegister