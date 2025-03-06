"use client"
import { Locale } from "@/i18n-config"
import { HomeCategoryTopLaunguage } from "@/types/DictionaryTypes/Dictionary"
import Link from "next/link"
import GetDisCountAreaForUI from "@/types/WebUI/DiscountArea/GetDisCountAreForUI"
import GetTopCategoryAreaForUI from "@/types/WebUI/TopCategoryArea/GetTopCategoryAreaForUI"
interface TopCategoryParams{
    apiDomen:string|undefined
    locale:Locale,
    dictinory:HomeCategoryTopLaunguage,
    data:GetTopCategoryAreaForUI[]
}
const TopCategory:React.FC<TopCategoryParams>= (params)=>{


    return(
    
        <section className="top_catagory_area lg:grid lg:grid-cols-2 clearfix">
            {

        params.data.map((item,index)=>(

           
            <div key={index} className="single_catagory_area flex items-center w-full bg-img" style={{backgroundImage:`url(${params.apiDomen}/${item.pictureUrl})`}}>
                <div className="catagory-content">
                    <h6>{item.title}</h6>
                    <h2>{item.description}</h2>
                    <Link href={`${params.locale}/shop/${item.categoryName}`} className="btn karl-btn">{params.dictinory.Button}</Link>
                </div>
            </div>
           
           
        ))
            }
        </section>
    
    )

}
export default TopCategory;