'use client'
import { useEffect, useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, ListItemText, Pagination, Slider, Typography } from "@mui/material";
import ProductCart from "../ProductCart/ProductCart";
import { ShopLaunguage } from "@/types/DictionaryTypes/Dictionary";
import { Locale } from "@/i18n-config";
import { useRouter } from "next/navigation";
import Result from "@/types/ApiResultType";
import PaginatedList from "@/types/Paginated.type";
import GetProductForUIType from "@/types/ProductTypes/GetProductForUIType";
import GetSize from "@/types/SizeTypes/GetSize";
import GetCategoryForUI from "@/types/CategoryTypes/GetCategoryForUI";




interface ShopParams{
  dictinory:ShopLaunguage,
  lang:Locale,
  apiDomen:string|undefined
  ,
  Products:Result<PaginatedList<GetProductForUIType>>,
  page: number,
  Size:Result<GetSize[]>,
  Category:Result<GetCategoryForUI[]>,
}


const Shop:React.FC<ShopParams>=(params)=>{
    const [products,SetProducts]=useState<[]>([])
    const [categoryFilter,SetCategoryFilter]=useState<String>();
    const [priceFilter,SetPriceFilter]=useState<number[]>([0,300]);
    const [sizeFilter,SetSizeFilter]=useState<string>();
    const [page, setPage] = useState<number>(1);
    const router = useRouter();

   useEffect(()=>{
    const url = new URLSearchParams();
  
    if (categoryFilter) url.append("subCategoryId", categoryFilter as string);
  
    if (sizeFilter) url.append("SizeId", sizeFilter as string);
    if (priceFilter[0]) url.append("minPrice", priceFilter[0].toString());
    if (priceFilter[1]) url.append("maxPrice", priceFilter[1].toString());
   
   router.push(`/${params.lang}/shop/${page}?${url}`)
    
    //  const filteredProducts=Data.filter((product)=>true)
// SetProducts(filteredProducts)
   },[categoryFilter,priceFilter,sizeFilter,page])

    function valuePricetext(value: number) {
        return `${value} ₼`;
      }

      const handleSubCategorySelection = (value:string) => {
        SetCategoryFilter(value);
 
      };
    function handleSize(sizeId:string){
      console.log(sizeId)
SetSizeFilter(sizeId)
    }
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value); 
        
    }
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
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
                                    <h6 className="mb-0">{params.dictinory.Filter.Categories}</h6>
                                    <div className="menu-list">
                                    <div id="menu-content2">
                                    <Accordion>
        <AccordionSummary
        onClick={() => handleSubCategorySelection("")}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="women2-content"
          id="women2-header"
        >
          <Typography>All</Typography>
        </AccordionSummary>
     
      </Accordion>
    {
      params.Category.response?
      params.Category.response.map((category,index)=>(
index==0?
      <Accordion key={index} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="women2-content"
          id="women2-header"
        >
          <Typography>{category.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            {
              category.subCategories?
           Object.entries(category.subCategories).map(([key,value])=>(

            <ListItemButton key={key} onClick={() => handleSubCategorySelection(key)}>
              <ListItemText primary={`${value}`} />
            </ListItemButton>
              )):null
            }
           
         
    
          </List>
        </AccordionDetails>
      </Accordion>:   <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="women2-content"
          id="women2-header"
        >
          <Typography>{category.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            {
              category.subCategories?
           Object.entries(category.subCategories).map(([key,value])=>(

            <ListItemButton key={key} onClick={() => handleSubCategorySelection(key)}>
              <ListItemText primary={`${value}`} />
            </ListItemButton>
              )):null
            }
           
         
    
          </List>
        </AccordionDetails>
      </Accordion>
      )):null
    }

    </div>
                                    </div>
                                </div>
                            </div>

                            <div className="widget price mb-50">
                                <h6 className="widget-title mb-30">{params.dictinory.Filter.Priceİnterval}</h6>
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
    <div className="range-price">{params.dictinory.Filter.Price}:<span className="interval">  {priceFilter[0]} - {priceFilter[1]} ₼   </span> </div>
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
                                <h6 className="widget-title mb-32">{params.dictinory.Filter.FilterBySize}</h6>
                                <div className="widget-desc">
                                    <ul className="flex">
                                      {
                                        params.Size.response?
                                        params.Size.response.map((size)=>(
                                          
                                          <li key={size.id}><a className={`cursor-pointer ${sizeFilter==size.id?'active':''}`} onClick={(e)=>{e.preventDefault(); handleSize(size.id)}}>{size.size}</a></li>
                                        )):null
                                      }
                                 
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                    
                        <div className="shop_grid_product_area">
                            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                           {
                            params.Products.response?
                            params.Products.response.data.map((product, index) => (
                            <ProductCart  apiDomen={params.apiDomen} product={product} lang={params.lang}  key={index}/>
                            )):null
                           }
                            

                        
                              
                          

                         
                          

                          
                            
                            </div>
                        </div>

                        <div className="shop_pagination_area wow fadeInUp flex justify-center" data-wow-delay="1.1s">
                        <Pagination color="standard" count={params.Products.response?.totalPages} shape="rounded" onChange={handlePageChange} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
        )
}
export default Shop