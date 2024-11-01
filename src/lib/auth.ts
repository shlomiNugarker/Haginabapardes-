/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { authConfig } from "@/config/auth.config";
import { getUser } from "./db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        const user = await getUser(email);
        if (user?.length === 0 || !user) return null;
        const passwordsMatch = await compare(password, user[0].password!);
        if (passwordsMatch) return user[0] as any;
        return null;
      },
    }),
  ],
});
