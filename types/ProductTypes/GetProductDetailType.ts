export default interface GetProductDetailType{
    id:string,
    description:string,
    title:string,
    subCategoryName:string[],
    productCode:string,
    price:number,
    disCount:number,
    imgUrls:string[],
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