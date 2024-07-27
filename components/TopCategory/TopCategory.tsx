const TopCategory:React.FC=()=>{

    return(

        <section className="top_catagory_area lg:grid lg:grid-cols-2 clearfix">
       
        <div className="single_catagory_area flex items-center w-full bg-img" style={{backgroundImage:'url(img/bg-img/bg-2.jpg)'}}>
            <div className="catagory-content">
                <h6>On Accesories</h6>
                <h2>Sale 30%</h2>
                <a href="#" className="btn karl-btn">SHOP NOW</a>
            </div>
        </div>
       
        <div className="single_catagory_area flex items-center bg-img w-full" style={{backgroundImage:'url(img/bg-img/bg-2.jpg)'}}>
            <div className="catagory-content">
                <h6>in Bags excepting the new collection</h6>
                <h2>Designer bags</h2>
                <a href="#" className="btn karl-btn">SHOP NOW</a>
            </div>
        </div>
    </section>
    )
}
export default TopCategory;