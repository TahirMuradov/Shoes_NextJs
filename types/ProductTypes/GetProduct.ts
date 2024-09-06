export default interface GetProduct{
    id:string,
    pictureUrls:string[],
    productCode:string,
    productTitle:string,
    subCategory:string[],
    sizes:{
        sizeId:string,
        sizeNumber:number,
        stockCount:number
    }[],
    price:number,
    disCount:number
}