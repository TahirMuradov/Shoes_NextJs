import GetDisCountAreaForUI from "./DiscountArea/GetDisCountAreForUI";
import GetHomeSliderItemForUI from "./HomeSliderItem/GetHomeSliderItemForUI";
import GetNewArriwalCategory from "./NewArriwalArea/GetNewArriwalCategoriesType";
import GetNewArriwalProduct from "./NewArriwalArea/GetNewArriwalProductType";
import GetTopCategoryAreaForUI from "./TopCategoryArea/GetTopCategoryAreaForUI";



export default interface GetHomeData{
    disCountAreas:GetDisCountAreaForUI[],
    homeSliderItems:GetHomeSliderItemForUI[],
    topCategoryAreas:GetTopCategoryAreaForUI[],
    newArriwalProducts:GetNewArriwalProduct[],
    isFeaturedCategorys:GetNewArriwalCategory[]
}