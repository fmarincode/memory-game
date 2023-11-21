import React, {useContext, useState, useEffect} from 'react'
import { useFormik } from "formik";
import { loginSchema } from '../schemas';
import axios from 'axios';
import { useCookies } from "react-cookie";
import {Link, useNavigate} from "react-router-dom"
import AuthContext from '../Contexts/auth/AuthProvider';
import UserRegister from './UserRegister';

function UserLogin() {

    const [cookies, setCookies, removeCookie] = useCookies(["access_token"])
    const {auth, setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const url = "https://memorycardgame.onrender.com"
    const [registerForm, setRegisterForm] = useState(false)
    const onSubmit = async (values, actions) => {
        
      try {
        const response = await axios
        .post(`${url}/user/userlogin`, values)
        const expirationDate = new Date(Date.now() + 7200000);
        setCookies("access_token", response.data.token, { expires: expirationDate });
        window.localStorage.setItem("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        window.localStorage.setItem("role", response.data.role);
        window.localStorage.setItem("username", response.data.username);
        window.localStorage.setItem("expirationDate", expirationDate.toISOString());

       
        setAuth({ userID: response.data.userID, role: response.data.role, token: response.data.token, username: response.data.username, expirationDate: expirationDate });
        actions.resetForm()
        navigate("/")
        
    } catch (err){
        console.error(err)
    }
    }
    useEffect(() => {
        // Lors du chargement de la page, vérifiez le stockage local
        const checkLocalStorage = () => {
            const storedToken = window.localStorage.getItem("access_token");
            const storedUserID = window.localStorage.getItem("userID");
            const storedRole = window.localStorage.getItem("role");
            const storedUsername = window.localStorage.getItem("username");
            const expirationDate = window.localStorage.getItem("expirationDate");
      
            if (storedToken && storedUserID && storedRole && storedUsername && expirationDate) {
              const currentDateTime = new Date();
              const storedExpirationDate = new Date(expirationDate);
      
              if (currentDateTime < storedExpirationDate) {
                setAuth({ userID: storedUserID, role: storedRole, token: storedToken, username: storedUsername, expirationDate: expirationDate });
              } else {
                // Clear localStorage if the token has expired
                window.localStorage.removeItem("access_token");
                window.localStorage.removeItem("userID");
                window.localStorage.removeItem("role");
                window.localStorage.removeItem("username");
                window.localStorage.removeItem("expirationDate");
                setAuth({})
              }
            }
          };
      
          checkLocalStorage();
        }, []);



    
    const formik = useFormik({
        initialValues:{
            username: "",
            password: "",
            confirmPassword:"",
        },
        validationSchema: loginSchema,
        onSubmit,
    })

        
    const handleRegisterForm = (e) => {
        e.preventDefault()
        setRegisterForm(!registerForm)
    }

    return (
        <>
        {!registerForm ? (
            <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20'>
            <article className='text-center flex flex-col justify-center items-center'>

            <div className='border-2 border-[#ccc1c1] p-5 rounded-lg md:w-96 md:h-80'>
                <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col justify-center items-start'>
                    <div className='py-2'>
        
                        <label htmlFor='username'
                        className='md:inline-block md:text-right md:w-28' >
                            Pseudo
                        </label>
                        <input 
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='username'
                        type='username'
                        placeholder='Votre pseudo'
                        className={`border-2 rounded-md text-black ml-5 ${formik.errors.username && formik.touched.username ? "border-[#bd5c5c]" : ""}`}
                        />
                    </div>
                    {formik.errors.username && formik.touched.username && ( 
                    <p
                    className='text-[#bd5c5c] self-center'>
                        {formik.errors.username}
                    </p>)}
                        <div className='py-2'>
                            <label htmlFor='password'
                            className='md:inline-block md:text-right md:w-28' >
                                Mot de passe
                            </label>
                            <input 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='password'
                            type='password'
                            placeholder='Votre mot de passe'
                            className={`border-2 rounded-md text-black ml-5 ${formik.errors.password && formik.touched.password ? "border-[#bd5c5c]" : ""}`}
                            />
                        </div>
                    {formik.errors.password && formik.touched.password && ( 
                    <p
                    className='text-[#bd5c5c] self-center'>
                        {formik.errors.password}
                    </p>)}
        
                        <div className='py-2'>
                            <label htmlFor='confirmPassword'
                            className='md:inline-block md:text-right md:w-28'>
                                Confirmez le mot de passe
                            </label>
                            <input 
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='confirmPassword'
                            type='password'
                            placeholder='Votre mot de passe'
                            className={`border-2 rounded-md text-black ml-5 ${formik.errors.confirmPassword && formik.touched.confirmPassword ? "border-[#bd5c5c]" : ""}`}
                            />
                        </div>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && ( 
                    <p
                    className='text-[#bd5c5c] self-center'>
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
                <article className='pt-1'> <p>Pas encore inscris ? Rejoins nous en <span onClick={handleRegisterForm} className='underline cursor-pointer'>cliquant ici</span></p></article>
                           
            </article>
    
        </section>
        ) : (
            <>
            <UserRegister />
            </>
            )}
        </>
      )
    }

export default UserLogin