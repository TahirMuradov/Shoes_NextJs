'use client'
import React from 'react';
import Slider from "react-slick";
import bg1 from '../../public/img/bg-img/bg-1.jpg';
import bg2 from '../../public/img/bg-img/bg-2.jpg';
import bg3 from '../../public/img/bg-img/bg-3.jpg';
import bg4 from '../../public/img/bg-img/bg-4.jpg';

import CartType from '@/types/CartTypes/Cart.type';
import { Locale } from '@/i18n-config';
import {  HomeSliderLaunguage } from '@/types/DictionaryTypes/Dictionary';
import GetAllHomeSliderItemType from '@/types/WebUI/HomeSliderItem/GetAllHomeSliderItemType';
import Link from 'next/link';





const slidesData = [
  {
    id: 1,
    heading: 'Moda Trendleri',
    buttonText: 'Şimdi Alışveriş Yap',
    buttonLink: '#',
    backgroundImage: bg1
  },
  {
    id: 2,
    heading: 'Yaz Koleksiyonu',
    buttonText: 'Koleksiyonu İncele',
    buttonLink: '#',
    backgroundImage: bg2
  },
  {
    id: 3,
    heading: 'Kadın Modası',
    buttonText: 'Koleksiyonu İncele',
    buttonLink: '#',
    backgroundImage: bg3
  },
  {
    id: 4,
    heading: 'Kadın Modası',
    buttonText: 'Koleksiyonu İncele',
    buttonLink: '#',
    backgroundImage: bg4
  }
];


interface HomeSliderParasm{
  local:Locale,
  dictinory:HomeSliderLaunguage,
  homeSliderItem:GetAllHomeSliderItemType[],
  apiDomen:string|undefined
}
const HomeSlider: React.FC<HomeSliderParasm> = (params:HomeSliderParasm) => {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



  return (
    <section className="welcome_area overflow-hidden w-full">
      <Slider {...settings} className="welcome_slides owl-carousel">
        {params.homeSliderItem.map(slide => (
          <div key={slide.id}>

          <div  className="single_slide h-[800px] bg-img background-overlay" style={{ backgroundImage: `url(${params.apiDomen}${slide.imageUrl})` }}>
            <div className="container m-auto my-auto h-full">
              <div className="flex h-full items-center justify-center">
                <div className="w-full" >
                  <div className="welcome_slide_text">
                    <h6 data-animation="bounceInDown" data-delay="0" data-duration="500ms">
                     {slide.title}
                    </h6>
                    <h2 data-animation="fadeInUp" className='sm:font-[38px]' data-delay="500ms" data-duration="500ms">
                      {slide.description}
                    </h2>
                    <Link
                      href={`${params.local}/shop`}
                      className="btn karl-btn"
                      data-animation="fadeInUp"
                      data-delay="1s"
                      data-duration="500ms"
                    >
                     {params.dictinory.button}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HomeSlider;
