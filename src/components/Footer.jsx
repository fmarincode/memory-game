import React from 'react';
import { Link } from "react-router-dom";
import {LuMousePointerClick} from 'react-icons/lu';

function Footer() {
  return (
    <section className='h-10 bg-[--firstColor] text-[--secondColor] font-bold relative bottom-0 mt-auto text-center border-t-2 border-[--secondColor] flex justify-center'><Link to={"/copyright"}className='flex justify-center space-x-5 items-center cursor-pointer'><p>Images Copyright </p><LuMousePointerClick className='text-xl'/></Link></section>
  )
}

export default Footer