export default interface GetSubCategoryForUpdate{
    id:string,
    categoryId:string,
    content:{[key:string]:[value:string]}[]
}