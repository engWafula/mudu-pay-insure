import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../lib/prisma";
import { Admin } from '@prisma/client';



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
    ]
  };


  const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }