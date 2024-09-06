import { Locale } from "@/i18n-config"

export default interface GetProductForUpdate{
    id:string,
    pictureUrls:string[],
    productCode:string,
    productName:{key:string,value:string}[],
    description:{key:string,value:string}[],
    subCategories:string[],
    sizes:{
        sizeId:string,
        sizeNumber:number,
        stockCount:number
    }[],
    price:number,
    discountPrice:number
}