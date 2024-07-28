// data.ts

import Product1 from "../public/img/product-img/product-1.jpg";
import Product2 from "../public/img/product-img/product-2.jpg";
import Product3 from "../public/img/product-img/product-3.jpg";
import Product4 from "../public/img/product-img/product-4.jpg";
import Product5 from "../public/img/product-img/product-5.jpg";
import Product6 from "../public/img/product-img/product-6.jpg";
import Product7 from "../public/img/product-img/product-7.jpg";
import Product8 from "../public/img/product-img/product-8.jpg";

import  Product  from './Product';
import { ProductDetail } from "./ProductDetail.type";

export const products: Product[] = [
  {
    id: 1,
    imgUrls: [Product1.src, Product2.src, Product3.src],
    price: "$39.90",
    description: "Jeans midi cocktail dress",
    category: ["All", "Women", "Dresses"],
  },
  {
    id: 2,
    imgUrls: [Product2.src, Product3.src, Product4.src],  
    price: "$49.90",
    description: "Summer floral dress",
    category: ["All", "Women", "Dresses"],
  },
  {
    id: 3,
    imgUrls: [Product3.src, Product4.src, Product5.src],  
    price: "$29.90",
    description: "Casual denim jacket",
    category: ["All", "Women", "Jackets"],
  },
  {
    id: 4,
    imgUrls: [Product4.src, Product5.src, Product6.src],  
    price: "$59.90",
    description: "Elegant evening gown",
    category: ["All", "Women", "Dresses"],
  },
  {
    id: 5,
    imgUrls: [Product5.src, Product6.src, Product7.src],  
    price: "$19.90",
    description: "Basic white t-shirt",
    category: ["All", "Men", "T-Shirts"],
  },
  {
    id: 6,
    imgUrls: [Product6.src, Product7.src, Product8.src],  
    price: "$89.90",
    description: "Luxury silk blouse",
    category: ["All", "Women", "Blouses"],
  },
  {
    id: 7,
    imgUrls: [Product7.src, Product1.src, Product2.src],  
    price: "$25.90",
    description: "Sporty sneakers",
    category: ["All", "Shoes", "Sportswear"],
  },
  {
    id: 8,
    imgUrls: [Product8.src, Product1.src, Product3.src],  
    price: "$99.90",
    description: "Trendy leather jacket",
    category: ["All", "Men", "Jackets"],
  },
];
export const ProductDetailDatas:ProductDetail[]=[
  {
      id: "1",
      imgUrl: [Product1.src, Product2.src, Product3.src],
      description: "Jeans midi cocktail dress",
      information: "Perfect for cocktail parties and summer gatherings.",
      price: 39.9,
      size: [34, 36, 38, 40, 42],
      sizeInStock: [5, 2, 8, 10, 3],
      relatedProducts: [products[1], products[2]], // Example related products
    },
    {
      id: "2",
      imgUrl: [Product2.src, Product3.src, Product4.src],
      description: "Summer floral dress",
      information: "Lightweight floral dress, ideal for sunny days.",
      price: 49.9,
      size: [36, 38, 40, 42],
      sizeInStock: [3, 6, 7, 2],
      relatedProducts: [products[0], products[3]],
    },
    {
      id: "3",
      imgUrl: [Product3.src, Product4.src, Product5.src],
      description: "Casual denim jacket",
      information: "Classic denim jacket for everyday use.",
      price: 29.9,
      size: [38, 40, 42],
      sizeInStock: [4, 5, 1],
      relatedProducts: [products[4], products[5]],
    },
    {
      id: "4",
      imgUrl: [Product4.src, Product5.src, Product6.src],
      description: "Elegant evening gown",
      information: "An elegant gown suitable for formal events.",
      price: 59.9,
      size: [36, 38, 40, 42, 44],
      sizeInStock: [0, 3, 4, 7, 1],
      relatedProducts: [products[2], products[5]],
    },
    {
      id: "5",
      imgUrl: [Product5.src, Product6.src, Product7.src],
      description: "Basic white t-shirt",
      information: "Comfortable white t-shirt made from organic cotton.",
      price: 19.9,
      size: [40, 42, 44, 46],
      sizeInStock: [12, 15, 7, 10],
      relatedProducts: [products[3], products[6]],
    },
    {
      id: "6",
      imgUrl: [Product6.src, Product7.src, Product8.src],
      description: "Luxury silk blouse",
      information: "A luxurious silk blouse that adds elegance to any outfit.",
      price: 89.9,
      size: [36, 38, 40],
      sizeInStock: [1, 0, 3],
      relatedProducts: [products[4], products[7]],
    },
    {
      id: "7",
      imgUrl: [Product7.src, Product1.src, Product2.src],
      description: "Sporty sneakers",
      information: "Comfortable sneakers designed for everyday wear and sports.",
      price: 25.9,
      size: [40, 41, 42, 43],
      sizeInStock: [10, 9, 5, 3],
      relatedProducts: [products[6], products[0]],
    },
    {
      id: "8",
      imgUrl: [Product8.src, Product1.src, Product3.src],
      description: "Trendy leather jacket",
      information: "A trendy leather jacket that makes a bold statement.",
      price: 99.9,
      size: [38, 40, 42, 44],
      sizeInStock: [2, 1, 0, 4],
      relatedProducts: [products[1], products[5]],
    },
]