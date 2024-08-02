'use client'
import React from 'react';
import Slider from "react-slick";
import bg1 from '../../public/img/bg-img/bg-1.jpg';
import bg2 from '../../public/img/bg-img/bg-2.jpg';
import bg3 from '../../public/img/bg-img/bg-3.jpg';
import bg4 from '../../public/img/bg-img/bg-4.jpg';
import { getCartCookie, setCartCookie } from '@/utils/cookies';
import { products } from '@/types/data';
import CartType from '@/types/CartTypes/Cart.type';





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
const data:CartType={
  items:[],
  totalAmount:0,
  totalQuantity:0
}
setCartCookie(data)
console.log(getCartCookie())
const HomeSlider: React.FC = () => {


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
        {slidesData.map(slide => (
          <div>

          <div key={slide.id} className="single_slide h-[800px] bg-img background-overlay" style={{ backgroundImage: `url(${slide.backgroundImage.src})` }}>
            <div className="container m-auto my-auto h-full">
              <div className="flex h-full items-center justify-center">
                <div className="w-full" >
                  <div className="welcome_slide_text">
                    <h6 data-animation="bounceInDown" data-delay="0" data-duration="500ms">
                      * Sadece bugün ücretsiz kargo imkanı
                    </h6>
                    <h2 data-animation="fadeInUp" className='sm:font-[38px]' data-delay="500ms" data-duration="500ms">
                      {slide.heading}
                    </h2>
                    <a
                      href={slide.buttonLink}
                      className="btn karl-btn"
                      data-animation="fadeInUp"
                      data-delay="1s"
                      data-duration="500ms"
                    >
                      {slide.buttonText}
                    </a>
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
