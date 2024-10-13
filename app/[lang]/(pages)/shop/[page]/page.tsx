import Shop from "@/components/Shop/Shop"
import { getDictionary } from "@/get-dictionary"
import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType"
import GetCategoryForUI from "@/types/CategoryTypes/GetCategoryForUI"
import { ShopLaunguage } from "@/types/DictionaryTypes/Dictionary"
import PaginatedList from "@/types/Paginated.type"
import GetProductForUIType from "@/types/ProductTypes/GetProductForUIType"
import GetSize from "@/types/SizeTypes/GetSize"








const page:React.FC<{params:{page:number,lang:Locale}, searchParams: { [key: string]: string|string[] | undefined }}> = async ({ params :{page,lang},searchParams})=>{
    const dictionary:ShopLaunguage= (await getDictionary(lang)).Shop
    const apiDomen = process.env.apiDomen;
  
    const categoryId = searchParams.categoryId as string | undefined;
    const subCategoryId = searchParams.subCategoryId as string | undefined; 
    const sizeId = searchParams.SizeId as string | undefined;
    const minPrice = searchParams.minPrice || '0';
    const maxPrice = searchParams.maxPrice || '300';


if (page<0) page=1

try{
  let fetchUrl = `${apiDomen}api/Product/GetAllProduct?`;
  const params = new URLSearchParams();
  Object.entries( searchParams).map(([key,value])=>{
    params.append(key,value as string)
  })
  // if (categoryId) params.append("CategoryId", categoryId as string);
  // if (subCategoryId) params.append("subCategoryId", subCategoryId as string);
  // if (sizeId) params.append("SizeId", sizeId as string);
  // if (minPrice) params.append("minPrice", minPrice as string);
  // if (maxPrice) params.append("maxPrice", maxPrice as string);
  
  params.append("page", page.toString());

  
  fetchUrl += params.toString();
 
 const responseProduct=await   fetch(fetchUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'LangCode': `${lang}`,
          'Accept-Language': `${lang}`
        },
        cache:"no-store",
       method: "GET",
      })
      if (!responseProduct.ok) {
        console.log("Error fetching products:", responseProduct.statusText);
        return;
    }
const responseCategory=await fetch(`${apiDomen}api/Category/GetAllCategory`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'langCode': `${lang}`,
      'Accept-Language': `${lang}`
    },
    cache:"no-store",
   method: "GET",
  })
  if (!responseCategory.ok) {
    console.log("Error fetching category:", responseCategory.statusText);
    return;
  }
  const responseSize=await fetch(`${apiDomen}api/Size/GetAllSize`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'langCode': `${lang}`,
      'Accept-Language': `${lang}`
    },
    cache:"no-store",
   method: "GET",
  })
  if (!responseSize.ok) {
    console.log("Error fetching size:", responseSize.statusText);
    return;
  }
  const Products:Result<PaginatedList<GetProductForUIType>>=await responseProduct.json();

  const Categories:Result<GetCategoryForUI[]>=await responseCategory.json();
const Size:Result<GetSize[]>=await responseSize.json();
    return (
    <>
    <Shop key={1} apiDomen={apiDomen} Category={Categories} Products={Products}  Size={Size} page={page} dictinory={dictionary} lang={lang}/>
    </>
    )
}catch(error){
    console.log(error)
}

}
export default page