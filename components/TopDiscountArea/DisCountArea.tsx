

const DisCountArea = () => {
  return (
    <section className="top-discount-area grid grid-cols-3 gap-2 w-full">

    <div className="single-discount-area bg-black px-[40px] py-[15px] text-center">
    <h5>Free Shipping &amp; Returns</h5>
    <h6><a href="#">BUY NOW</a></h6>
    </div>
    
    <div className="single-discount-area bg-red-600 px-[40px] py-[15px] text-center">
    <h5>20% Discount for all dresses</h5>
    <h6>USE CODE: Colorlib</h6>
    </div>
    
    <div className="single-discount-area bg-black px-[40px] py-[15px] text-center">
    <h5>20% Discount for students</h5>
    <h6>USE CODE: Colorlib</h6>
    </div>
    </section>
  )
}

export default DisCountArea