"use client";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import ProductCart from "../ProductCart/ProductCart";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "@/hooks/hooks";
import { cartSlice } from "@/redux/cartSlice";
import { Locale } from "@/i18n-config";
import { ProductDetailLaunguage } from "@/types/DictionaryTypes/Dictionary";
import GetProductDetailType from "@/types/ProductTypes/GetProductDetailType";

interface ProductDetailParams{
  Product:GetProductDetailType|null|undefined,
  lang:Locale,
  dictionary:ProductDetailLaunguage,
  apiDomens:string|undefined
}

const ProductDetail: React.FC<ProductDetailParams> = (params) => {
const dispatch=useAppDispatch();

  const settings1 = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  const [countItem, setCountItem] = useState<number>(1);
  const [sizeItem, setSizeItem] = useState<number>(0);

  // useEffect(() => {
  //   console.log(countItem, sizeItem);
  // }, [countItem, sizeItem]);

  function CountPlus() {
    setCountItem((prevCount) => prevCount + 1);
  }

  function CountMinus() {
    setCountItem((prevCount) => Math.max(0, prevCount - 1));
  }

  function SelectSize(e: React.MouseEvent<HTMLAnchorElement>, size: number) {
    setSizeItem(size);

    document.querySelectorAll(".widget-desc a").forEach((element) => {
      element.classList.remove("aClick");
    });
    (e.currentTarget as HTMLAnchorElement).classList.add("aClick");
  }

  function AddToCart(id: string, title: string, imgUrl: string, price: number) {
    if (sizeItem==0||countItem==0) {
      alert("Məhsulun ölçüsünü vəya sayını seçin")
    }else{

     dispatch(cartSlice.actions.addToCart({
      Id: id,
      name: title,
      imgUrl: imgUrl,
      price: price,
      size: sizeItem,
      count: countItem,
    }))
      alert("Məhsul səbətə əlavə edildi")
    }
    
  }

  return (
    <section className="single_product_details_area section_padding_0_100">
      <div className="w-4/5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="single_product_thumb">
              <div
                id="product_details_slider"
                className="carousel slide"
                data-ride="carousel"
              >
                <Slider {...settings1} >
                  {params?.Product?.imgUrls?.map((url, index) => (
                    <div key={index}>
                      <Image
                      className="object-cover object-center"
                        src={`${params.apiDomens}${url}`}
                        style={{maxWidth:345,maxHeight:498}}
                        width={345}
                        height={498}
                        alt={`${params.Product?.description}`}
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          <div>
            <div className="single_product_desc">
              <h4 className="title">{params.Product?.description}</h4>

              <h4 className="price">$ {params.Product?.price}</h4>

           

              <div className="widget size mb-50">
                <h6 className="widget-title">Size</h6>
                <div className="widget-desc">
                  <ul>
                    {params.Product?.size?.map((size, index) => (
                      <li key={index}>
                        <a
                          onClick={(e) => SelectSize(e, size.sizeNumber)}
                          className="cursor-pointer"
                        >
                          {size.sizeNumber}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <form className="cart mb-50 flex" method="post">
                <div className="quantity">
                  <span
                    onClick={CountMinus}
                    className="qty-minus cursor-pointer"
                  >
                    <RemoveIcon />
                  </span>
                  <input
                    type="number"
                    className="qty-text"
                    id="qty"
                    step="1"
                    min="1"
                    name="quantity"
                    value={countItem}
                    readOnly
                    disabled
                  />
                  <span className="qty-plus cursor-pointer" onClick={CountPlus}>
                    <AddIcon />
                  </span>
                </div>
                <button
                  onClick={() =>
                    AddToCart(
                      params.Product?.id ?? " ",
                     params.Product?.description?? " ",
                    params.Product?.imgUrls?params.Product?.imgUrls[0]: " ",
                      params.Product?.price??0,

                    )
                  }
                  type="button" // "submit" yerine "button" olmalı
                  name="addtocart"
                  value="5"
                  className="btn cart-submit block"
                >
                  Add to cart
                </button>
              </form>

              <Accordion>
                <AccordionSummary
                  id="panel-header"
                  aria-controls="panel-content"
                >
                  Information
                </AccordionSummary>
                <AccordionDetails>{params.Product?.description}</AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className="you_may_like_area">
        <div className="w-[90%]">
          <div className="flex">
            <div className="w-full">
              <div className="section_heading text-center">
                <h2>related Products</h2>
              </div>
            </div>
          </div>

          <div className="slider-container grid grid-cols-2 md:grid-cols-3 gap-3">
            {params.Product?.RelatedProducts?.map((product, index) => (
              <div className="px-2" key={index}>
                <ProductCart apiDomen={params.apiDomens} lang={params.lang} product={product} key={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
