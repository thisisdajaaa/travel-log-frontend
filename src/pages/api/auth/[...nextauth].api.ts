import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { LoginForm } from "@/pages/auth/login/types";

import { loginAPI } from "@/services/authentication";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email/Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const requestBody: LoginForm = {
          identifier: credentials?.identifier || "",
          password: credentials?.password || "",
        };

        const { success, data } = await loginAPI(requestBody);

        if (!success) return null;

        const user: User = {
          id: data?.id || "",
          email: data?.email || "",
          name: data?.username || "",
          accessToken: data?.access_token,
          refreshToken: data?.refresh_token,
        };

        return user;
      },
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;

      return session;
    },
  },

  pages: {
    signIn: "auth/login",
  },
};

export default NextAuth(authOptions);
