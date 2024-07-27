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

export const products: Product[] = [
  {
    id: 1,
    img: Product1,
    price: "$39.90",
    description: "Jeans midi cocktail dress",
    category: ["All", "Women", "Dresses"],
  },
  {
    id: 2,
    img: Product2,
    price: "$49.90",
    description: "Summer floral dress",
    category: ["All", "Women", "Dresses"],
  },
  {
    id: 3,
    img: Product3,
    price: "$29.90",
    description: "Casual denim jacket",
    category: ["All", "Women", "Jackets"],
  },
  {
    id: 4,
    img: Product4,
    price: "$59.90",
    description: "Elegant evening gown",
    category: ["All", "Women", "Dresses"],
  },
  {
    id: 5,
    img: Product5,
    price: "$19.90",
    description: "Basic white t-shirt",
    category: ["All", "Men", "T-Shirts"],
  },
  {
    id: 6,
    img: Product6,
    price: "$89.90",
    description: "Luxury silk blouse",
    category: ["All", "Women", "Blouses"],
  },
  {
    id: 7,
    img: Product7,
    price: "$25.90",
    description: "Sporty sneakers",
    category: ["All", "Shoes", "Sportswear"],
  },
  {
    id: 8,
    img: Product8,
    price: "$99.90",
    description: "Trendy leather jacket",
    category: ["All", "Men", "Jackets"],
  },
];
