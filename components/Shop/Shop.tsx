'use client'
import { useState } from "react"

import { Box, Pagination, Slider } from "@mui/material";
import Product from "@/types/Product";
import { products } from "@/types/data";


interface Products{
    products: Product[]
}
const Shop:React.FC=()=>{
    const [products,SetProducts]=useState<Products>()
    const [categoryFilter,SetCategoryFilter]=useState<String>("All");
    const [priceFilter,SetPriceFilter]=useState<number[]>([0,300]);
    const [sizeFilter,SetSizeFilter]=useState<Number>(0);
    const [page, setPage] = useState<number>(1);

    function valuePricetext(value: number) {
        return `${value} ₼`;
      }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value); 
        
    }
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue)
    SetPriceFilter(newValue as number[]);
  
   

  };

    return(
        <section className="shop_grid_area section_padding_100">
            <div className="w-4/5 mx-auto">
                <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
                    <div className="md:col-span-1 lg:col-span-1">
                        <div className="shop_sidebar_area">
                           
                            <div className="widget catagory mb-10">
                             
                                <div className="nav-side-menu">
                                    <h6 className="mb-0">Catagories</h6>
                                    <div className="menu-list">
                                        <ul id="menu-content2" className="menu-content collapse out">
                                        
                                            <li data-toggle="collapse" data-target="#women2">
                                                <a href="#">Woman wear</a>
                                                <ul className="sub-menu collapse show" id="women2">
                                                    <li><a href="#">Midi Dresses</a></li>
                                                    <li><a href="#">Maxi Dresses</a></li>
                                                    <li><a href="#">Prom Dresses</a></li>
                                                    <li><a href="#">Little Black Dresses</a></li>
                                                    <li><a href="#">Mini Dresses</a></li>
                                                </ul>
                                            </li>
                                        
                                            <li data-toggle="collapse" data-target="#man2" className="collapsed">
                                                <a href="#">Man Wear</a>
                                                <ul className="sub-menu collapse" id="man2">
                                                    <li><a href="#">Man Dresses</a></li>
                                                    <li><a href="#">Man Black Dresses</a></li>
                                                    <li><a href="#">Man Mini Dresses</a></li>
                                                </ul>
                                            </li>
                                          
                                            <li data-toggle="collapse" data-target="#kids2" className="collapsed">
                                                <a href="#">Children</a>
                                                <ul className="sub-menu collapse" id="kids2">
                                                    <li><a href="#">Children Dresses</a></li>
                                                    <li><a href="#">Mini Dresses</a></li>
                                                </ul>
                                            </li>
                                       
                                            <li data-toggle="collapse" data-target="#bags2" className="collapsed">
                                                <a href="#">Bags &amp; Purses</a>
                                                <ul className="sub-menu collapse" id="bags2">
                                                    <li><a href="#">Bags</a></li>
                                                    <li><a href="#">Purses</a></li>
                                                </ul>
                                            </li>
                                        
                                            <li data-toggle="collapse" data-target="#eyewear2" className="collapsed">
                                                <a href="#">Eyewear</a>
                                                <ul className="sub-menu collapse" id="eyewear2">
                                                    <li><a href="#">Eyewear Style 1</a></li>
                                                    <li><a href="#">Eyewear Style 2</a></li>
                                                    <li><a href="#">Eyewear Style 3</a></li>
                                                </ul>
                                            </li>
                                        
                                            <li data-toggle="collapse" data-target="#footwear2" className="collapsed">
                                                <a href="#">Footwear</a>
                                                <ul className="sub-menu collapse" id="footwear2">
                                                    <li><a href="#">Footwear 1</a></li>
                                                    <li><a href="#">Footwear 2</a></li>
                                                    <li><a href="#">Footwear 3</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="widget price mb-50">
                                <h6 className="widget-title mb-30">Filter by Price</h6>
                                <div className="widget-desc w-1/2">
                                <Box sx={{ width: 250 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={priceFilter}
        onChange={handlePriceChange} 
     min={0}
     max={300}
        valueLabelDisplay="auto"
        getAriaValueText={valuePricetext}
        color='error'
      />
    </Box>
    <div className="range-price">Price:<span className="interval">  {priceFilter[0]} - {priceFilter[1]} ₼   </span> </div>
                                </div>

                            </div>
{/* 
                            <div className="widget color mb-72">
                                <h6 className="widget-title mb-32">Filter by Color</h6>
                                <div className="widget-desc">
                                    <ul className="flex justify-between">
                                        <li className="gray"><a href="#"><span>(3)</span></a></li>
                                        <li className="red"><a href="#"><span>(25)</span></a></li>
                                        <li className="yellow"><a href="#"><span>(112)</span></a></li>
                                        <li className="green"><a href="#"><span>(72)</span></a></li>
                                        <li className="teal"><a href="#"><span>(9)</span></a></li>
                                        <li className="cyan"><a href="#"><span>(29)</span></a></li>
                                    </ul>
                                </div>
                            </div> */}

                            <div className="widget size mb-52">
                                <h6 className="widget-title mb-32">Filter by Size</h6>
                                <div className="widget-desc">
                                    <ul className="flex justify-between">
                                        <li><a href="#">XS</a></li>
                                        <li><a href="#">S</a></li>
                                        <li><a href="#">M</a></li>
                                        <li><a href="#">L</a></li>
                                        <li><a href="#">XL</a></li>
                                        <li><a href="#">XXL</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                        <div className="shop_grid_product_area">
                            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                           
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="0.2s">
                               
                                    <div className="product-img">
                                        <img src="img/product-img/product-1.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                   
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                                      
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>

                        
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="0.3s">
                                   
                                    <div className="product-img">
                                        <img src="img/product-img/product-2.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                 
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                              
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>

                           
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="0.4s">
                               
                                    <div className="product-img">
                                        <img src="img/product-img/product-3.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                               
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                                      
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>

                           
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="0.5s">
                                  
                                    <div className="product-img">
                                        <img src="img/product-img/product-4.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                  
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                                    
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>

                         
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="0.6s">
                              
                                    <div className="product-img">
                                        <img src="img/product-img/product-5.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                              
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>

                          
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="0.7s">
                                
                                    <div className="product-img">
                                        <img src="img/product-img/product-6.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                  
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                                       
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>

                             
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="0.8s">
                                 
                                    <div className="product-img">
                                        <img src="img/product-img/product-7.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                   
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                                   
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>

                           
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="0.9s">
                             
                                    <div className="product-img">
                                        <img src="img/product-img/product-8.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                  
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                        
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>

                           
                                <div className="single_gallery_item wow wow animate-fadeIn" data-wow-delay="1s">
                              
                                    <div className="product-img">
                                        <img src="img/product-img/product-9.jpg" alt=""/>
                                        <div className="product-quicview">
                                            <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                 
                                    <div className="product-description">
                                        <h4 className="product-price">$39.90</h4>
                                        <p>Jeans midi cocktail dress</p>
                                   
                                        <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="shop_pagination_area wow fadeInUp flex justify-center" data-wow-delay="1.1s">
                        <Pagination color="standard" count={10} shape="rounded" onChange={handlePageChange} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
        )
}
export default Shop