import { Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import GetDisCountAreaType from "@/types/WebUI/DiscountArea/GetDicCountAreaType";



const DisCountArea:React.FC<{params:{Lang:Locale}}> = async ({params:{Lang}})  => {


  try{
    const apiDomen = process.env.apiDomen;
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
 const response:Response = await  fetch(`${apiDomen}api/DisCountArea/GetAllDisCountArea`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'langCode': `${Lang}`,  
            'Accept-Language': `${Lang}`

    },
    cache:"no-store",
    method: "GET",
  })
  if (!response.ok) {
    console.log(response)
  }
const data:Result<GetDisCountAreaType[]> = await response.json();
  return (
    <section className="top-discount-area grid grid-cols-1 md:grid-cols-3">
{
  data.response.map((item)=>(

<div key={item.id} className="single-discount-area">
        <h5>{item.title}</h5>
        <h6>{item.description}</h6>
    </div>
  ))
}
 

</section>
  )
  }catch(error){
console.log(error)
  }

}

export default DisCountArea