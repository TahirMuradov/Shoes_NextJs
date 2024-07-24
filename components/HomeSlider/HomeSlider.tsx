'use client'
import Image from "next/image";
import Slider from "react-slick";
import img1 from '../../public/img/product-img/product-1.jpg'
import img2 from'../../public/img/product-img/product-2.jpg'
import img3 from '../../public/img/product-img/product-3.jpg'

const HomeSlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };
  return (
    <section className="w-full h-[800px] relative">

    <Slider {...settings}>
    <div className="relative">
    <Image alt="img2" className="w-full object-cover object-center" src={img2}/>

    <div className="welcome_slide_text absolute left-[200px] top-[200px] p-4">
<h6   >* Only today we offer free shipping</h6>
<h2 >Summer Collection</h2>
<a href="#">Check Collection</a>
</div>
    </div>
    <div className="relative">
    <Image alt="img3" className="w-full object-cover object-center" src={img3}/>

    <div className="welcome_slide_text absolute left-[200px] top-[200px] p-4">
<h6   >* Only today we offer free shipping</h6>
<h2 >Summer Collection</h2>
<a href="#">Check Collection</a>
</div>
    </div>
    <div className="relative">
      <Image alt="img1" className="w-full object-cover object-center" src={img1}/>
      <div className="welcome_slide_text absolute left-[200px] top-[200px] p-4">
<h6   >* Only today we offer free shipping</h6>
<h2 >Summer Collection</h2>
<a href="#">Check Collection</a>
</div>
    </div>

  </Slider>
    </section>
  )
}

export default HomeSlider