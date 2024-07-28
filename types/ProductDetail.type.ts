import Product from "./Product.type";

export  interface ProductDetail{
    id:string|null|undefined,
    imgUrl:string[]|null|undefined,
    description:string|null|undefined,
    information:string|null|undefined,
    price:number|null|undefined,
    size:number[]|null|undefined,
    sizeInStock:number[]|null|undefined,
    relatedProducts:Product[]|null|undefined
    
}