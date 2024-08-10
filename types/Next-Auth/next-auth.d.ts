import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
   interface User {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image:string,
    role:string,
    token: string,
    refreshToken: string
  }

  interface Session {
    user: User
  }

  interface JWT {    
    id: string,
 email: string,
first_name: string,
last_name: string,
token: string
}
}
