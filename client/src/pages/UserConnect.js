import React from 'react'
import UserLogin from '../components/Userlogin'
import UserRegister from '../components/UserRegister'

function UserConnect() {


    return (
        <section className='flex flex-col bg-[--firstColor] text-[--secondColor] px-5 pt-20 md:min-h-[calc(100vh-40px)]'>
            <article className='text-center flex flex-col justify-center items-center md:w-full'>
    
            <h3 className='text-center font-semibold text-lg mb-5'>User connexion</h3>
            <p>Pourquoi créer un compte et s'y connecter ?</p>
            <p>Ce compte vous permettra de créer votre propre thème de jeu et de le conserver.</p>
            <div className='flex'>
                <UserRegister />
                <UserLogin />
            </div>
            </article>
    
        </section>
      )
    }

export default UserConnect