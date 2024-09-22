import { i18n } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import DecodedLoginApiTokenResult from "@/types/LoginResponseType/DecodedLoginApiTokenResult";
import LoginResponseType from "@/types/LoginResponseType/LoginResponseType";

import jwt from 'jsonwebtoken';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: string;
  token: string;
  refreshToken: string;
  phoneNumber:string
}

const handler = NextAuth({
  secret: process.env.SECRET_KEY,
  session: {
    strategy: 'jwt',
    maxAge: 8760,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
          let locale: string | undefined;
          if (req.headers) {
            locale = req.headers['accept-language']; // Get the locale from the Accept-Language header
          }
      
          const apiDomen = process.env.apiDomen;
          const res = await fetch(`${apiDomen}api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'LangCode': locale ?? i18n.defaultLocale,
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
      
          if (res.ok) {
            const result: Result<LoginResponseType> = await res.json();
          
            const userData: DecodedLoginApiTokenResult = jwt.decode(result.response.accessToken) as DecodedLoginApiTokenResult;

           
            return {
              id: userData.Id ,         
              phoneNumber:userData.PhoneNumber,
              email: userData.Email, 
              username: userData.UserName , 
              firstName: userData.FirstName , 
              lastName: userData.LastName , 
              role: userData.Roles ,
              token: result.response.accessToken,
              refreshToken: result.response.refreshToken,
            } as User;
          } else {
            throw new Error(`Fetch request failed with status: ${res.status}`);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          throw new Error(`Invalid email or password!`);
        }
      }
      
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
     
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Merge token data into session object
 

  session.user = {
    id: token.id as string, 
    email: token.email as string , 
    username: token.username as string , 
    firstName: token.firstName as string , 
    lastName: token.lastName as string , 
    role: token.role as string , 
    token: token.token as string , 
    refreshToken: token.refreshToken as string ,
  };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
