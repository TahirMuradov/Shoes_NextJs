import { Metadata } from "next";
import "./globals.css"
import { Locale } from "@/i18n-config";
import Head from "next/head";
import logo from "../../public/İSTANBUL.png"


export const metadata: Metadata = {
  
  title: 'Istanbul Shoes | Home',
  description: 'Istanbul Shoes | Home',
icons:{
  icon:logo.src
}
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang}>
<Head>
<link rel="icon" href="../../public/İSTANBUL.png" type="image/png" sizes="32x32" />
</Head>
      <body id="">
      
  
          {children}
      
   
      </body>
    </html>
  );
}
