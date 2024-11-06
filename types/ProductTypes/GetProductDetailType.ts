export default interface GetProductDetailType{
    id:string,
    description:string,
    title:string,
    subCategories:{key:string,value:string}[],
    productCode:string,
    price:number,
    disCount:number,
    imgUrls:string[],
    categories:{key:string,value:string}[],
 
    size:{
sizeId:string,
sizeNumber:number,
stockCount:number

    }[],
    RelatedProducts:{
        id:string,
        imgUrls:string[],
        price:number,
        disCount:number,
        title:string

    }[]
}