import HomeSlider from "@/components/HomeSlider/HomeSlider";
import NewArriwal from "@/components/NewArriwal/NewArriwal";
import ProductCart from "@/components/ProductCart/ProductCart";
import ProductModal from "@/components/ProductModal/ProductModal";
import TopCategory from "@/components/TopCategory/TopCategory";
import DisCountArea from "@/components/TopDiscountArea/DisCountArea";


export default function Home() {
  return (
    <main className="">
      <DisCountArea/>
      <HomeSlider/>
      <TopCategory/>
     <NewArriwal/>
     
    </main>
  );
}
