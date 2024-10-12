import bg_img1 from "../../public/img/bg-img/bg-3.jpg"
import bg_img2 from "../../public/img/bg-img/bg-2.jpg"
import { Locale } from "@/i18n-config"
import { HomeCategoryTopLaunguage } from "@/types/DictionaryTypes/Dictionary"
import Result from "@/types/ApiResultType"
import GetCategoryForUI from "@/types/CategoryTypes/GetCategoryForUI"
import GetTopCategoryArea from "@/types/WebUI/TopCategoryArea/GetTopCategoryArea"
import Link from "next/link"
interface TopCategoryParams{
    locale:Locale,
    dictinory:HomeCategoryTopLaunguage
}
const TopCategory:React.FC<TopCategoryParams>=async (params)=>{
try{


    const apiDomen = process.env.apiDomen;
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
 const response:Response = await  fetch(`${apiDomen}api/TopCategoryArea/GetTopCategoryAreaForUI`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'langCode': `${params.locale}`,  
            'Accept-Language': `${params.locale}`

    },
    cache:"no-store",
    method: "GET",
  })
  if (!response.ok) {
    console.log(response)
  }
const data:Result<GetTopCategoryArea[]> = await response.json();

    return(
    
        <section className="top_catagory_area lg:grid lg:grid-cols-2 clearfix">
            {

        data.response.map((item)=>(

           
            <div key={item.id} className="single_catagory_area flex items-center w-full bg-img" style={{backgroundImage:`url(${apiDomen}/${item.pictureUrl})`}}>
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
}catch(error){
console.log(error)
}
}
export default TopCategory;