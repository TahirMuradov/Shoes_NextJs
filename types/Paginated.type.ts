export default interface PaginatedList<T>{
    data :T[],
    page :number
    totalPages:number
    pageSize :number
    collectionSize:number
    hasNextPage:boolean,
    hasPreviousPage:boolean
}