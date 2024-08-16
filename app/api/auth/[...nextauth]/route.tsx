import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";

const handler = NextAuth({
  secret: process.env.SECRET_KEY,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {    //karlFashionApi
        // const username = '11187086';
        // const password = '60-dayfreetrial';
        // const base64Credentials = btoa(`${username}:${password}`);
        
        // const response = await fetch('http://takhir-001-site1.gtempurl.com/api/Auth/Login', {
        //   method: 'POST',   
        //       headers: { 'Content-Type': 'application/json' },
        //     body:
        //       JSON.stringify({
        //               EmailOrUsername:'tahir@mail.ru',
        //         Password:'4575865T@hir'
        //       })
            
        // });
        // const data = await response.json();
        // console.log(data);
        try {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
          const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials?.email,/*'emilys'*/
              password:credentials?.password, /*'emilyspass'*/
              expiresInMins: 30,
            })
          });
          if (res.ok) {
            const user = await res.json();
            const responseUserData = await fetch('https://dummyjson.com/auth/me', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${user.token}`,
              },
            }).then(res => res.json());
      
       
            return responseUserData;
          } else {
            console.error("Fetch request failed with status:", res.status);
            throw new Error(res.statusText);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          throw new Error("Sifre veya Email sehvdir!");
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("jwt user",user)
        console.log("jwt token",token)
        return {  ...user,...token };
      }
      return token;
    },
    async session({ session, token }) {

console.log("session",session)
      return {...session,token};
    },
    async signIn({ user, account, profile, email, credentials}) {
     

      if (user.role == "admin") {
        console.log("user in admin")
        return true;
      } else {
        console.log("user in user")
        return false;
      }
    }
  
  },


});

export { handler as GET, handler as POST };
