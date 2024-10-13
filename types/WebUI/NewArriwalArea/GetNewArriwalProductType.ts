import GetNewArriwalCategory from "./GetNewArriwalCategoriesType";

export default interface GetNewArriwalProduct{
    id:string,
    imgUrls:string[],
    price:number,
    disCount:number,
    title:string,
    category:GetNewArriwalCategory[]
}