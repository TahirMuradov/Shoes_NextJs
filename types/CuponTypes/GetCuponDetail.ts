export default interface GetCuponDetail{
    cuponId:string,
    cuponCode:string,
    isActive:boolean,
    disCountPercent:number,
    product:{key:string,value:string}|null,
    category :{key:string,value:string}|null,
    subCategory:{key:string,value:string}|null,
    user:{key:string,value:string}|null

}