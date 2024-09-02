import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

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
      async authorize(credentials, req) {
        try {
          const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials?.email,
              password: credentials?.password,
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
            });

            const userData = await responseUserData.json();
            return {
              ...userData,
              token: user.token, // Include the token
              refreshToken: user.refreshToken, // Assuming you have a refreshToken
            };
          } else {
            throw new Error(`Fetch request failed with status: ${res.status}`);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          throw new Error(`Invalid email or password!`);
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
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.gender = user.gender;
        token.image = user.image;
        token.role = user.role;
        token.token = user.token;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        gender: token.gender as string,
        image: token.image as string,
        role: token.role as string,
        token: token.token as string,
        refreshToken: token.refreshToken as string,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
