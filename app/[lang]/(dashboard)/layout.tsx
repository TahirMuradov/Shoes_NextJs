"use client"
import Loader from "@/dashboardComponents/common/Loader";
import "../globals.css"
import { useEffect, useState } from "react";
import DefaultLayout from "@/dashboardComponents/Layouts/DefaultLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark w-full h-[100vh]">
         <DefaultLayout>
     
    {loading ? <Loader /> : children}
      </DefaultLayout>

      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
  </div>
  )
   
 
  
}