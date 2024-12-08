export default interface GetAllCupon{
    cuponId: string;
    cuponCode: string;
    disCountPercent: number;
    isActive: boolean;
    productCode: string|null; 
    categoryName: string|null;
    subCategoryName: string|null;
    userEmail: string|null;
}