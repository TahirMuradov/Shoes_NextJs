import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Provider from "../Provider";
import { Locale } from "@/i18n-config";

import { getDictionary } from "@/get-dictionary";
import { HeaderLaunguage } from "@/types/DictionaryTypes/Dictionary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Istanbul Shoes",
  description: "",
};

export default async function PagesLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary:HeaderLaunguage= (await getDictionary(lang)).LayoutLanguage.header
  return (
      <>
      <Provider>

      <Header lang={lang} dictionary={dictionary}/>
          {children}
          <Footer lang={lang}/>
      </Provider>
      </>
      
   
  );
}
