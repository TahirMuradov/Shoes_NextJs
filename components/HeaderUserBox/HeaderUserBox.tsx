"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const HeaderUserBox = () => {
    const {data:user}=useSession();
    if (user) {
        console.log(user)
        return(
            <>{user.user.firstName}</>
        )
    }else{

        return (
          <Link href={"/auth/login"}>
          Login
          </Link>
        )
    }
}

export default HeaderUserBox