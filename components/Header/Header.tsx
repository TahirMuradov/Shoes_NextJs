"use client"
import { Locale } from "@/i18n-config";
import React, { use, useEffect, useState } from 'react';
import logo from '../../public/İSTANBUL.png';
import Image from 'next/image';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Link from 'next/link';

import { PhoneCallback } from '@mui/icons-material';
import {  useAppDispatch, useAppSelector } from '@/hooks/hooks';
import CartType from '@/types/CartTypes/Cart.type';
import { fetchInitialState } from '@/redux/cartSlice';
import LocaleSwitcher from '../locale-switcher/Locale-switcher';

import { HeaderLaunguage } from "@/types/DictionaryTypes/Dictionary";
import HeaderUserBox from "../HeaderUserBox/HeaderUserBox";


const Header:React.FC<{lang:Locale,dictionary:HeaderLaunguage}>= ({lang,dictionary}) => {

  const [visible,SetVisible]=useState<Boolean>(false);
    let cartInfo:CartType=useAppSelector((state)=>state.cart);
   
    let dispatch=useAppDispatch();
    useEffect(() => {
     
      dispatch(fetchInitialState());
    }, [dispatch]);
   
  
  
    function CartListToogle(){
      document.body.classList.toggle("cart-data-open")
    }
  function ToggleMenu(){
  visible?SetVisible(false):SetVisible(true);
  
  }

  return (
     <header className="header_area">

    <div className="top_header_area">
    <div className="w-[80%] mx-auto h-full">
      <div className="lg:flex h-full lg:items-center lg:justify-end grid grid-cols-4">
      <div className='laungugage_box lg: w-1/4 col-span-1'>
              <LocaleSwitcher lang={lang} dictionary={dictionary.LaunguageSwitcher}/>
              </div>
        <div className="w-full lg:w-3/4 col-span-3">
          <div className="top_single_area grid grid-cols-2 gap-3 lg:flex lg:items-center lg:justify-between">
            <div className="top_logo col-span-1">
              <a href="#">
                <Image src={logo} alt={dictionary.logoAltText} />
              </a>
            </div>
            <div className="header-cart-menu flex items-center">
              <div className="cart mx-2">
                <a type='button' id="header-cart-btn" className='cursor-pointer' onClick={CartListToogle}>
                  <span className="cart_quantity">{cartInfo.totalQuantity}</span>{' '}
                 <ShoppingBagOutlinedIcon/> 
                 <span className='hidden lg:inline-block'>
              {dictionary.cart.yourBag} ${cartInfo.totalAmount.toFixed(2)}
                  </span> 
                </a>

                <ul className="cart-list z-50">
                  {
                    cartInfo.items.map((item, index) => (
                      <li key={index}>
                      <a href="#" className="image">
                        <Image src={`${item.imgUrl}`} width={100} height={100} className="cart-thumb" alt="Product 10" />
                      </a>
                      <div className="cart-item-desc">
                        <h6>
                          <a href="#">{item.name}</a>
                        </h6>
                        <p>
                          {item.count}x - {item.size} -<span className="price">{item.price.toFixed(2)}</span>
                        </p>
                      </div>
                      <span className="dropdown-product-remove">
                        <i className="icon-cross"></i>
                      </span>
                    </li>
                    ))
                  }
               
                
                  <li className="total">
                    <span className="pull-right">Total: ${cartInfo.totalAmount.toFixed(2)}</span>
                    <Link href={`/${lang}/cart`} className="font-bold py-2 mx-2 px-4 rounded btn-cart">
                    {dictionary.cart.cart}
                    </Link>
                    <Link href={`/${lang}/checkout`} className="font-bold py-2 px-4 rounded btn-checkout">
                    {dictionary.cart.checkout}
                    </Link>
                   
                  </li>
                </ul> 
              </div>
           
            
            </div>
         
         
              <div className='mx-2 p-2'>

<HeaderUserBox/>

</div>
              <div className="ml-15 block lg:hidden col-start-2">
                <button type='button' onClick={ToggleMenu}>
                <MenuOutlinedIcon/>
                </button>
          </div>
              </div>
        </div>
     
      </div>
    </div>
  </div>

  <div className={`main_header_area transition-all duration-500 overflow-hidden  h-0 lg:h-[150px] ${visible?'h-[350px]':'h-0'}`}>
    <div className="container h-full mx-auto">
      <div className="flex h-full">
        <div className="w-full lg:flex lg:justify-between text-center">
          <div className="header-social-area">
          
            <a href="#">
             <FacebookIcon/>
            </a>
            <a href="#">
              <InstagramIcon/>
            </a>
         
          </div>

          <div className="main-menu-area">
            <nav className="">
             

              <div
                className=""
                id="karl-navbar"
              >
                <ul className="animated lg:flex z-40" id="nav">
                  <li className="mx-3">
                    <Link className="nav-link" href={`/${lang}/`}>
                   {dictionary.menu.home}
                    </Link>
                  </li>
                 
                  <li className="mx-3">
                    <Link className="" href={`/${lang}/shop`}>
                {dictionary.menu.shop}
                    </Link>
                  </li>
         
                  <li className="mx-3">
                  <Link className="" href={`/${lang}/contact`}>
                  {dictionary.menu.contact}
                    </Link>
                  </li>
                  
                  <li className="mx-3">
                  <Link className="" href={`/${lang}/cart`}>
                  {dictionary.menu.cartDetail}
                    </Link>
                  </li>
              
                </ul>
              </div>
            </nav>
           
          </div>

          <div className="help-line">
            <a href="tel:+994552784344">
             <PhoneCallback/> +994 55 278 43 44
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
     </header>)
};

export default Header;
