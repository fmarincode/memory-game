import React from 'react';
import { Link } from "react-router-dom";
import {LuMousePointerClick} from 'react-icons/lu';

function Footer() {
  return (
    <section className='hidden md:h-10 md:bg-[--firstColor] md:text-[--fourthColor] md:font-bold md:relative md:bottom-0 md:mt-auto md:text-center md:border-t-2 md:border-[--secondColor] md:flex md:justify-center'><Link to={"/copyright"} className='md:flex md:justify-center md:space-x-5 md:items-center md:cursor-pointer'><p>Images Copyright </p><LuMousePointerClick className='md:text-xl md:text-[--secondColor]'/></Link></section>
  )
}

export default Footer