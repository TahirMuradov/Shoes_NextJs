'use client'
import { useEffect, useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, ListItemText, Pagination, Slider, Typography } from "@mui/material";
import Product from "@/types/Product.type";
import { products as Data } from "@/types/data";

import ProductCart from "../ProductCart/ProductCart";




const Shop:React.FC=()=>{
    const [products,SetProducts]=useState<Product[]>([])
    const [categoryFilter,SetCategoryFilter]=useState<String>("All");
    const [priceFilter,SetPriceFilter]=useState<number[]>([0,300]);
    const [sizeFilter,SetSizeFilter]=useState<Number>(0);
    const [page, setPage] = useState<number>(1);

   useEffect(()=>{
     const filteredProducts=Data.filter((product)=>true)
SetProducts(filteredProducts)
   },[categoryFilter,priceFilter])

    function valuePricetext(value: number) {
        return `${value} ₼`;
      }

      const handleSelection = (value:string) => {
        SetCategoryFilter(value);
        console.log("Selected Item:", value);
      };
    
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
                                    <div id="menu-content2">
      {/* Women Wear */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="women2-content"
          id="women2-header"
        >
          <Typography>Woman Wear</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => handleSelection("Midi Dresses")}>
              <ListItemText primary="Midi Dresses" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Maxi Dresses")}>
              <ListItemText primary="Maxi Dresses" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Prom Dresses")}>
              <ListItemText primary="Prom Dresses" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleSelection("Little Black Dresses")}
            >
              <ListItemText primary="Little Black Dresses" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Mini Dresses")}>
              <ListItemText primary="Mini Dresses" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Man Wear */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="man2-content"
          id="man2-header"
        >
          <Typography>Man Wear</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => handleSelection("Man Dresses")}>
              <ListItemText primary="Man Dresses" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleSelection("Man Black Dresses")}
            >
              <ListItemText primary="Man Black Dresses" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleSelection("Man Mini Dresses")}
            >
              <ListItemText primary="Man Mini Dresses" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Children */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="kids2-content"
          id="kids2-header"
        >
          <Typography>Children</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => handleSelection("Children Dresses")}
            >
              <ListItemText primary="Children Dresses" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Mini Dresses")}>
              <ListItemText primary="Mini Dresses" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Bags & Purses */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="bags2-content"
          id="bags2-header"
        >
          <Typography>Bags & Purses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => handleSelection("Bags")}>
              <ListItemText primary="Bags" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Purses")}>
              <ListItemText primary="Purses" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Eyewear */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="eyewear2-content"
          id="eyewear2-header"
        >
          <Typography>Eyewear</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => handleSelection("Eyewear Style 1")}>
              <ListItemText primary="Eyewear Style 1" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Eyewear Style 2")}>
              <ListItemText primary="Eyewear Style 2" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Eyewear Style 3")}>
              <ListItemText primary="Eyewear Style 3" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Footwear */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="footwear2-content"
          id="footwear2-header"
        >
          <Typography>Footwear</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => handleSelection("Footwear 1")}>
              <ListItemText primary="Footwear 1" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Footwear 2")}>
              <ListItemText primary="Footwear 2" />
            </ListItemButton>
            <ListItemButton onClick={() => handleSelection("Footwear 3")}>
              <ListItemText primary="Footwear 3" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
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

                           {
                            products.map((product, index) => (
                            <ProductCart product={product}  key={index}/>
                            ))
                           }
                            

                        
                              
                          

                         
                          

                          
                            
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