"use client";

import { useState } from "react";

const AddPictureForm = () => {
  const [sizes, setSizes] = useState({ 36: 0, 37: 0 }); 
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [langCode, setLangCode] = useState("en"); 

  const handleSizeChange = (size: number, value: number) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: value,
    }));
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSubCategories(selectedOptions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Sizes
    Object.entries(sizes).forEach(([key, value]) => {
      formData.append(`Size[${key}]`, value.toString());
    });

    // SubCategories
    subCategories.forEach((category) => {
      formData.append("SubCategory", category);
    });

    // const picturesInput = form.querySelector<HTMLInputElement>("#pictures");
    // if (picturesInput?.files) {
    //   Array.from(picturesInput.files).forEach((file) => {
    //     formData.append("Pictures", file);
    //   });
    // }

    try {
      const response = await fetch('https://localhost:7115/api/Product/AddProduct', {
        method: 'POST',
        body: formData,
        
        headers: {
          'LangCode': langCode,
        },
      });

      if (response.ok) {
        console.log("Success!",response);
      } else {
        const errorData = await response.json();
        console.log("BadRequest Data:", errorData);
        console.log("Failed!",response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form id="addPictureForm" onSubmit={handleSubmit} encType="multipart/form-data">

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="col-span-4">
          <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Code:
          </label>
          <input
            type="text"
            id="productCode"
            name="ProductCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="col-span-4">
          <label htmlFor="discountPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Discount Price:
          </label>
          <input
            type="number"
            id="discountPrice"
            name="DiscountPrice"
            step="0.01"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="col-span-4">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="Price"
            step="0.01"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="col-span-4">
          <label htmlFor="sizes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sizes:
          </label>
          <div id="sizes" className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                placeholder="Size 36 Quantity"
                onChange={(e) => handleSizeChange(36, Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Size 37 Quantity"
                onChange={(e) => handleSizeChange(37, Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <label htmlFor="subCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sub Categories:
          </label>
          <select
            id="subCategory"
            name="SubCategory"
            multiple
            onChange={handleSubCategoryChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
       
          </select>
        </div>

        <div className="col-span-4">
          <label htmlFor="pictures" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Pictures:
          </label>
          <input
            type="file"
            id="pictures"
            name="Pictures"
            multiple
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                   focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                   text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
      </button>
    </form>
  );
};

export default AddPictureForm;
