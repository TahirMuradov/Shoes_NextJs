'use client'
import { useEffect, useState } from "react";
import ProductCart from "../ProductCart/ProductCart";
import { products } from "../../types/data";
import Product from "@/types/Product.type";
import { categories } from "@/types/Category";
import { Locale } from "@/i18n-config";
import {HomeNewArriwalsLaunguage } from "@/types/DictionaryTypes/Dictionary";

interface NewArriwalParams{
    locale:Locale,
    dictinory:HomeNewArriwalsLaunguage
}

const NewArrival: React.FC<NewArriwalParams> = (params) => {
    const [filter, setFilter] = useState<string>("All");
    const [productsList, setProductsList] = useState<Product[]>(products);

    useEffect(() => {
       
        setProductsList(
            products.filter(product => 
                filter === "All" || product.category.includes(filter)
            )
        );
    }, [filter]);

    function filteredData(categoryName: string) {
        const category = categories.find(x => x.name.toLowerCase() === categoryName.toLowerCase())?.name;
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
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => filteredData(category.name)}
                                className={`btn ${category.name === filter ? 'active' : ''}`}
                                data-filter={`${category.name}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-4/5 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 karl-new-arrivals">
                        {productsList.map((product) => (
                            <ProductCart product={product} lang={params.locale} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewArrival;
