'use client'
import React, { useState } from 'react'
import logo from '../../public/İSTANBUL.png'
import Image from 'next/image'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import Link from 'next/link';
import { Button, ButtonGroup } from '@mui/material';
import { Headphones } from '@mui/icons-material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
const Header = () => {
  const [ToggleMenu,setToggleMenu]=useState<Boolean>(false)
  function toggleMenu(){
ToggleMenu?setToggleMenu(false):setToggleMenu(true);
console.log(ToggleMenu)
  }
  return (
    <header className='w-full h-auto bg-white'>
       <div className="topheader w-full lg:w-3/5 mx-auto">
       
        <div className="item-box w-full flex justify-between items-center p-3">
        <div className="bag ms-9 w-[100px] flex justify-center items-center relative">
<span className='absolute top-[50%] left-0 text-white bg-red-500 w-5 h-5 text-center rounded-[50%]'>1</span>
<ShoppingBagIcon className='text-black'/>
<p className='text-black'>Your Bag</p>
</div>     
<div className="logo w-2/5 flex justify-end">
<div className="img_box relative h-[70px] w-[200px]">
    <Image alt='istanbulShoesLogo' fill src={logo}/>
</div>
</div>
<div onClick={toggleMenu} className='bars cursor-pointer'>

<DensityMediumIcon className='text-black block lg:hidden'/>
  </div>
        </div>
       </div>
        
        <div className={`bottom_header ${ToggleMenu?'opacity-100':'hidden opacity-0'} transition duration-700 ease-in-out  w-4/5  lg:opacity-100  h-auto pb-32 p-2 mx-auto lg:grid lg:grid-cols-3 lg:gap-4 text-center`}>
<div className="social_networks text-black ">
<InstagramIcon/>
<FacebookIcon/>
</div> 

<nav className="navbar">
<ul className='lg:grid lg:grid-cols-3 gap-3 '>
  <li><Link href='/' className='text-black'>Home</Link></li>
  <li><Link href='/' className='text-black'>Shop</Link></li>
  <li><Link href='/' className='text-black'>Contact</Link></li>
</ul>
</nav>
<div className="help_line">
<Button variant="outlined" color='error'> <Headphones className='mx-2'/>+994552784344</Button>
</div>
        </div>
        </header>
  )
}

export default Header