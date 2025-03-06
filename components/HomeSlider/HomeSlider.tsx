'use client'
import React from 'react';
import Slider from "react-slick";
import { Locale } from '@/i18n-config';
import {  HomeSliderLaunguage } from '@/types/DictionaryTypes/Dictionary';
import Link from 'next/link';
import GetHomeSliderItemForUI from '@/types/WebUI/HomeSliderItem/GetHomeSliderItemForUI';



interface HomeSliderParasm{
  local:Locale,
  dictinory:HomeSliderLaunguage,
  homeSliderItem:GetHomeSliderItemForUI[],
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
        {params.homeSliderItem.map((slide,index) => (
          <div key={index}>

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
