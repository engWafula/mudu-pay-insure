import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./prisma";
import { Admin } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    session:{
     strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(db),
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, req) {
          const email = credentials?.email;
          const password = credentials?.password;
          const user:Admin | null = await db.admin.findFirst({ where: { email } });
          const isValidPassword = bcrypt.compareSync(password!, user?.password!);
          if (isValidPassword) {
            return user;
          }
  
          return null;
        },
      }),
    ],
    callbacks: {
      // Add role to the JWT token
      async jwt({ token, user }) {
        if (user) {
          token.role = (user as Admin).role;  // Attach the role to the token
        }
        return token;
      },
      // Add role to the session
      async session({ session, token }) {
        if (token) {
          //@ts-ignore
          session.user.role = token.role as string;  // Attach role from JWT token to session.user

          // session?.user?.role = token?.role;  // Add role from the token to the session
          console.log(session,"+++++++++++>>>>>>>>>>>>>>")
        }
        return session;
      },
    },
  };