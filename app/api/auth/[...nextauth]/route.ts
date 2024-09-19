//@ts-ignore

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../lib/prisma";
import { Admin } from '@prisma/client';
import type { NextAuthOptions } from "next-auth"
import { authOptions } from '@/app/lib/authOptions';




  const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }