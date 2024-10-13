'use client'
import { useEffect, useState } from "react";
import ProductCart from "../ProductCart/ProductCart";
import { Locale } from "@/i18n-config";
import {HomeNewArriwalsLaunguage } from "@/types/DictionaryTypes/Dictionary";
import GetNewArriwalProduct from "@/types/WebUI/NewArriwalArea/GetNewArriwalProductType";
import GetNewArriwalCategory from "@/types/WebUI/NewArriwalArea/GetNewArriwalCategoriesType";

interface NewArriwalParams{
    locale:Locale,
    dictinory:HomeNewArriwalsLaunguage,
    Products:GetNewArriwalProduct[],
    Categories:GetNewArriwalCategory[],
    apiDomen:string|undefined

}

const NewArrival: React.FC<NewArriwalParams> = (params) => {
    const [allProducts,setAllProducts]=useState<GetNewArriwalProduct[]>(params.Products);
    const [allCategories,setAllCategories]=useState<GetNewArriwalCategory[]>(params.Categories)
    const [filter, setFilter] = useState<GetNewArriwalCategory|"All">("All");
    const [productsList, setProductsList] = useState<GetNewArriwalProduct[]>();

    useEffect(() => {

        if (filter === "All") {
            setProductsList(allProducts);
        } else {
            setProductsList(
                allProducts.filter(product => 
                    product.category.some(category => category.categoryId === filter.categoryId)
                )
            );
    }}, [filter]);

    function filteredData(categoryId: string) {
        const category = allCategories.find(x => x.categoryId.toLowerCase() == categoryId.toLowerCase());
        setFilter(category || "All");
    }

    return (
        <>
            <section className="new_arrivals_area section_padding_100_0 clearfix">
                <div className="w-4/5 mx-auto">
                    <div className="grid grid-cols-1">
                        <div className="">
                            <div className="section_heading text-center">
                                <h2>{params.dictinory.NewProduct}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="karl-projects-menu mb-10">
                    <div className="text-center portfolio-menu">
                    <button
                                key="All"
                                onClick={() => filteredData("All")}
                                className={`btn ${"All" === filter ? 'active' : ''}`}
                                data-filter={`All`}
                            >
                             {params.dictinory.All}
                            </button>
                        {params.Categories.map((category) => (
                            <button
                                key={category.categoryId}
                                onClick={() => filteredData(category.categoryId)}
                                className={`btn ${category.categoryId === filter ? 'active' : ''}`}
                                // data-filter={`${category.categoryId}`}
                            >
                                {category.categoryName}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-4/5 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 karl-new-arrivals">
                        {productsList?.map((product) => (
                            <ProductCart apiDomen={params.apiDomen} product={product} lang={params.locale} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewArrival;
