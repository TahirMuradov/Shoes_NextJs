export default interface GetCuponInfo{
    cuponId:string,
    cuponCode:string,
    disCountPersent:number,
    productIds:string[]|null,
    categoriesIds:string[]|null,
    subCategories:string[]|null,
    userId:string[]|null

}