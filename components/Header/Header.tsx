'use client';
import React, { useState } from 'react';
import logo from '../../public/İSTANBUL.png';
import product1 from '../../public/img/product-img/product-1.jpg';
import product10 from '../../public/img/product-img/product-10.jpg';
import product11 from '../../public/img/product-img/product-11.jpg';
import Image from 'next/image';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Link from 'next/link';

import { PhoneCallback } from '@mui/icons-material';


const Header = () => {
  const [visible,SetVisible]=useState<Boolean>(false);
  function CartListToogle(){
    document.body.classList.toggle("cart-data-open")
  }
function ToggleMenu(){
visible?SetVisible(false):SetVisible(true);
console.log(visible)
}

  return (
    <header className="header_area">
      <div className="top_header_area">
        <div className="w-[80%] mx-auto h-full">
          <div className="flex h-full items-center justify-end">
            <div className="w-full lg:w-3/4">
              <div className="top_single_area grid grid-cols-2 gap-3 lg:flex lg:items-center lg:justify-between">
                <div className="top_logo col-span-1">
                  <a href="#">
                    <Image src={logo} alt="Logo" />
                  </a>
                </div>
                <div className="header-cart-menu flex items-center">
                  <div className="cart">
                    <a type='button' id="header-cart-btn" className='cursor-pointer' onClick={CartListToogle}>
                      <span className="cart_quantity">2</span>{' '}
                     <ShoppingBagOutlinedIcon/> Your Bag $20
                    </a>

                    <ul className="cart-list z-50">
                      <li>
                        <a href="#" className="image">
                          <Image src={product10} className="cart-thumb" alt="Product 10" />
                        </a>
                        <div className="cart-item-desc">
                          <h6>
                            <a href="#">Women's Fashion</a>
                          </h6>
                          <p>
                            1x - <span className="price">$10</span>
                          </p>
                        </div>
                        <span className="dropdown-product-remove">
                          <i className="icon-cross"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#" className="image">
                          <Image src={product11} className="cart-thumb" alt="Product 11" />
                        </a>
                        <div className="cart-item-desc">
                          <h6>
                            <a href="#">Women's Fashion</a>
                          </h6>
                          <p>
                            1x - <span className="price">$10</span>
                          </p>
                        </div>
                        <span className="dropdown-product-remove">
                          <i className="icon-cross"></i>
                        </span>
                      </li>
                      <li className="total">
                        <span className="pull-right">Total: $20.00</span>
                        <a href="cart.html" className="font-bold py-2 mx-2 px-4 rounded btn-cart">
                          Cart
                        </a>
                        <a href="checkout-1.html" className="font-bold py-2 px-4 rounded btn-checkout">
                          Checkout
                        </a>
                      </li>
                    </ul>
                  </div>
                
                
                </div>
                <div className='laungugage_box mx-2'>
                    <select name="launguage" id="launguage">

                      <option value="az">AZ</option>
                      <option value="az">Ru</option>
                      <option value="az">EN</option>
                    </select>
                  </div>
             
                  <div className="ml-15 block lg:hidden">
                    <button type='button' onClick={ToggleMenu}>
                    <MenuOutlinedIcon/>
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`main_header_area transition-all overflow-hidden h-0 lg:h-[150px] ${visible?'h-auto':'h-0'}`}>
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
                        <Link className="nav-link" href="/">
                          Home
                        </Link>
                      </li>
                     
                      <li className="mx-3">
                        <Link className="" href="/">
                          Dresses
                        </Link>
                      </li>
                      <li className="mx-3">
                        <Link className="" href="/">
                           Shoes
                        </Link>
                      </li>
                      <li className="mx-3">
                        <Link className="" href="/">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="help-line">
                <a href="tel:+346573556778">
                 <PhoneCallback/> +34 657 3556 778
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
