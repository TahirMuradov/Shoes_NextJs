import { StaticImport } from "next/dist/shared/lib/get-img-props";


export default interface Product {
    id: number;
    img: StaticImport;
    price: string;
    description: string;
    category:string[];
  }
