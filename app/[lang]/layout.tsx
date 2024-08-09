import "./globals.css"
import { Locale } from "@/i18n-config";





export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang}>
    
      <body id="wrapper">
      
  
          {children}
      
   
      </body>
    </html>
  );
}
