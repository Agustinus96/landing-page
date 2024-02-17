// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import clientPromise from '../../../lib/mongodb'; // Adjust the path as necessary

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: "Admin ID", type: "text", placeholder: "admin" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db('blogDB');

        const user = await db.collection('admin').findOne({ id: credentials.id });
        
        if (user && await bcrypt.compare(credentials.password, user.passwordHash)) {
          // Any object returned will be saved in the session
          return { id: user.id };
        } else {
          return null;
        }
      },
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
