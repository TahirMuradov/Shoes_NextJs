export  default interface Result<T>{
    response:T,
    isSuccess:boolean,
    message:string|null,
    messages:string[]|null,
    statusCode:number
}