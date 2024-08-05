import bg_img1 from "../../public/img/bg-img/bg-3.jpg"
import bg_img2 from "../../public/img/bg-img/bg-2.jpg"
import { Locale } from "@/i18n-config"
import { HomeCategoryTopLaunguage } from "@/types/DictionaryTypes/Dictionary"
interface TopCategoryParams{
    locale:Locale,
    dictinory:HomeCategoryTopLaunguage
}
const TopCategory:React.FC<TopCategoryParams>=(params)=>{

    return(

        <section className="top_catagory_area lg:grid lg:grid-cols-2 clearfix">
       
        <div className="single_catagory_area flex items-center w-full bg-img" style={{backgroundImage:`url(${bg_img1.src})`}}>
            <div className="catagory-content">
                <h6>On Accesories</h6>
                <h2>Sale 30%</h2>
                <a href="#" className="btn karl-btn">{params.dictinory.Button}</a>
            </div>
        </div>
       
        <div className="single_catagory_area flex items-center bg-img w-full" style={{backgroundImage:`url(${bg_img2.src})`}}>
            <div className="catagory-content">
                <h6>in Bags excepting the new collection</h6>
                <h2>Designer bags</h2>
                <a href="#" className="btn karl-btn">{params.dictinory.Button}</a>
            </div>
        </div>
    </section>
    )
}
export default TopCategory;