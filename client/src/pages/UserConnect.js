import React from 'react'
import UserLogin from '../components/Userlogin'
import { GoArrowRight } from "react-icons/go";

function UserConnect() {


    return (
        <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-70px)]'>
            <article className='text-center flex flex-col justify-center items-center md:w-full'>
    
            <h1 className='text-center font-semibold text-xl mb-5'>S'inscrire / Se connecter</h1>
            
            <p className='flex'> <span><GoArrowRight className='text-xl pt-1 text-orange-500'/></span> &ensp; Pourquoi créer un compte et s'y connecter ?</p>
            <p className='flex'> <span><GoArrowRight className='text-xl pt-1 text-orange-500'/></span> &ensp; Ce compte vous permettra de créer votre propre thème de jeu et de le conserver.</p>
            <div className='flex'>
                <UserLogin />
            </div>
            </article>
    
        </section>
      )
    }

export default UserConnect