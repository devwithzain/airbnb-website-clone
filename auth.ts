import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { prisma } from "@/app/libs/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: "jwt"
   },
   ...authConfig
});