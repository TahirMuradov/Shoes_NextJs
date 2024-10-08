"use client"
import Loader from "@/dashboardComponents/common/Loader";
import "../globals.css"
import { useEffect, useState } from "react";
import DefaultLayout from "@/dashboardComponents/Layouts/DefaultLayout";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [darkMode, setdarkMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div className={`${darkMode?"dark":""} dark:bg-boxdark-2 dark:text-bodydark w-full min-h-[100vh]  dark:text-slate-400 dark:bg-slate-800`}>
        <SessionProvider>

         <DefaultLayout>
     
    {loading ? <Loader /> : children}
      </DefaultLayout>
        </SessionProvider>

    
  </div>
  )
   
 
  
}