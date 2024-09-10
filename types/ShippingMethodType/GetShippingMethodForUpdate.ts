export default interface GetShippingMethodForUpdate{
    id:string,
    langContent:{key:string,value:string}[],
    price:number,
    discountPrice:number
}