// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../lib/mongodb'; // Adjust the path as necessary

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        id: { type: "text", placeholder: "Admin ID" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
       try
        {const client = await clientPromise;
        const db = client.db('blogDB');

        const user = await db.collection('admin').findOne({ id: credentials.id });
        
        if (user && await bcrypt.compare(credentials.password, user.passwordHash)) {
          // Any object returned will be saved in the session
          return { id: user.id };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Authorization failed", error);
        throw new Error("Internal server error");
      }},
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Specify custom sign-in page
    error: '/auth/error', // Specify custom error page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add the user id to the JWT token
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // Add the user id to the session
      if (token) session.user.id = token.id;
      return session;
    },
  },
});
