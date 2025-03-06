import { Locale } from "@/i18n-config";

import GetDisCountAreaForUI from "@/types/WebUI/DiscountArea/GetDisCountAreForUI";



const DisCountArea:React.FC<{params:{data:GetDisCountAreaForUI[]}}> =  ({params:{data}})  => {



  return (
    <section className="top-discount-area grid grid-cols-1 md:grid-cols-3">
{
  data.map((item,index)=>(

<div key={index} className="single-discount-area">
        <h5>{item.title}</h5>
        <h6>{item.description}</h6>
    </div>
  ))
}
 

</section>
  )


}

export default DisCountArea