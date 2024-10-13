"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import userProfile from "../../public/author.jpg"
import React, { useState } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import Image from 'next/image';
const HeaderUserBox = () => {
    const [isUserDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
    const {data}=useSession();
    if (data) {
        
        return(
            <>  <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button onClick={()=>setUserDropdownOpen(!isUserDropdownOpen)} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span className="sr-only">Open user menu</span>
                  <Image width={100} height={100} className="w-8 h-8 rounded-full" src={userProfile} alt="user photo"/>
                </button>
              </div>
              <div
    className={`z-50 transform transition-opacity ${
      isUserDropdownOpen ? "block opacity-100" : "opacity-0 hidden"
    } ease-in-out duration-500 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
    id="dropdown-user"
    style={{
      position: "absolute",
      right: "0px",
      top: "80px",
    }}
  >
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    {data.user.firstName} {data.user.lastName}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                {data.user.email}
                  </p>
                </div>
                <ul className="py-1" role="none">
                    {
                  data.user.role === 'SuperAdmin'||data.user.role === 'Admin' ? ( <li>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</Link>
                  </li>):(<></>)
                    }
                 
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                  </li>
                
                  <li>
                    <button type='button' onClick={()=>signOut({redirect:false})} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</button>
                  </li>
                </ul>
              </div>
            </div>
          </div> </>
        )
    }else{

        return (
          <Link href={"/auth/login"}>
            <AccountCircleOutlinedIcon/>
        
        <span className='font-sans hidden lg:inline-block'>
          Login
        </span>
          </Link>
        )
    }
}

export default HeaderUserBox