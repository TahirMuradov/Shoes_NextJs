import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  secret:process.env._API_KEY,
  session: {
    strategy: 'jwt',
      },
  providers: [
    // process.env.VERCEL_ENV === "preview",
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
    //karlFashionApi
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
              username:credentials?.email /*'emilys'*/,
              password:credentials?.password /*'emilyspass'*/,
              expiresInMins: 30,             
            })
          });

          if (res.ok) {
            const user = await res.json();
            
            return user;
          } else {
            console.error("Fetch request failed with status:", res.status);
            return null;
          }
        } catch (error) {
          console.error("An error occurred:", error);
          return null;
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
   
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      
      const role=
    await  fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.token}`, 
        }, 
      })
      .then(res => res.json());
 
      session.user=session.user
   session.user=role;
   console.log(session.user)
      return session;
    },
  },

});


export { handler as GET, handler as POST };